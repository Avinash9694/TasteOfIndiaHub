import { lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/error-boundary';
import { Layout } from './components/layout/layout';
import { CatalogProvider } from './data/catalog-context';
import { AuthProvider } from './features/auth/auth-context';
import { ProtectedRoute } from './features/auth/protected-route';
import { HomePage } from './pages/home-page';

const RecipesPage = lazy(() => import('./pages/recipes-page'));
const RecipeDetailPage = lazy(() => import('./pages/recipe-detail-page'));
const ChefsPage = lazy(() => import('./pages/chefs-page'));
const ChefDetailPage = lazy(() => import('./pages/chef-detail-page'));
const BlogPage = lazy(() => import('./pages/blog-page'));
const BlogPostPage = lazy(() => import('./pages/blog-post-page'));
const AboutPage = lazy(() => import('./pages/about-page'));
const LoginPage = lazy(() => import('./pages/login-page'));
const RegisterPage = lazy(() => import('./pages/register-page'));
const ProfilePage = lazy(() => import('./pages/profile-page'));
const SavedPage = lazy(() => import('./pages/saved-page'));
const NotFoundPage = lazy(() => import('./pages/not-found-page'));

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/:slug" element={<RecipeDetailPage />} />
        <Route path="chefs" element={<ChefsPage />} />
        <Route path="chefs/:slug" element={<ChefDetailPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="saved" element={<SavedPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CatalogProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </CatalogProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
