import {
  type Course,
  type Diet,
  type Difficulty,
  type RawChef,
  type RawRecipe,
  type Region,
} from './schema';

export type Chef = Omit<RawChef, 'recipes'> & {
  recipeSlugs: string[];
};

export type Recipe = RawRecipe & {
  chefId: string;
  chefSlug: string;
  chefName: string;
  totalMinutes: number;
};

export type Catalog = {
  chefs: Chef[];
  recipes: Recipe[];
};

export type { Course, Diet, Difficulty, Region };
