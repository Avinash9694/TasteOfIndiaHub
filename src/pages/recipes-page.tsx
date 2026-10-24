import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/button';
import { RecipeCard } from '@/components/recipe-card';
import { SectionHeading } from '@/components/section-heading';
import { GridSkeleton } from '@/components/skeletons';
import { EmptyState, ErrorState } from '@/components/states';
import { useCatalog } from '@/data/catalog-context';
import {
  deriveFacets,
  filterRecipes,
  filtersFromParams,
  paramsFromFilters,
  sortRecipes,
  type RecipeFilters,
  type SortKey,
} from '@/data/recipe-filters';
import { useAuth } from '@/features/auth/auth-context';
import { FilterBar } from '@/features/recipes/filter-bar';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { useSavedRecipes } from '@/store/saved-recipes';
import { toast } from '@/store/toast';

const SORT_KEYS: SortKey[] = ['rating', 'time', 'name'];

export default function RecipesPage() {
  useDocumentTitle('Recipes', 'Search Indian recipes by chef, region, diet and difficulty.');
  const catalog = useCatalog();
  const { user } = useAuth();
  const savedStore = useSavedRecipes(user?.uid ?? null);
  const [params, setParams] = useSearchParams();

  const filters = useMemo(() => filtersFromParams(params), [params]);
  const sortParam = params.get('sort');
  const sort: SortKey = SORT_KEYS.includes(sortParam as SortKey)
    ? (sortParam as SortKey)
    : 'rating';
  const autoFocusSearch = params.get('focus') === 'search';

  const update = (next: RecipeFilters, nextSort = sort) =>
    setParams(paramsFromFilters(next, nextSort), { replace: true });

  const recipes = useMemo(
    () => (catalog.status === 'ready' ? catalog.data.recipes : []),
    [catalog],
  );
  const facets = useMemo(() => deriveFacets(recipes), [recipes]);
  const results = useMemo(
    () => sortRecipes(filterRecipes(recipes, filters), sort),
    [recipes, filters, sort],
  );

  const onToggleSave = user
    ? (slug: string) => {
        const nowSaved = savedStore.toggle(slug);
        toast.success(nowSaved ? 'Saved to your recipes.' : 'Removed from saved recipes.');
      }
    : undefined;

  return (
    <div className="container-x py-10 lg:py-14">
      <SectionHeading
        eyebrow="Recipes"
        title="Find tonight's dinner"
        description="Search by dish or ingredient, then narrow by chef, region, diet and difficulty. Filters live in the URL, so a search is shareable."
      />
      <FilterBar
        filters={filters}
        facets={facets}
        sort={sort}
        resultCount={results.length}
        onChange={(patch) => update({ ...filters, ...patch })}
        onSort={(s) => update(filters, s)}
        onReset={() => setParams(new URLSearchParams(), { replace: true })}
        autoFocusSearch={autoFocusSearch}
      />

      <div className="mt-8">
        {catalog.status === 'loading' && <GridSkeleton count={6} />}
        {catalog.status === 'error' && (
          <ErrorState
            title="Recipes failed to load"
            description={catalog.error}
            action={<Button onClick={() => window.location.reload()}>Try again</Button>}
          />
        )}
        {catalog.status === 'ready' && results.length === 0 && (
          <EmptyState
            title="Nothing matches those filters"
            description="Try a broader search, or clear a filter or two. Every recipe is at most four filters away."
            action={
              <Button
                variant="secondary"
                onClick={() => setParams(new URLSearchParams(), { replace: true })}
              >
                Clear all filters
              </Button>
            }
          />
        )}
        {catalog.status === 'ready' && results.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r, i) => (
              <RecipeCard
                key={r.slug}
                recipe={r}
                priority={i < 3}
                saved={savedStore.has(r.slug)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
