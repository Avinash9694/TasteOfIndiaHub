import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { loadCatalog, type LoadedCatalog } from './load';
import { type Chef, type Recipe } from './types';

export type CatalogStatus =
  | { status: 'loading' }
  | { status: 'ready'; data: LoadedCatalog }
  | { status: 'error'; error: string };

type CatalogContextValue = CatalogStatus & {
  recipeBySlug: (slug: string) => Recipe | undefined;
  chefBySlug: (slug: string) => Chef | undefined;
  recipesForChef: (chefSlug: string) => Recipe[];
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

type Props = { children: ReactNode; initial?: LoadedCatalog; apiUrl?: string | undefined };

export function CatalogProvider({ children, initial, apiUrl }: Props) {
  const [state, setState] = useState<CatalogStatus>(() =>
    initial ? { status: 'ready', data: initial } : { status: 'loading' },
  );

  useEffect(() => {
    if (initial) return;
    let cancelled = false;
    loadCatalog({ apiUrl: apiUrl ?? import.meta.env.VITE_API_URL })
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', data });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: 'error',
            error: error instanceof Error ? error.message : 'Failed to load recipes',
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [initial, apiUrl]);

  const value = useMemo<CatalogContextValue>(() => {
    const data = state.status === 'ready' ? state.data : null;
    const recipeMap = new Map(data?.recipes.map((r) => [r.slug, r]) ?? []);
    const chefMap = new Map(data?.chefs.map((c) => [c.slug, c]) ?? []);
    return {
      ...state,
      recipeBySlug: (slug) => recipeMap.get(slug),
      chefBySlug: (slug) => chefMap.get(slug),
      recipesForChef: (chefSlug) => data?.recipes.filter((r) => r.chefSlug === chefSlug) ?? [],
    };
  }, [state]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used inside <CatalogProvider>');
  return ctx;
}
