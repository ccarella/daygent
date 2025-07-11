/* eslint-disable @typescript-eslint/no-explicit-any */
// Database types generated from schema
// Last updated: 2025-01-10

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          subscription_status: "trial" | "active" | "inactive" | "cancelled";
          subscription_id: string | null;
          trial_ends_at: string | null;
          seats_used: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          subscription_status?: "trial" | "active" | "inactive" | "cancelled";
          subscription_id?: string | null;
          trial_ends_at?: string | null;
          seats_used?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          subscription_status?: "trial" | "active" | "inactive" | "cancelled";
          subscription_id?: string | null;
          trial_ends_at?: string | null;
          seats_used?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          github_id: number | null;
          github_username: string | null;
          google_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          github_id?: number | null;
          github_username?: string | null;
          google_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          github_id?: number | null;
          github_username?: string | null;
          google_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      organization_members: {
        Row: {
          id: string;
          organization_id: string;
          user_id: string;
          role: "owner" | "admin" | "member";
          invited_by: string | null;
          invited_at: string;
          joined_at: string | null;
        };
        Insert: {
          id?: string;
          organization_id: string;
          user_id: string;
          role?: "owner" | "admin" | "member";
          invited_by?: string | null;
          invited_at?: string;
          joined_at?: string | null;
        };
        Update: {
          id?: string;
          organization_id?: string;
          user_id?: string;
          role?: "owner" | "admin" | "member";
          invited_by?: string | null;
          invited_at?: string;
          joined_at?: string | null;
        };
      };
      repositories: {
        Row: {
          id: string;
          organization_id: string;
          github_id: number;
          name: string;
          full_name: string;
          private: boolean;
          default_branch: string;
          installation_id: number | null;
          webhook_secret: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          github_id: number;
          name: string;
          full_name: string;
          private?: boolean;
          default_branch?: string;
          installation_id?: number | null;
          webhook_secret?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          github_id?: number;
          name?: string;
          full_name?: string;
          private?: boolean;
          default_branch?: string;
          installation_id?: number | null;
          webhook_secret?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          repository_id: string;
          name: string;
          description: string | null;
          status: "active" | "archived";
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          repository_id: string;
          name: string;
          description?: string | null;
          status?: "active" | "archived";
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          repository_id?: string;
          name?: string;
          description?: string | null;
          status?: "active" | "archived";
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      issues: {
        Row: {
          id: string;
          project_id: string;
          repository_id: string;
          github_issue_number: number | null;
          github_issue_id: number | null;
          title: string;
          original_description: string | null;
          expanded_description: string | null;
          status: "open" | "in_progress" | "review" | "completed" | "cancelled";
          priority: "urgent" | "high" | "medium" | "low";
          created_by: string;
          assigned_to: string | null;
          github_pr_number: number | null;
          github_pr_id: number | null;
          created_at: string;
          updated_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          project_id: string;
          repository_id: string;
          github_issue_number?: number | null;
          github_issue_id?: number | null;
          title: string;
          original_description?: string | null;
          expanded_description?: string | null;
          status?:
            | "open"
            | "in_progress"
            | "review"
            | "completed"
            | "cancelled";
          priority?: "urgent" | "high" | "medium" | "low";
          created_by: string;
          assigned_to?: string | null;
          github_pr_number?: number | null;
          github_pr_id?: number | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          project_id?: string;
          repository_id?: string;
          github_issue_number?: number | null;
          github_issue_id?: number | null;
          title?: string;
          original_description?: string | null;
          expanded_description?: string | null;
          status?:
            | "open"
            | "in_progress"
            | "review"
            | "completed"
            | "cancelled";
          priority?: "urgent" | "high" | "medium" | "low";
          created_by?: string;
          assigned_to?: string | null;
          github_pr_number?: number | null;
          github_pr_id?: number | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
      };
      issue_comments: {
        Row: {
          id: string;
          issue_id: string;
          user_id: string;
          content: string;
          is_ai_generated: boolean;
          github_comment_id: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          issue_id: string;
          user_id: string;
          content: string;
          is_ai_generated?: boolean;
          github_comment_id?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          issue_id?: string;
          user_id?: string;
          content?: string;
          is_ai_generated?: boolean;
          github_comment_id?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      activities: {
        Row: {
          id: string;
          organization_id: string;
          repository_id: string | null;
          project_id: string | null;
          issue_id: string | null;
          user_id: string;
          type:
            | "issue_created"
            | "issue_updated"
            | "issue_completed"
            | "issue_comment"
            | "project_created"
            | "repository_connected"
            | "member_invited"
            | "member_joined";
          description: string;
          metadata: Json | null;
          external_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          repository_id?: string | null;
          project_id?: string | null;
          issue_id?: string | null;
          user_id: string;
          type:
            | "issue_created"
            | "issue_updated"
            | "issue_completed"
            | "issue_comment"
            | "project_created"
            | "repository_connected"
            | "member_invited"
            | "member_joined";
          description: string;
          metadata?: Json | null;
          external_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          repository_id?: string | null;
          project_id?: string | null;
          issue_id?: string | null;
          user_id?: string;
          type?:
            | "issue_created"
            | "issue_updated"
            | "issue_completed"
            | "issue_comment"
            | "project_created"
            | "repository_connected"
            | "member_invited"
            | "member_joined";
          description?: string;
          metadata?: Json | null;
          external_url?: string | null;
          created_at?: string;
        };
      };
      ai_usage: {
        Row: {
          id: string;
          organization_id: string;
          user_id: string;
          model: string;
          tokens_used: number;
          purpose: string;
          cost_cents: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          user_id: string;
          model: string;
          tokens_used: number;
          purpose: string;
          cost_cents: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          user_id?: string;
          model?: string;
          tokens_used?: number;
          purpose?: string;
          cost_cents?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      subscription_status: "trial" | "active" | "inactive" | "cancelled";
      organization_role: "owner" | "admin" | "member";
      project_status: "active" | "archived";
      issue_status:
        | "open"
        | "in_progress"
        | "review"
        | "completed"
        | "cancelled";
      issue_priority: "urgent" | "high" | "medium" | "low";
      activity_type:
        | "issue_created"
        | "issue_updated"
        | "issue_completed"
        | "issue_comment"
        | "project_created"
        | "repository_connected"
        | "member_invited"
        | "member_joined";
    };
  };
}

// Helper types for easier usage
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// Specific table types
export type Organization = Tables<"organizations">;
export type User = Tables<"users">;
export type OrganizationMember = Tables<"organization_members">;
export type Repository = Tables<"repositories">;
export type Project = Tables<"projects">;
export type Issue = Tables<"issues">;
export type IssueComment = Tables<"issue_comments">;
export type Activity = Tables<"activities">;
export type AIUsage = Tables<"ai_usage">;

// Enum types
export type SubscriptionStatus = Enums<"subscription_status">;
export type OrganizationRole = Enums<"organization_role">;
export type ProjectStatus = Enums<"project_status">;
export type IssueStatus = Enums<"issue_status">;
export type IssuePriority = Enums<"issue_priority">;
export type ActivityType = Enums<"activity_type">;

// Utility types for database operations
export type InsertOrganization = Omit<
  Database["public"]["Tables"]["organizations"]["Insert"],
  "id" | "created_at" | "updated_at"
>;

export type UpdateOrganization = Omit<
  Database["public"]["Tables"]["organizations"]["Update"],
  "id" | "created_at" | "updated_at"
>;

export type InsertUser = Omit<
  Database["public"]["Tables"]["users"]["Insert"],
  "id" | "created_at" | "updated_at"
>;

export type UpdateUser = Omit<
  Database["public"]["Tables"]["users"]["Update"],
  "id" | "created_at" | "updated_at"
>;

export type InsertRepository = Omit<
  Database["public"]["Tables"]["repositories"]["Insert"],
  "id" | "created_at" | "updated_at"
>;

export type UpdateRepository = Omit<
  Database["public"]["Tables"]["repositories"]["Update"],
  "id" | "created_at" | "updated_at"
>;

export type InsertProject = Omit<
  Database["public"]["Tables"]["projects"]["Insert"],
  "id" | "created_at" | "updated_at"
>;

export type UpdateProject = Omit<
  Database["public"]["Tables"]["projects"]["Update"],
  "id" | "created_at" | "updated_at"
>;

export type InsertIssue = Omit<
  Database["public"]["Tables"]["issues"]["Insert"],
  "id" | "created_at" | "updated_at"
>;

export type UpdateIssue = Omit<
  Database["public"]["Tables"]["issues"]["Update"],
  "id" | "created_at" | "updated_at" | "completed_at"
>;

export type InsertIssueComment = Omit<
  Database["public"]["Tables"]["issue_comments"]["Insert"],
  "id" | "created_at" | "updated_at"
>;

export type UpdateIssueComment = Omit<
  Database["public"]["Tables"]["issue_comments"]["Update"],
  "id" | "created_at" | "updated_at"
>;

export type InsertActivity = Omit<
  Database["public"]["Tables"]["activities"]["Insert"],
  "id" | "created_at"
>;

export type InsertAIUsage = Omit<
  Database["public"]["Tables"]["ai_usage"]["Insert"],
  "id" | "created_at"
>;

export type InsertOrganizationMember = Omit<
  Database["public"]["Tables"]["organization_members"]["Insert"],
  "id" | "invited_at"
>;

export type UpdateOrganizationMember = Omit<
  Database["public"]["Tables"]["organization_members"]["Update"],
  "id" | "invited_at"
>;

// Type guards for date string conversion
export const isDateString = (value: unknown): value is string => {
  if (typeof value !== "string") return false;
  return !isNaN(Date.parse(value));
};

// Utility function to convert date strings to Date objects
export const parseDates = <T extends Record<string, any>>(
  obj: T,
  dateFields: (keyof T)[],
): T => {
  const result = { ...obj };
  dateFields.forEach((field) => {
    if (result[field] && isDateString(result[field])) {
      (result as any)[field] = new Date(result[field] as string);
    }
  });
  return result;
};

// Define date fields for each table
export const dateFields = {
  organizations: ["created_at", "updated_at", "trial_ends_at"],
  users: ["created_at", "updated_at"],
  organization_members: ["invited_at", "joined_at"],
  repositories: ["created_at", "updated_at"],
  projects: ["created_at", "updated_at"],
  issues: ["created_at", "updated_at", "completed_at"],
  issue_comments: ["created_at", "updated_at"],
  activities: ["created_at"],
  ai_usage: ["created_at"],
} as const;
