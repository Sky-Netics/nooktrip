import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <div>
      <p className="text-lg font-medium">Result:</p>
      <div className="mt-2 grid gap-6">
        {Array.from(['first', 'second']).map((d) => (
          <Skeleton key={d} className="h-64 sm:h-48 w-full" />
        ))}
      </div>
    </div>
  );
}
