import { Link, useParams } from 'react-router-dom';
import { Avatar } from '@/components/avatar';
import { Badge } from '@/components/badge';
import { ArrowLeftIcon } from '@/components/icons';
import { RecipeCard } from '@/components/recipe-card';
import { DetailSkeleton } from '@/components/skeletons';
import { EmptyState, ErrorState } from '@/components/states';
import { useCatalog } from '@/data/catalog-context';
import { useAuth } from '@/features/auth/auth-context';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { formatCount } from '@/lib/format';
import { useSavedRecipes } from '@/store/saved-recipes';
import { toast } from '@/store/toast';
import NotFoundPage from './not-found-page';

export default function ChefDetailPage() {
  const { slug = '' } = useParams();
  const catalog = useCatalog();
  const { user } = useAuth();
  const savedStore = useSavedRecipes(user?.uid ?? null);
  const chef = catalog.chefBySlug(slug);
  useDocumentTitle(chef?.name, chef?.bio);

  if (catalog.status === 'loading') return <DetailSkeleton />;
  if (catalog.status === 'error') {
    return (
      <div className="container-x py-12">
        <ErrorState title="Chef failed to load" description={catalog.error} />
      </div>
    );
  }
  if (!chef) return <NotFoundPage />;

  const recipes = catalog.recipesForChef(chef.slug);
  const onToggleSave = user
    ? (s: string) => {
        const nowSaved = savedStore.toggle(s);
        toast.success(nowSaved ? 'Saved to your recipes.' : 'Removed from saved recipes.');
      }
    : undefined;

  return (
    <div className="container-x py-8 lg:py-12">
      <Link
        to="/chefs"
        className="text-ink-soft hover:text-accent-strong inline-flex items-center gap-1.5 text-sm"
      >
        <ArrowLeftIcon size={16} /> All chefs
      </Link>
      <header className="card mt-6 grid gap-8 p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
        <Avatar
          name={chef.name}
          src={chef.img}
          size={160}
          priority
          className="ring-accent-soft mx-auto ring-4 lg:mx-0"
        />
        <div className="text-center lg:text-left">
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            <Badge tone="accent">{chef.specialty}</Badge>
            <Badge>Based in {chef.basedIn}</Badge>
          </div>
          <h1 className="text-ink mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {chef.name}
          </h1>
          <p className="text-ink-soft mt-4 max-w-2xl leading-relaxed">{chef.bio}</p>
          <dl className="mt-6 grid grid-cols-3 gap-4 sm:max-w-md">
            <Stat label="Recipes published" value={formatCount(chef.recipesCount)} />
            <Stat label="Years cooking" value={formatCount(chef.yearsOfExperience)} />
            <Stat label="Likes" value={formatCount(chef.likes)} />
          </dl>
        </div>
      </header>

      <section className="mt-12" aria-labelledby="chef-recipes">
        <h2 id="chef-recipes" className="text-ink text-2xl font-semibold">
          {chef.name.split(' ')[0]}&apos;s recipes on the hub
        </h2>
        {recipes.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="No recipes yet"
              description="This chef's recipes are on their way."
            />
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((r, i) => (
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
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-2 rounded-xl p-3 text-center">
      <dd className="text-ink font-mono text-xl font-semibold">{value}</dd>
      <dt className="text-ink-muted mt-1 text-[11px] leading-tight">{label}</dt>
    </div>
  );
}
