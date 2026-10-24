import { Link } from 'react-router-dom';
import { type Recipe } from '@/data/types';
import { formatMinutes } from '@/lib/format';
import { DietBadge, DifficultyBadge } from './badge';
import { DishImage } from './dish-image';
import { ClockIcon, HeartIcon, UsersIcon } from './icons';
import { Rating } from './rating';

type Props = {
  recipe: Recipe;
  saved?: boolean;
  onToggleSave?: ((slug: string) => void) | undefined;
  priority?: boolean;
};

export function RecipeCard({ recipe, saved = false, onToggleSave, priority = false }: Props) {
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <Link
        to={`/recipes/${recipe.slug}`}
        className="focus-visible:outline-focus block rounded-t-2xl focus-visible:outline-2"
        aria-label={`${recipe.name} by ${recipe.chefName}`}
      >
        <DishImage
          src={recipe.img}
          alt=""
          name={recipe.name}
          priority={priority}
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <DietBadge diet={recipe.diet} compact />
          <DifficultyBadge difficulty={recipe.difficulty} />
        </div>
        <div>
          <h3 className="text-ink text-lg leading-snug font-semibold">
            <Link
              to={`/recipes/${recipe.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {recipe.name}
            </Link>
          </h3>
          <p className="text-ink-muted mt-1 text-sm">by {recipe.chefName}</p>
        </div>
        <p className="text-ink-soft line-clamp-2 text-sm leading-relaxed">{recipe.description}</p>
        <div className="text-ink-muted mt-auto flex items-center justify-between pt-1 text-xs">
          <span className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <ClockIcon /> {formatMinutes(recipe.totalMinutes)}
            </span>
            <span className="inline-flex items-center gap-1">
              <UsersIcon /> {recipe.servings}
            </span>
          </span>
          <Rating value={recipe.rating} />
        </div>
      </div>
      {onToggleSave && (
        <button
          type="button"
          onClick={() => onToggleSave(recipe.slug)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${recipe.name} from saved` : `Save ${recipe.name}`}
          className={`absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full border backdrop-blur transition-colors ${
            saved
              ? 'border-terracotta bg-surface text-terracotta'
              : 'border-white/40 bg-black/30 text-white hover:bg-black/45'
          }`}
        >
          <HeartIcon filled={saved} />
        </button>
      )}
    </article>
  );
}
