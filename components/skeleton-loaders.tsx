"use client";

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4 animate-pulse">
      <div className="aspect-video bg-muted rounded-lg" />
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-muted rounded flex-1" />
          <div className="h-8 bg-muted rounded flex-1" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCardGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-12 bg-muted rounded w-1/3" />
      <div className="h-6 bg-muted rounded w-2/3" />
      <div className="h-40 bg-muted rounded-lg" />
    </div>
  );
}
