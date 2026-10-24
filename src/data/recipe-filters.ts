import { DIETS, DIFFICULTIES, REGIONS, type Diet, type Difficulty, type Region } from './schema';
import { type Recipe } from './types';

export type RecipeFilters = {
  q: string;
  chef: string;
  region: Region | '';
  diet: Diet | '';
  difficulty: Difficulty | '';
};

export type SortKey = 'rating' | 'time' | 'name';

export const EMPTY_FILTERS: RecipeFilters = {
  q: '',
  chef: '',
  region: '',
  diet: '',
  difficulty: '',
};

export type FacetOption<T extends string = string> = { value: T; label: string; count: number };

export type Facets = {
  chefs: FacetOption[];
  regions: FacetOption<Region>[];
  diets: FacetOption<Diet>[];
  difficulties: FacetOption<Difficulty>[];
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const DIET_LABELS: Record<Diet, string> = { veg: 'Vegetarian', 'non-veg': 'Non-vegetarian' };

function countBy<T extends string>(recipes: Recipe[], pick: (r: Recipe) => T) {
  const counts = new Map<T, number>();
  for (const r of recipes) counts.set(pick(r), (counts.get(pick(r)) ?? 0) + 1);
  return counts;
}

export function deriveFacets(recipes: Recipe[]): Facets {
  const chefCounts = countBy(recipes, (r) => r.chefSlug);
  const chefNames = new Map(recipes.map((r) => [r.chefSlug, r.chefName]));
  const regionCounts = countBy(recipes, (r) => r.region);
  const dietCounts = countBy(recipes, (r) => r.diet);
  const difficultyCounts = countBy(recipes, (r) => r.difficulty);

  return {
    chefs: [...chefCounts.entries()]
      .map(([value, count]) => ({ value, label: chefNames.get(value) ?? value, count }))
      .sort((a, b) => a.label.localeCompare(b.label)),
    regions: REGIONS.filter((r) => regionCounts.has(r)).map((value) => ({
      value,
      label: `${value} India`,
      count: regionCounts.get(value) ?? 0,
    })),
    diets: DIETS.filter((d) => dietCounts.has(d)).map((value) => ({
      value,
      label: DIET_LABELS[value],
      count: dietCounts.get(value) ?? 0,
    })),
    difficulties: DIFFICULTIES.filter((d) => difficultyCounts.has(d)).map((value) => ({
      value,
      label: capitalize(value),
      count: difficultyCounts.get(value) ?? 0,
    })),
  };
}

export function normalizeQuery(q: string) {
  return q.trim().toLowerCase().replace(/\s+/g, ' ');
}

function matchesQuery(recipe: Recipe, q: string) {
  if (!q) return true;
  const haystack = [
    recipe.name,
    recipe.chefName,
    recipe.description,
    recipe.region,
    recipe.course,
    ...recipe.tags,
    ...recipe.ingredients,
  ]
    .join(' ')
    .toLowerCase();
  return q.split(' ').every((term) => haystack.includes(term));
}

export function filterRecipes(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
  const q = normalizeQuery(filters.q);
  return recipes.filter(
    (r) =>
      matchesQuery(r, q) &&
      (!filters.chef || r.chefSlug === filters.chef) &&
      (!filters.region || r.region === filters.region) &&
      (!filters.diet || r.diet === filters.diet) &&
      (!filters.difficulty || r.difficulty === filters.difficulty),
  );
}

export function sortRecipes(recipes: Recipe[], sort: SortKey): Recipe[] {
  const copy = [...recipes];
  switch (sort) {
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
    case 'time':
      return copy.sort((a, b) => a.totalMinutes - b.totalMinutes || a.name.localeCompare(b.name));
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
}

export function countActiveFilters(filters: RecipeFilters) {
  return (['chef', 'region', 'diet', 'difficulty'] as const).filter((k) => filters[k]).length;
}

function pickEnum<T extends string>(value: string | null, allowed: readonly T[]): T | '' {
  return allowed.includes(value as T) ? (value as T) : '';
}

export function filtersFromParams(params: URLSearchParams): RecipeFilters {
  return {
    q: params.get('q') ?? '',
    chef: params.get('chef') ?? '',
    region: pickEnum(params.get('region'), REGIONS),
    diet: pickEnum(params.get('diet'), DIETS),
    difficulty: pickEnum(params.get('difficulty'), DIFFICULTIES),
  };
}

export function paramsFromFilters(filters: RecipeFilters, sort?: SortKey): URLSearchParams {
  const params = new URLSearchParams();
  for (const key of ['q', 'chef', 'region', 'diet', 'difficulty'] as const) {
    const value = key === 'q' ? filters.q.trim() : filters[key];
    if (value) params.set(key, value);
  }
  if (sort && sort !== 'rating') params.set('sort', sort);
  return params;
}
