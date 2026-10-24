import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/button';
import { useAuth } from '@/features/auth/auth-context';
import { AuthForm } from '@/features/auth/auth-form';
import { AuthShell } from '@/features/auth/auth-shell';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { toast } from '@/store/toast';

export default function LoginPage() {
  useDocumentTitle('Sign in');
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/profile';
  const [resetEmail, setResetEmail] = useState('');

  useEffect(() => () => auth.clearError(), [auth]);

  if (auth.status === 'signed-in') return <Navigate to={from} replace />;

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to see your saved recipes and profile.">
      <AuthForm
        mode="login"
        error={auth.error}
        onChange={() => {
          auth.clearError();
        }}
        onSubmit={async ({ email, password }) => {
          setResetEmail(email);
          if (await auth.signIn({ email, password })) {
            toast.success('Signed in.');
            navigate(from, { replace: true });
          }
        }}
        footer={
          <div className="text-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={async () => {
                if (!resetEmail) {
                  toast.info('Enter your email above first, then tap reset.');
                  return;
                }
                if (await auth.sendPasswordReset(resetEmail)) {
                  toast.success(`Password reset link sent to ${resetEmail}.`);
                }
              }}
            >
              Forgot your password?
            </Button>
          </div>
        }
      />
    </AuthShell>
  );
}
