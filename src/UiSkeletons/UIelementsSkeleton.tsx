import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function UIelementsSkeleton() {
  return (
    <div className="">
      <Skeleton className="my-4 min-h-96 w-full animate-none rounded-xl bg-muted lg:my-4" />
    </div>
  );
}

export default UIelementsSkeleton;
