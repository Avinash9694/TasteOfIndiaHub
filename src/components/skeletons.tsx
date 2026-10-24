export function RecipeCardSkeleton() {
  return (
    <div className="card overflow-hidden" aria-hidden>
      <div className="skeleton rounded-none" style={{ aspectRatio: '4 / 3' }} />
      <div className="space-y-3 p-4">
        <div className="flex gap-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
        </div>
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/3" />
        <div className="skeleton h-4 w-full" />
      </div>
    </div>
  );
}

export function ChefCardSkeleton() {
  return (
    <div className="card space-y-4 p-5" aria-hidden>
      <div className="flex items-center gap-4">
        <div className="skeleton size-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-5 w-2/3" />
          <div className="skeleton h-4 w-1/2" />
        </div>
      </div>
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-5/6" />
    </div>
  );
}

export function GridSkeleton({
  count = 6,
  kind = 'recipe',
}: {
  count?: number;
  kind?: 'recipe' | 'chef';
}) {
  const Item = kind === 'recipe' ? RecipeCardSkeleton : ChefCardSkeleton;
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {Array.from({ length: count }, (_, i) => (
        <Item key={i} />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="container-x py-10" role="status" aria-live="polite" aria-label="Loading">
      <div className="skeleton h-4 w-32" />
      <div className="skeleton mt-6 h-10 w-2/3" />
      <div className="skeleton mt-3 h-5 w-1/2" />
      <div className="skeleton mt-8 rounded-3xl" style={{ aspectRatio: '16 / 7' }} />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
