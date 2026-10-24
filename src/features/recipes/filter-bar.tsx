import { useEffect, useRef } from 'react';
import { type Facets, type RecipeFilters, type SortKey } from '@/data/recipe-filters';
import { Button } from '@/components/button';
import { CloseIcon, SearchIcon } from '@/components/icons';

type Props = {
  filters: RecipeFilters;
  facets: Facets;
  sort: SortKey;
  resultCount: number;
  onChange: (patch: Partial<RecipeFilters>) => void;
  onSort: (sort: SortKey) => void;
  onReset: () => void;
  autoFocusSearch?: boolean;
};

const selectClass =
  'h-11 w-full rounded-xl border border-line-strong bg-surface px-3 text-sm text-ink focus-visible:outline-focus';

export function FilterBar({
  filters,
  facets,
  sort,
  resultCount,
  onChange,
  onSort,
  onReset,
  autoFocusSearch = false,
}: Props) {
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocusSearch) searchRef.current?.focus();
  }, [autoFocusSearch]);

  const active = Boolean(
    filters.q || filters.chef || filters.region || filters.diet || filters.difficulty,
  );

  return (
    <div className="card p-4 sm:p-5">
      <div className="relative">
        <label htmlFor="recipe-search" className="sr-only">
          Search recipes
        </label>
        <SearchIcon className="text-ink-muted pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
        <input
          id="recipe-search"
          type="search"
          ref={searchRef}
          value={filters.q}
          onChange={(e) => onChange({ q: e.target.value })}
          placeholder="Search by dish, ingredient, chef or tag…"
          autoComplete="off"
          className="border-line-strong bg-surface text-ink placeholder:text-ink-muted focus-visible:outline-focus h-12 w-full rounded-xl border pr-4 pl-12 text-base"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Select
          id="filter-chef"
          label="Chef"
          value={filters.chef}
          onChange={(v) => onChange({ chef: v })}
          options={facets.chefs}
        />
        <Select
          id="filter-region"
          label="Region"
          value={filters.region}
          onChange={(v) => onChange({ region: v as RecipeFilters['region'] })}
          options={facets.regions}
        />
        <Select
          id="filter-diet"
          label="Diet"
          value={filters.diet}
          onChange={(v) => onChange({ diet: v as RecipeFilters['diet'] })}
          options={facets.diets}
        />
        <Select
          id="filter-difficulty"
          label="Difficulty"
          value={filters.difficulty}
          onChange={(v) => onChange({ difficulty: v as RecipeFilters['difficulty'] })}
          options={facets.difficulties}
        />
        <div>
          <label htmlFor="filter-sort" className="text-ink-muted mb-1 block text-xs font-medium">
            Sort by
          </label>
          <select
            id="filter-sort"
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className={selectClass}
          >
            <option value="rating">Highest rated</option>
            <option value="time">Quickest</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-ink-soft text-sm" role="status" aria-live="polite">
          {resultCount === 0
            ? 'No recipes match'
            : `${resultCount} ${resultCount === 1 ? 'recipe' : 'recipes'}`}
          {active ? ' for your filters' : ''}
        </p>
        {active && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <CloseIcon size={16} /> Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}

type SelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; count: number }[];
};

function Select({ id, label, value, onChange, options }: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="text-ink-muted mb-1 block text-xs font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label} ({o.count})
          </option>
        ))}
      </select>
    </div>
  );
}
