import { z } from 'zod';

export const REGIONS = ['North', 'South', 'East', 'West'] as const;
export const DIETS = ['veg', 'non-veg'] as const;
export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
export const COURSES = ['starter', 'main', 'bread', 'dessert', 'street-food'] as const;

// The legacy API serialised every number as a string; coerce so both shapes validate.
const intLike = z.coerce.number().int().nonnegative();

export const rawRecipeSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  img: z.string().min(1).nullable(),
  description: z.string().min(1),
  region: z.enum(REGIONS),
  diet: z.enum(DIETS),
  course: z.enum(COURSES),
  difficulty: z.enum(DIFFICULTIES),
  prepMinutes: intLike,
  cookMinutes: intLike,
  servings: intLike.min(1),
  rating: z.coerce.number().min(0).max(5),
  ingredients: z.array(z.string().min(1)).min(1),
  steps: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)).default([]),
});

export const rawChefSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  img: z.string().min(1).nullable(),
  recipesCount: intLike,
  yearsOfExperience: intLike,
  likes: intLike,
  specialty: z.string().min(1),
  basedIn: z.string().min(1),
  bio: z.string().min(1),
  recipes: z.array(rawRecipeSchema),
});

export const catalogSchema = z.array(rawChefSchema).min(1);

export type Region = (typeof REGIONS)[number];
export type Diet = (typeof DIETS)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];
export type Course = (typeof COURSES)[number];
export type RawRecipe = z.infer<typeof rawRecipeSchema>;
export type RawChef = z.infer<typeof rawChefSchema>;
