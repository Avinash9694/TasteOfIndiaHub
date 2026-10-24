import { Link } from 'react-router-dom';
import { ButtonLink } from '@/components/button';
import { ChefCard } from '@/components/chef-card';
import { CheckIcon, QuoteIcon } from '@/components/icons';
import { RecipeCard } from '@/components/recipe-card';
import { SectionHeading } from '@/components/section-heading';
import { GridSkeleton } from '@/components/skeletons';
import { ErrorState } from '@/components/states';
import { useCatalog } from '@/data/catalog-context';
import { sortRecipes } from '@/data/recipe-filters';
import { useAuth } from '@/features/auth/auth-context';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { assetUrl } from '@/lib/assets';
import { useSavedRecipes } from '@/store/saved-recipes';
import { toast } from '@/store/toast';

const HERO_IMAGES = [
  { src: 'img/gallery/img-1.webp', alt: 'Biryani served in a copper handi', span: 'row-span-2' },
  { src: 'img/gallery/img-3.webp', alt: 'Paneer tikka skewers fresh off the grill', span: '' },
  { src: 'img/gallery/img-8.webp', alt: 'Vada pav with chutneys', span: '' },
  { src: 'img/gallery/img-7.webp', alt: 'Chicken curry garnished with coriander', span: '' },
  { src: 'img/gallery/img-9.webp', alt: 'Samosas with dipping sauces', span: '' },
];

const SKILLS = [
  'Learn new recipes from working chefs',
  'Experiment with regional spice blends',
  'Write and keep your own recipe notes',
  'Understand nutrition and portioning',
  'Pick up the small tips that fix a dish',
  'Save and revisit the ones you love',
];

export function HomePage() {
  useDocumentTitle();
  const catalog = useCatalog();
  const { user } = useAuth();
  const savedStore = useSavedRecipes(user?.uid ?? null);

  const onToggleSave = user
    ? (slug: string) => {
        const nowSaved = savedStore.toggle(slug);
        toast.success(nowSaved ? 'Saved to your recipes.' : 'Removed from saved recipes.');
      }
    : undefined;

  return (
    <>
      <section className="container-x grid items-center gap-10 py-10 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        <div className="animate-fade-up">
          <p className="text-accent-strong mb-4 font-mono text-xs tracking-[0.18em] uppercase">
            Indian recipes, written for home kitchens
          </p>
          <h1 className="text-ink text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Cook the India <span className="text-accent-strong italic">you</span> grew up eating.
          </h1>
          <p className="text-ink-soft mt-6 max-w-xl text-lg leading-relaxed">
            Eighteen tested recipes from six of India&apos;s best-known chefs, from a weeknight
            palak paneer to a Sunday dum biryani. Filter by region, diet and difficulty, tick off
            ingredients as you go, and save what works.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/recipes" size="lg">
              Explore recipes
            </ButtonLink>
            <ButtonLink to="/chefs" variant="secondary" size="lg">
              Meet the chefs
            </ButtonLink>
          </div>
          <dl className="text-ink-muted mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Fact value="18" label="recipes" />
            <Fact value="6" label="chefs" />
            <Fact value="4" label="regions" />
            <Fact value="0" label="ads" />
          </dl>
        </div>
        <div
          className="grid grid-cols-3 grid-rows-2 gap-3 sm:gap-4"
          aria-label="Dishes from the collection"
          role="img"
        >
          {HERO_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`bg-surface-2 overflow-hidden rounded-2xl shadow-card ${img.span} ${
                i === 0 ? 'aspect-[3/4] sm:aspect-auto' : 'aspect-square'
              }`}
            >
              <img
                src={assetUrl(img.src)}
                alt={img.alt}
                loading={i < 2 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                decoding={i < 2 ? 'sync' : 'async'}
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-12" aria-labelledby="featured-recipes">
        <SectionHeading
          id="featured-recipes"
          eyebrow="Featured"
          title="Highest-rated this month"
          description="The recipes readers come back to. Each one lists exact quantities, timings and the step people usually get wrong."
          action={
            <ButtonLink to="/recipes" variant="secondary">
              All recipes
            </ButtonLink>
          }
        />
        {catalog.status === 'loading' && <GridSkeleton count={6} />}
        {catalog.status === 'error' && (
          <ErrorState title="Recipes failed to load" description={catalog.error} />
        )}
        {catalog.status === 'ready' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortRecipes(catalog.data.recipes, 'rating')
              .slice(0, 6)
              .map((r, i) => (
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
      </section>

      <section className="bg-surface border-line border-y py-16" aria-labelledby="top-chefs">
        <div className="container-x">
          <SectionHeading
            id="top-chefs"
            eyebrow="The chefs"
            title="Six kitchens, six points of view"
            description="MasterChef judges and winners, a pastry pioneer and the man behind Asia's longest-running cookery show."
            action={
              <ButtonLink to="/chefs" variant="secondary">
                All chefs
              </ButtonLink>
            }
          />
          {catalog.status === 'ready' ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {catalog.data.chefs.slice(0, 6).map((chef) => (
                <ChefCard key={chef.id} chef={chef} />
              ))}
            </div>
          ) : (
            <GridSkeleton count={3} kind="chef" />
          )}
        </div>
      </section>

      <section
        className="container-x grid items-center gap-10 py-16 lg:grid-cols-2"
        aria-labelledby="skills"
      >
        <div
          className="bg-surface-2 overflow-hidden rounded-3xl shadow-card"
          style={{ aspectRatio: '1 / 1' }}
        >
          <img
            src={assetUrl('img/gallery/img-10.webp')}
            alt="A full Indian thali with a dozen small dishes"
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </div>
        <div>
          <p className="text-accent-strong mb-2 font-mono text-xs tracking-[0.18em] uppercase">
            Why sign up
          </p>
          <h2 id="skills" className="text-ink text-3xl font-semibold tracking-tight sm:text-4xl">
            Improve your culinary skills
          </h2>
          <ul className="mt-6 space-y-3">
            {SKILLS.map((item) => (
              <li key={item} className="text-ink-soft flex items-start gap-3">
                <span className="bg-leaf-soft text-leaf mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full">
                  <CheckIcon size={14} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {user ? (
              <ButtonLink to="/saved" size="lg">
                Go to saved recipes
              </ButtonLink>
            ) : (
              <ButtonLink to="/register" size="lg">
                Create a free account
              </ButtonLink>
            )}
          </div>
        </div>
      </section>

      <section className="container-x pb-8">
        <figure className="bg-accent-soft/60 border-line rounded-3xl border px-6 py-12 text-center sm:px-16">
          <QuoteIcon className="text-accent mx-auto" />
          <blockquote className="font-display text-ink mx-auto mt-4 max-w-3xl text-2xl leading-snug sm:text-3xl">
            Do not be afraid of cooking, as your ingredients will know and misbehave. Enjoy your
            cooking and the food will behave; moreover, it will pass your pleasure on to those who
            eat it.
          </blockquote>
          <figcaption className="text-ink-muted mt-5 text-sm">
            Fergus Henderson ·{' '}
            <Link to="/blog" className="text-accent-strong underline-offset-4 hover:underline">
              more from the blog
            </Link>
          </figcaption>
        </figure>
      </section>
    </>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <dt className="sr-only">{label}</dt>
      <dd className="text-ink font-mono text-base font-semibold">{value}</dd>
      <dd>{label}</dd>
    </div>
  );
}
