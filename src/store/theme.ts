import { useCallback, useSyncExternalStore } from 'react';
import { readString, writeString } from '@/lib/storage';

export type Theme = 'light' | 'dark';
const KEY = 'toih:theme';
const listeners = new Set<() => void>();

function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(stored: string | null): Theme {
  return stored === 'dark' || stored === 'light' ? stored : systemTheme();
}

function current(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'dark' || attr === 'light' ? attr : resolveTheme(readString(KEY));
}

function apply(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  writeString(KEY, theme);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, current, (): Theme => 'light');
  const toggle = useCallback(() => apply(current() === 'dark' ? 'light' : 'dark'), []);
  return { theme, toggle, setTheme: apply };
}
