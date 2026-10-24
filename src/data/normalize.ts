import { catalogSchema, type RawChef } from './schema';
import { type Catalog, type Chef, type Recipe } from './types';

export class CatalogValidationError extends Error {
  constructor(public readonly issues: string[]) {
    super(`Catalog failed validation: ${issues.slice(0, 3).join('; ')}`);
    this.name = 'CatalogValidationError';
  }
}

export function parseCatalog(input: unknown): RawChef[] {
  const result = catalogSchema.safeParse(input);
  if (!result.success) {
    throw new CatalogValidationError(
      result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
    );
  }
  return result.data;
}

export function normalizeCatalog(rawChefs: RawChef[]): Catalog {
  const seen = new Set<string>();
  const chefs: Chef[] = [];
  const recipes: Recipe[] = [];

  for (const { recipes: rawRecipes, ...chef } of rawChefs) {
    const recipeSlugs: string[] = [];
    for (const raw of rawRecipes) {
      if (seen.has(raw.slug)) {
        throw new CatalogValidationError([`duplicate recipe slug "${raw.slug}"`]);
      }
      seen.add(raw.slug);
      recipeSlugs.push(raw.slug);
      recipes.push({
        ...raw,
        chefId: chef.id,
        chefSlug: chef.slug,
        chefName: chef.name,
        totalMinutes: raw.prepMinutes + raw.cookMinutes,
      });
    }
    chefs.push({ ...chef, recipeSlugs });
  }

  return { chefs, recipes };
}

export function buildCatalog(input: unknown): Catalog {
  return normalizeCatalog(parseCatalog(input));
}
