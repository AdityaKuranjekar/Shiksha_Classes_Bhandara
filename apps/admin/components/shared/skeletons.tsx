import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({ columns = 5, rows = 5 }) {
  return (
    <div className="rounded-md border">
      <div className="h-10 border-b bg-muted/50 flex items-center px-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-[100px] mr-4 last:mr-0" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 border-b last:border-0 flex items-center px-4">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} className="h-4 w-[80%] mr-4 last:mr-0" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-card text-card-foreground shadow">
          <Skeleton className="h-48 w-full rounded-t-xl" />
          <div className="p-6">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex justify-between items-center mt-6">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <div>
        <Skeleton className="h-8 w-1/2 mb-1" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function FormSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <div className="flex justify-end space-x-2 pt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
