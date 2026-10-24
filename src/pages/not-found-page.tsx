import { ButtonLink } from '@/components/button';
import { useDocumentTitle } from '@/hooks/use-document-title';

export default function NotFoundPage() {
  useDocumentTitle('Page not found');
  return (
    <div className="container-x flex flex-col items-center py-24 text-center">
      <p className="text-accent-strong font-mono text-sm tracking-[0.18em] uppercase">404</p>
      <h1 className="text-ink mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        This plate came back empty.
      </h1>
      <p className="text-ink-soft mt-4 max-w-md">
        The page you asked for does not exist or has been moved. The recipes are all still where
        they should be.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/" size="lg">
          Back to home
        </ButtonLink>
        <ButtonLink to="/recipes" variant="secondary" size="lg">
          Browse recipes
        </ButtonLink>
      </div>
    </div>
  );
}
