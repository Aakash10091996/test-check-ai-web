import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function SidebarSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="mx-3 my-1 h-9 animate-none" />
      <Skeleton className="mx-3 my-1 h-9 w-4/5 animate-none" />
      <Skeleton className="mx-3 my-1 h-9 animate-none" />
      <Skeleton className="mx-3 my-1 h-9 w-3/5 animate-none" />
      <Skeleton className="mx-3 my-1 h-9 w-4/5 animate-none" />
      <Skeleton className="mx-3 my-1 h-9 w-3/5 animate-none" />
      <Skeleton className="mx-3 my-1 h-9 animate-none" />
      <Skeleton className="mx-3 my-1 h-9 w-4/5 animate-none" />
    </div>
  );
}

export default SidebarSkeleton;
