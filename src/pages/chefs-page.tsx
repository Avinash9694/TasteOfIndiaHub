import { ChefCard } from '@/components/chef-card';
import { SectionHeading } from '@/components/section-heading';
import { GridSkeleton } from '@/components/skeletons';
import { ErrorState } from '@/components/states';
import { useCatalog } from '@/data/catalog-context';
import { useDocumentTitle } from '@/hooks/use-document-title';

export default function ChefsPage() {
  useDocumentTitle('Chefs', 'The six chefs behind the recipes on Taste of India Hub.');
  const catalog = useCatalog();
  return (
    <div className="container-x py-10 lg:py-14">
      <SectionHeading
        eyebrow="Chefs"
        title="The people behind the recipes"
        description="Television judges, competition winners and a pastry pioneer. Each profile lists their recipes on the site."
      />
      {catalog.status === 'loading' && <GridSkeleton count={6} kind="chef" />}
      {catalog.status === 'error' && (
        <ErrorState title="Chefs failed to load" description={catalog.error} />
      )}
      {catalog.status === 'ready' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.data.chefs.map((chef) => (
            <ChefCard key={chef.id} chef={chef} />
          ))}
        </div>
      )}
    </div>
  );
}
