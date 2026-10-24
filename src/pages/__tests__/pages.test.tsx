import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderPage, signedInAuth, signedOutAuth } from '@/test/render';

const authState = vi.hoisted((): { current: unknown } => ({ current: null }));
vi.mock('@/features/auth/auth-context', () => ({
  useAuth: () => authState.current,
}));
vi.mock('@/lib/firebase', () => ({ getFirebaseAuth: vi.fn() }));

import AboutPage from '../about-page';
import BlogPage from '../blog-page';
import BlogPostPage from '../blog-post-page';
import ChefDetailPage from '../chef-detail-page';
import ChefsPage from '../chefs-page';
import { HomePage } from '../home-page';
import LoginPage from '../login-page';
import NotFoundPage from '../not-found-page';
import ProfilePage from '../profile-page';
import RecipeDetailPage from '../recipe-detail-page';
import RecipesPage from '../recipes-page';
import RegisterPage from '../register-page';
import SavedPage from '../saved-page';

describe('page smoke tests', () => {
  it('home renders hero, featured recipes and chefs', () => {
    authState.current = signedOutAuth;
    renderPage(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Cook the India/);
    expect(screen.getByRole('heading', { name: /Highest-rated/ })).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBeGreaterThanOrEqual(12);
  });

  it('recipes page filters from the URL and updates the result count', async () => {
    authState.current = signedOutAuth;
    renderPage(<RecipesPage />, { route: '/recipes?diet=veg&difficulty=hard' });
    expect(screen.getByRole('status')).toHaveTextContent('1 recipe');
    expect(screen.getByRole('heading', { name: 'Dal Makhani' })).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText('Search recipes'), 'zzz');
    expect(screen.getByText(/Nothing matches/)).toBeInTheDocument();
  });

  it('recipes page shows skeletons while the catalog loads', () => {
    authState.current = signedOutAuth;
    renderPage(<RecipesPage />, { catalog: null });
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('recipe detail renders ingredients, method and a chef link; checklist ticks persist', async () => {
    authState.current = signedOutAuth;
    renderPage(<RecipeDetailPage />, { route: '/recipes/biryani', path: '/recipes/:slug' });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Biryani/);
    expect(screen.getByRole('link', { name: /Recipe by Ranveer Brar/ })).toBeInTheDocument();
    const first = screen.getAllByRole('checkbox')[0];
    expect(first).toBeDefined();
    await userEvent.click(first as HTMLElement);
    expect(first).toBeChecked();
    expect(window.localStorage.getItem('toih:checklist:biryani')).toBe('[0]');
    expect(screen.getByRole('link', { name: /Sign in to save/ })).toBeInTheDocument();
  });

  it('recipe detail falls through to 404 for an unknown slug', () => {
    authState.current = signedOutAuth;
    renderPage(<RecipeDetailPage />, { route: '/recipes/nope', path: '/recipes/:slug' });
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('chefs and chef detail render', () => {
    authState.current = signedOutAuth;
    const { unmount } = renderPage(<ChefsPage />);
    expect(screen.getAllByRole('article')).toHaveLength(6);
    unmount();
    renderPage(<ChefDetailPage />, { route: '/chefs/sanjeev-kapoor', path: '/chefs/:slug' });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sanjeev Kapoor');
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('blog list and post render', () => {
    authState.current = signedOutAuth;
    const { unmount } = renderPage(<BlogPage />);
    expect(screen.getAllByRole('article')).toHaveLength(5);
    unmount();
    renderPage(<BlogPostPage />, { route: '/blog/the-art-of-baking', path: '/blog/:slug' });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The Art of Baking');
  });

  it('about, 404, login and register render', () => {
    authState.current = signedOutAuth;
    for (const Page of [AboutPage, NotFoundPage, LoginPage, RegisterPage]) {
      const { unmount } = renderPage(<Page />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      unmount();
    }
  });

  it('login shows auth errors and auth-unavailable state', () => {
    authState.current = { ...signedOutAuth, error: 'No account matches that email and password.' };
    const { unmount } = renderPage(<LoginPage />);
    expect(screen.getByRole('alert')).toHaveTextContent(/No account matches/);
    unmount();
    authState.current = {
      ...signedOutAuth,
      status: 'unavailable',
      error: 'Sign-in could not be loaded.',
    };
    renderPage(<LoginPage />);
    expect(screen.getByRole('heading', { name: /Sign-in is unavailable/ })).toBeInTheDocument();
  });

  it('profile and saved render for a signed-in user, with save toggles on cards', async () => {
    authState.current = signedInAuth;
    const { unmount } = renderPage(<ProfilePage />);
    expect(screen.getByRole('heading', { name: 'Asha Rao' })).toBeInTheDocument();
    unmount();

    const { unmount: unmountSaved } = renderPage(<SavedPage />);
    expect(screen.getByText(/No saved recipes yet/)).toBeInTheDocument();
    unmountSaved();
    const { unmount: unmountHome } = renderPage(<HomePage />);
    await userEvent.click(screen.getAllByRole('button', { name: /^Save / })[0] as HTMLElement);
    unmountHome();
    renderPage(<SavedPage />);
    expect(screen.getAllByRole('article')).toHaveLength(1);
  });
});
