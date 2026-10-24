import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/auth-context';
import { AuthForm } from '@/features/auth/auth-form';
import { AuthShell } from '@/features/auth/auth-shell';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { toast } from '@/store/toast';

export default function RegisterPage() {
  useDocumentTitle('Create account');
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => () => auth.clearError(), [auth]);

  if (auth.status === 'signed-in') return <Navigate to="/profile" replace />;

  return (
    <AuthShell
      title="Create your account"
      subtitle="Free, takes thirty seconds, and lets you save recipes across visits."
    >
      <AuthForm
        mode="register"
        error={auth.error}
        onChange={() => {
          auth.clearError();
        }}
        onSubmit={async (values) => {
          if (await auth.register(values)) {
            toast.success(`Welcome, ${values.displayName.trim()}!`);
            navigate('/profile', { replace: true });
          }
        }}
      />
    </AuthShell>
  );
}
