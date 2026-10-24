import { ButtonLink } from '@/components/button';
import { HeartIcon } from '@/components/icons';
import { RecipeCard } from '@/components/recipe-card';
import { SectionHeading } from '@/components/section-heading';
import { GridSkeleton } from '@/components/skeletons';
import { EmptyState, ErrorState } from '@/components/states';
import { useCatalog } from '@/data/catalog-context';
import { useAuth } from '@/features/auth/auth-context';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { useSavedRecipes } from '@/store/saved-recipes';
import { toast } from '@/store/toast';

export default function SavedPage() {
  useDocumentTitle('Saved recipes');
  const catalog = useCatalog();
  const { user } = useAuth();
  const savedStore = useSavedRecipes(user?.uid ?? null);

  const recipes = savedStore.saved
    .map((slug) => catalog.recipeBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <div className="container-x py-10 lg:py-14">
      <SectionHeading
        eyebrow="Yours"
        title="Saved recipes"
        description="Stored on this device and tied to your account. Tap the heart again to remove one."
      />
      {catalog.status === 'loading' && <GridSkeleton count={3} />}
      {catalog.status === 'error' && (
        <ErrorState title="Recipes failed to load" description={catalog.error} />
      )}
      {catalog.status === 'ready' && recipes.length === 0 && (
        <EmptyState
          icon={<HeartIcon size={26} />}
          title="No saved recipes yet"
          description="Browse the collection and tap the heart on anything worth cooking twice."
          action={<ButtonLink to="/recipes">Browse recipes</ButtonLink>}
        />
      )}
      {catalog.status === 'ready' && recipes.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => (
            <RecipeCard
              key={r.slug}
              recipe={r}
              saved
              onToggleSave={(slug) => {
                savedStore.remove(slug);
                toast.info(`Removed ${r.name} from saved recipes.`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
