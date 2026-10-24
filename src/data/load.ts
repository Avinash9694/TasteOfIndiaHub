import bundled from './chefs.json';
import { buildCatalog } from './normalize';
import { type Catalog } from './types';

export type CatalogSource = 'bundled' | 'api';

export type LoadedCatalog = Catalog & {
  source: CatalogSource;
  warning?: string;
};

export type LoadOptions = {
  apiUrl?: string | undefined;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
};

export function loadBundledCatalog(): LoadedCatalog {
  return { ...buildCatalog(bundled), source: 'bundled' };
}

async function fetchCatalog(apiUrl: string, fetchImpl: typeof fetch, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetchImpl(`${apiUrl.replace(/\/$/, '')}/chef`, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    return buildCatalog(await res.json());
  } finally {
    clearTimeout(timer);
  }
}

export async function loadCatalog(options: LoadOptions = {}): Promise<LoadedCatalog> {
  const { apiUrl, fetchImpl = globalThis.fetch, timeoutMs = 6000 } = options;
  if (!apiUrl) return loadBundledCatalog();

  try {
    return { ...(await fetchCatalog(apiUrl, fetchImpl, timeoutMs)), source: 'api' };
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'unknown error';
    return {
      ...loadBundledCatalog(),
      warning: `Could not reach the recipe API (${reason}); showing bundled recipes.`,
    };
  }
}
