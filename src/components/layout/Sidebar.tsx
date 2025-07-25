"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SidebarNav } from "./SidebarNav";
import { UserMenu } from "./UserMenu";
import { useWorkspaceStore } from "@/stores/workspace.store";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  pathname: string;
}

export function Sidebar({ isOpen, onToggle, pathname }: SidebarProps) {
  const { currentWorkspace } = useWorkspaceStore();
  
  console.log("[Sidebar] Current workspace:", currentWorkspace);
  console.log("[Sidebar] Pathname:", pathname);

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-card border-r transition-all duration-200",
        isOpen ? "w-64" : "w-16",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Workspace name section */}
        <div className="px-4 py-3 border-b">
          <h2 className={cn(
            "font-semibold text-sm truncate transition-opacity duration-200",
            !isOpen && "opacity-0"
          )}>
            {currentWorkspace ? currentWorkspace.name : "No Workspace Selected"}
          </h2>
        </div>
        
        <div className="flex h-12 items-center justify-between px-4 border-b">
          {/* Spacer to keep toggle button on the right */}
          <div className="flex-1" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  className="h-8 w-8"
                  aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                  {isOpen ? (
                    <ChevronLeft className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isOpen ? "Collapse" : "Expand"} (⌘B)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <SidebarNav isOpen={isOpen} pathname={pathname} />
        </div>

        <div className="border-t p-4">
          <UserMenu isOpen={isOpen} />
        </div>
      </div>
    </aside>
  );
}
