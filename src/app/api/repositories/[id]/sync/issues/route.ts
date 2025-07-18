import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getServerGitHubGraphQLClient } from "@/lib/github/github.graphql.server";
import { GitHubSyncService } from "@/services/sync/githubSync.service";
import { RepositoryWithGitHub, SyncJobOptions } from "@/services/sync/types";
import { z } from "zod";
import { syncRateLimiter, rateLimitResponse } from "@/lib/utils/rateLimiter";

// Request body schema
const syncRequestSchema = z.object({
  states: z.array(z.enum(["OPEN", "CLOSED"])).optional(),
  since: z.string().datetime().optional(),
  batchSize: z.number().min(1).max(100).optional(),
});

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const repositoryId = params.id;
    
    // Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check rate limit
    const rateLimitResult = rateLimitResponse(user.id, syncRateLimiter);
    if (rateLimitResult) {
      return rateLimitResult;
    }

    // Validate request body
    const body = await request.json();
    const validationResult = syncRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { states, since, batchSize } = validationResult.data;

    // Check repository access and get repository details
    const { data: repository, error: repoError } = await supabase
      .from("repositories")
      .select(`
        *,
        workspace:workspaces!inner(
          workspace_members!inner(*)
        )
      `)
      .eq("id", repositoryId)
      .eq("workspace.workspace_members.user_id", user.id)
      .single();

    if (repoError || !repository) {
      return NextResponse.json(
        { error: "Repository not found or access denied" },
        { status: 404 }
      );
    }

    // Check if user has access (all workspace members have full access)
    const hasAccess = repository.workspace.workspace_members.length > 0;
    if (!hasAccess) {
      return NextResponse.json(
        { error: "Access denied. You must be a workspace member." },
        { status: 403 }
      );
    }

    // Check if a sync is already running
    if (repository.sync_status === "syncing") {
      return NextResponse.json(
        { error: "Sync already in progress" },
        { status: 409 }
      );
    }

    // Create sync job
    const { data: syncJob, error: jobError } = await supabase
      .from("sync_jobs")
      .insert({
        repository_id: repositoryId,
        type: "issues",
        status: "running",
        created_by: user.id,
        metadata: { states, since, batchSize }
      })
      .select()
      .single();

    if (jobError || !syncJob) {
      console.error("[Sync API] Failed to create sync job:", jobError);
      return NextResponse.json(
        { error: "Failed to start sync job" },
        { status: 500 }
      );
    }

    // Start sync in background (don't wait for completion)
    performSync(repository, syncJob.id, {
      states,
      since: since ? new Date(since) : undefined,
      batchSize
    }).catch(error => {
      console.error("[Sync API] Background sync failed:", error);
    });

    return NextResponse.json({
      message: "Sync job started",
      jobId: syncJob.id,
      status: "running",
      checkStatusUrl: `/api/repositories/${repositoryId}/sync/status?jobId=${syncJob.id}`
    });

  } catch (error) {
    console.error("[Sync API] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Perform sync in background
async function performSync(
  repository: RepositoryWithGitHub,
  jobId: string,
  options: SyncJobOptions
) {
  const supabase = await createClient();
  
  try {
    // Create GitHub client
    const githubClient = await getServerGitHubGraphQLClient();
    if (!githubClient) {
      throw new Error("Failed to create GitHub client");
    }

    // Initialize sync service
    const syncService = new GitHubSyncService(githubClient);
    await syncService.initialize();

    // Extract github_owner and github_name from full_name if not present
    const github_owner = repository.github_owner || repository.full_name?.split('/')[0];
    const github_name = repository.github_name || repository.full_name?.split('/')[1];
    
    if (!github_owner || !github_name) {
      throw new Error("Unable to determine repository owner and name");
    }
    
    // Perform sync
    const result = await syncService.syncRepositoryIssues(
      {
        id: repository.id,
        workspace_id: repository.workspace_id,
        github_id: repository.github_id,
        github_name,
        github_owner,
      },
      {
        ...options,
        onProgress: async (progress) => {
          // Update job progress
          await supabase
            .from("sync_jobs")
            .update({
              issues_processed: progress.processed,
              issues_created: progress.created,
              issues_updated: progress.updated,
              errors: progress.errors,
              metadata: {
                ...options,
                lastProgress: progress
              }
            })
            .eq("id", jobId);
        }
      }
    );

    // Update job status
    await supabase
      .from("sync_jobs")
      .update({
        status: result.success ? "completed" : "failed",
        completed_at: new Date().toISOString(),
        issues_processed: result.issuesProcessed,
        issues_created: result.created,
        issues_updated: result.updated,
        errors: result.errors,
        error_details: result.errorDetails,
        metadata: {
          ...options,
          summary: result.summary
        }
      })
      .eq("id", jobId);

  } catch (error) {
    // Update job status on error
    await supabase
      .from("sync_jobs")
      .update({
        status: "failed",
        completed_at: new Date().toISOString(),
        error_details: [error instanceof Error ? error.message : "Unknown error"],
      })
      .eq("id", jobId);
    
    throw error;
  }
}