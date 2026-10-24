import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ButtonLink } from '@/components/button';
import { DetailSkeleton } from '@/components/skeletons';
import { ErrorState } from '@/components/states';
import { useAuth } from './auth-context';

export function ProtectedRoute() {
  const { status, error } = useAuth();
  const location = useLocation();

  if (status === 'initializing') return <DetailSkeleton />;
  if (status === 'unavailable') {
    return (
      <div className="container-x py-12">
        <ErrorState
          title="Sign-in is unavailable"
          description={error ?? 'Accounts are offline right now, but every recipe is still here.'}
          action={<ButtonLink to="/recipes">Browse recipes</ButtonLink>}
        />
      </div>
    );
  }
  if (status === 'signed-out') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}
