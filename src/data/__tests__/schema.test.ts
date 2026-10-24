import { describe, expect, it } from 'vitest';
import bundled from '../chefs.json';
import { buildCatalog, CatalogValidationError, normalizeCatalog, parseCatalog } from '../normalize';
import { rawRecipeSchema } from '../schema';

const sampleRecipe = {
  slug: 'test-dal',
  name: 'Test Dal',
  img: null,
  description: 'A dal.',
  region: 'North',
  diet: 'veg',
  course: 'main',
  difficulty: 'easy',
  prepMinutes: 10,
  cookMinutes: 20,
  servings: 2,
  rating: 4.5,
  ingredients: ['lentils'],
  steps: ['cook'],
  tags: [],
};

const sampleChef = {
  id: '9',
  slug: 'test-chef',
  name: 'Test Chef',
  img: null,
  recipesCount: 1,
  yearsOfExperience: 2,
  likes: 3,
  specialty: 'Testing',
  basedIn: 'Nowhere',
  bio: 'Bio.',
  recipes: [sampleRecipe],
};

describe('catalog schema', () => {
  it('validates the bundled dataset and every recipe is complete', () => {
    const catalog = buildCatalog(bundled);
    expect(catalog.chefs).toHaveLength(6);
    expect(catalog.recipes).toHaveLength(18);
    for (const r of catalog.recipes) {
      expect(r.ingredients.length).toBeGreaterThanOrEqual(4);
      expect(r.steps.length).toBeGreaterThanOrEqual(3);
      expect(r.totalMinutes).toBe(r.prepMinutes + r.cookMinutes);
    }
  });

  it('coerces the legacy string numbers the old API used', () => {
    const parsed = rawRecipeSchema.parse({ ...sampleRecipe, prepMinutes: '15', rating: '4.2' });
    expect(parsed.prepMinutes).toBe(15);
    expect(parsed.rating).toBe(4.2);
  });

  it('rejects an unknown region with a readable error', () => {
    expect(() =>
      parseCatalog([{ ...sampleChef, recipes: [{ ...sampleRecipe, region: 'Mars' }] }]),
    ).toThrow(CatalogValidationError);
    try {
      parseCatalog([{ ...sampleChef, recipes: [{ ...sampleRecipe, region: 'Mars' }] }]);
    } catch (error) {
      expect((error as CatalogValidationError).issues[0]).toMatch(/0\.recipes\.0\.region/);
    }
  });

  it('rejects an empty catalog', () => {
    expect(() => parseCatalog([])).toThrow(CatalogValidationError);
  });

  it('flattens recipes with chef references', () => {
    const catalog = normalizeCatalog(parseCatalog([sampleChef]));
    expect(catalog.recipes[0]).toMatchObject({
      chefId: '9',
      chefSlug: 'test-chef',
      chefName: 'Test Chef',
    });
    expect(catalog.chefs[0]?.recipeSlugs).toEqual(['test-dal']);
  });

  it('refuses duplicate recipe slugs across chefs', () => {
    const other = { ...sampleChef, id: '10', slug: 'other-chef' };
    expect(() => normalizeCatalog(parseCatalog([sampleChef, other]))).toThrow(
      /duplicate recipe slug/,
    );
  });
});
