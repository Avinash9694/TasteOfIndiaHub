import { render } from '@testing-library/react';
import { type ReactElement, type ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { CatalogProvider } from '@/data/catalog-context';
import { loadBundledCatalog, type LoadedCatalog } from '@/data/load';
import type { AuthContextValue } from '@/features/auth/auth-context';

export const signedOutAuth: AuthContextValue = {
  status: 'signed-out',
  user: null,
  error: null,
  signIn: vi.fn().mockResolvedValue(true),
  register: vi.fn().mockResolvedValue(true),
  signOut: vi.fn().mockResolvedValue(undefined),
  updateDisplayName: vi.fn().mockResolvedValue(true),
  sendPasswordReset: vi.fn().mockResolvedValue(true),
  clearError: vi.fn(),
};

export const signedInAuth: AuthContextValue = {
  ...signedOutAuth,
  status: 'signed-in',
  user: { uid: 'test-user', email: 'asha@example.com', displayName: 'Asha Rao' },
};

type Options = { route?: string; path?: string; catalog?: LoadedCatalog | null };

export function renderPage(ui: ReactElement, { route = '/', path = '*', catalog }: Options = {}) {
  const initial = catalog === undefined ? loadBundledCatalog() : catalog;
  const wrapper = ({ children }: { children: ReactNode }) => (
    <CatalogProvider {...(initial ? { initial } : {})}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={path} element={children} />
        </Routes>
      </MemoryRouter>
    </CatalogProvider>
  );
  return render(ui, { wrapper });
}
