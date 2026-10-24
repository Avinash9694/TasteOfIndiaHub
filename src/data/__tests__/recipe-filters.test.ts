import { describe, expect, it } from 'vitest';
import { loadBundledCatalog } from '../load';
import {
  countActiveFilters,
  deriveFacets,
  EMPTY_FILTERS,
  filterRecipes,
  filtersFromParams,
  paramsFromFilters,
  sortRecipes,
} from '../recipe-filters';

const { recipes } = loadBundledCatalog();

describe('deriveFacets', () => {
  it('derives chef, region, diet and difficulty facets with counts', () => {
    const facets = deriveFacets(recipes);
    expect(facets.chefs).toHaveLength(6);
    expect(facets.chefs.reduce((n, f) => n + f.count, 0)).toBe(recipes.length);
    expect(facets.regions.map((r) => r.value)).toEqual(['North', 'South', 'East', 'West']);
    expect(facets.diets.map((d) => d.value)).toEqual(['veg', 'non-veg']);
    expect(facets.difficulties.map((d) => d.value)).toEqual(['easy', 'medium', 'hard']);
  });

  it('omits facet values with no recipes', () => {
    const onlyVeg = recipes.filter((r) => r.diet === 'veg');
    expect(deriveFacets(onlyVeg).diets.map((d) => d.value)).toEqual(['veg']);
  });
});

describe('filterRecipes', () => {
  it('returns everything for empty filters', () => {
    expect(filterRecipes(recipes, EMPTY_FILTERS)).toHaveLength(recipes.length);
  });

  it('matches query terms across name, ingredients and tags, case-insensitively', () => {
    const byName = filterRecipes(recipes, { ...EMPTY_FILTERS, q: 'BIRYANI' });
    expect(byName.map((r) => r.slug)).toContain('biryani');
    const byIngredient = filterRecipes(recipes, { ...EMPTY_FILTERS, q: 'coconut milk' });
    expect(byIngredient.map((r) => r.slug)).toContain('goan-fish-curry');
    const byTag = filterRecipes(recipes, { ...EMPTY_FILTERS, q: 'diwali' });
    expect(byTag.map((r) => r.slug)).toEqual(['gulab-jamun']);
  });

  it('requires every query term to match', () => {
    expect(
      filterRecipes(recipes, { ...EMPTY_FILTERS, q: 'paneer spinach' }).map((r) => r.slug),
    ).toEqual(['palak-paneer']);
  });

  it('combines facet filters with AND semantics', () => {
    const result = filterRecipes(recipes, { ...EMPTY_FILTERS, diet: 'veg', difficulty: 'hard' });
    expect(result.map((r) => r.slug)).toEqual(['dal-makhani']);
    expect(
      filterRecipes(recipes, { ...EMPTY_FILTERS, chef: 'ranveer-brar', region: 'South' }),
    ).toHaveLength(1);
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterRecipes(recipes, { ...EMPTY_FILTERS, q: 'pizza' })).toEqual([]);
  });
});

describe('sortRecipes', () => {
  it('sorts by rating descending, by total time ascending and by name', () => {
    const byRating = sortRecipes(recipes, 'rating');
    expect(byRating[0]?.rating).toBeGreaterThanOrEqual(byRating.at(-1)?.rating ?? 0);
    const byTime = sortRecipes(recipes, 'time');
    expect(byTime[0]?.totalMinutes).toBeLessThanOrEqual(byTime.at(-1)?.totalMinutes ?? 0);
    const byName = sortRecipes(recipes, 'name');
    expect(byName.map((r) => r.name)).toEqual(
      [...byName.map((r) => r.name)].sort((a, b) => a.localeCompare(b)),
    );
  });

  it('does not mutate the input', () => {
    const copy = [...recipes];
    sortRecipes(recipes, 'name');
    expect(recipes).toEqual(copy);
  });
});

describe('URL round-trip', () => {
  it('serialises only non-empty filters and a non-default sort', () => {
    const params = paramsFromFilters({ ...EMPTY_FILTERS, q: '  dal ', diet: 'veg' }, 'time');
    expect(params.toString()).toBe('q=dal&diet=veg&sort=time');
    expect(paramsFromFilters(EMPTY_FILTERS, 'rating').toString()).toBe('');
  });

  it('parses params and ignores values outside the allowed enums', () => {
    const filters = filtersFromParams(
      new URLSearchParams('q=rice&region=Mars&diet=veg&difficulty=hard&chef=x'),
    );
    expect(filters).toEqual({ q: 'rice', chef: 'x', region: '', diet: 'veg', difficulty: 'hard' });
    expect(countActiveFilters(filters)).toBe(3);
  });
});
