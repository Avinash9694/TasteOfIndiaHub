import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import { DetailSkeleton } from '../skeletons';
import { Toaster } from '../toaster';
import { Footer } from './footer';
import { Header } from './header';

export function Layout() {
  useScrollToTop();
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="sr-only-focusable">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1" tabIndex={-1}>
        <Suspense fallback={<DetailSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
