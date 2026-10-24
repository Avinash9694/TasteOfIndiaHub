import { Link, useParams } from 'react-router-dom';
import { Avatar } from '@/components/avatar';
import { Badge, DietBadge, DifficultyBadge } from '@/components/badge';
import { Button } from '@/components/button';
import { DishImage } from '@/components/dish-image';
import { ArrowLeftIcon, ClockIcon, HeartIcon, UsersIcon } from '@/components/icons';
import { Rating } from '@/components/rating';
import { RecipeCard } from '@/components/recipe-card';
import { DetailSkeleton } from '@/components/skeletons';
import { ErrorState } from '@/components/states';
import { useCatalog } from '@/data/catalog-context';
import { useAuth } from '@/features/auth/auth-context';
import { IngredientChecklist } from '@/features/recipes/ingredient-checklist';
import { ShareButton } from '@/features/recipes/share-button';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { capitalize, formatMinutes } from '@/lib/format';
import { useSavedRecipes } from '@/store/saved-recipes';
import { toast } from '@/store/toast';
import NotFoundPage from './not-found-page';

export default function RecipeDetailPage() {
  const { slug = '' } = useParams();
  const catalog = useCatalog();
  const { user, status } = useAuth();
  const savedStore = useSavedRecipes(user?.uid ?? null);
  const recipe = catalog.recipeBySlug(slug);
  const chef = recipe ? catalog.chefBySlug(recipe.chefSlug) : undefined;
  useDocumentTitle(recipe?.name, recipe?.description);

  if (catalog.status === 'loading') return <DetailSkeleton />;
  if (catalog.status === 'error') {
    return (
      <div className="container-x py-12">
        <ErrorState title="Recipe failed to load" description={catalog.error} />
      </div>
    );
  }
  if (!recipe || !chef) return <NotFoundPage />;

  const saved = savedStore.has(recipe.slug);
  const more = catalog
    .recipesForChef(chef.slug)
    .filter((r) => r.slug !== recipe.slug)
    .slice(0, 3);

  const onSave = () => {
    const nowSaved = savedStore.toggle(recipe.slug);
    toast.success(nowSaved ? 'Saved to your recipes.' : 'Removed from saved recipes.');
  };

  return (
    <article className="container-x py-8 lg:py-12">
      <Link
        to="/recipes"
        className="text-ink-soft hover:text-accent-strong inline-flex items-center gap-1.5 text-sm"
      >
        <ArrowLeftIcon size={16} /> All recipes
      </Link>

      <header className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <DietBadge diet={recipe.diet} />
            <DifficultyBadge difficulty={recipe.difficulty} />
            <Badge>{recipe.region} India</Badge>
            <Badge>{capitalize(recipe.course.replace('-', ' '))}</Badge>
          </div>
          <h1 className="text-ink mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {recipe.name}
          </h1>
          <p className="text-ink-soft mt-4 text-lg leading-relaxed">{recipe.description}</p>

          <Link
            to={`/chefs/${chef.slug}`}
            className="hover:bg-surface-2 mt-6 inline-flex items-center gap-3 rounded-xl py-1.5 pr-4 pl-1.5"
          >
            <Avatar name={chef.name} src={chef.img} size={40} priority />
            <span>
              <span className="text-ink-muted block text-xs">Recipe by</span>
              <span className="text-ink text-sm font-medium">{chef.name}</span>
            </span>
          </Link>

          <dl className="border-line mt-6 grid grid-cols-2 gap-4 border-y py-4 sm:grid-cols-4">
            <Meta icon={<ClockIcon />} label="Prep" value={formatMinutes(recipe.prepMinutes)} />
            <Meta icon={<ClockIcon />} label="Cook" value={formatMinutes(recipe.cookMinutes)} />
            <Meta icon={<UsersIcon />} label="Serves" value={String(recipe.servings)} />
            <div>
              <dt className="text-ink-muted text-xs">Rating</dt>
              <dd className="mt-1">
                <Rating value={recipe.rating} />
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            {user ? (
              <Button
                variant={saved ? 'secondary' : 'primary'}
                onClick={onSave}
                aria-pressed={saved}
              >
                <HeartIcon size={18} filled={saved} /> {saved ? 'Saved' : 'Save recipe'}
              </Button>
            ) : status !== 'unavailable' ? (
              <Link
                to="/login"
                state={{ from: `/recipes/${recipe.slug}` }}
                className="bg-accent text-on-accent hover:bg-accent-strong inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-medium"
              >
                <HeartIcon size={18} /> Sign in to save
              </Link>
            ) : null}
            <ShareButton title={recipe.name} text={recipe.description} />
          </div>
        </div>
        <DishImage
          src={recipe.img}
          alt={`${recipe.name}, plated`}
          name={recipe.name}
          ratio="4 / 3"
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="rounded-3xl shadow-card"
        />
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <IngredientChecklist recipeSlug={recipe.slug} ingredients={recipe.ingredients} />
        </div>
        <section aria-labelledby="method-heading">
          <h2 id="method-heading" className="text-ink text-2xl font-semibold">
            Method
          </h2>
          <ol className="mt-5 space-y-6">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="bg-accent-soft text-accent-strong font-display flex size-9 shrink-0 items-center justify-center rounded-full text-base font-semibold">
                  {i + 1}
                </span>
                <p className="text-ink-soft pt-1.5 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
          {recipe.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Link key={tag} to={`/recipes?q=${encodeURIComponent(tag)}`}>
                  <Badge className="hover:bg-accent-soft">#{tag}</Badge>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      {more.length > 0 && (
        <section className="mt-16" aria-labelledby="more-heading">
          <h2 id="more-heading" className="text-ink text-2xl font-semibold">
            More from {chef.name}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((r) => (
              <RecipeCard
                key={r.slug}
                recipe={r}
                saved={savedStore.has(r.slug)}
                onToggleSave={user ? onSaveFor(savedStore.toggle) : undefined}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function onSaveFor(toggle: (slug: string) => boolean) {
  return (slug: string) => {
    const nowSaved = toggle(slug);
    toast.success(nowSaved ? 'Saved to your recipes.' : 'Removed from saved recipes.');
  };
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="text-ink-muted flex items-center gap-1 text-xs">
        {icon} {label}
      </dt>
      <dd className="text-ink mt-1 font-mono text-sm font-medium">{value}</dd>
    </div>
  );
}
