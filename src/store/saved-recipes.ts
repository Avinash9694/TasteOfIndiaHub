import { useCallback, useSyncExternalStore } from 'react';
import { readJson, writeJson } from '@/lib/storage';

// Saved recipes are a per-user demo store kept in localStorage; there is no backend.
const PREFIX = 'toih:saved:';
const listeners = new Set<() => void>();
const cache = new Map<string, readonly string[]>();

export const storageKeyFor = (userId: string) => `${PREFIX}${userId}`;

function sanitize(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
}

export function getSaved(userId: string): readonly string[] {
  const cached = cache.get(userId);
  if (cached) return cached;
  const loaded = sanitize(readJson<unknown>(storageKeyFor(userId), []));
  cache.set(userId, loaded);
  return loaded;
}

function setSaved(userId: string, slugs: string[]) {
  cache.set(userId, slugs);
  writeJson(storageKeyFor(userId), slugs);
  listeners.forEach((l) => l());
}

export function isSaved(userId: string, slug: string) {
  return getSaved(userId).includes(slug);
}

export function toggleSaved(userId: string, slug: string): boolean {
  const current = getSaved(userId);
  const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
  setSaved(userId, next);
  return next.includes(slug);
}

export function removeSaved(userId: string, slug: string) {
  setSaved(
    userId,
    getSaved(userId).filter((s) => s !== slug),
  );
}

export function clearSaved(userId: string) {
  setSaved(userId, []);
}

export function resetSavedCache() {
  cache.clear();
}

const EMPTY: readonly string[] = [];
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useSavedRecipes(userId: string | null) {
  const saved = useSyncExternalStore(
    subscribe,
    () => (userId ? getSaved(userId) : EMPTY),
    () => EMPTY,
  );
  const toggle = useCallback(
    (slug: string) => (userId ? toggleSaved(userId, slug) : false),
    [userId],
  );
  const remove = useCallback((slug: string) => userId && removeSaved(userId, slug), [userId]);
  return { saved, toggle, remove, has: (slug: string) => saved.includes(slug) };
}
