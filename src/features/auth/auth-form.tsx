import { type FormEvent, type ReactNode, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/button';
import { AlertIcon } from '@/components/icons';

export type AuthFormValues = { displayName: string; email: string; password: string };

type Props = {
  mode: 'login' | 'register';
  error: string | null;
  onSubmit: (values: AuthFormValues) => Promise<void>;
  onChange?: () => void;
  footer?: ReactNode;
};

export const inputClass =
  'h-11 w-full rounded-xl border border-line-strong bg-surface px-3.5 text-ink placeholder:text-ink-muted focus-visible:outline-focus';

export function AuthForm({ mode, error, onSubmit, onChange, footer }: Props) {
  const id = useId();
  const [values, setValues] = useState<AuthFormValues>({
    displayName: '',
    email: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  const set = (key: keyof AuthFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    onChange?.();
  };

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="space-y-4">
      {mode === 'register' && (
        <Field id={`${id}-name`} label="Your name">
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            required
            minLength={2}
            value={values.displayName}
            onChange={set('displayName')}
            className={inputClass}
            placeholder="Asha Rao"
          />
        </Field>
      )}
      <Field id={`${id}-email`} label="Email">
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={set('email')}
          className={inputClass}
          placeholder="you@example.com"
        />
      </Field>
      <Field
        id={`${id}-password`}
        label="Password"
        hint={mode === 'register' ? 'At least 6 characters.' : undefined}
      >
        <input
          id={`${id}-password`}
          type="password"
          autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
          required
          minLength={6}
          value={values.password}
          onChange={set('password')}
          className={inputClass}
          placeholder="••••••••"
        />
      </Field>

      {error && (
        <p
          role="alert"
          className="bg-chili-soft text-chili flex items-start gap-2 rounded-xl px-3.5 py-3 text-sm"
        >
          <AlertIcon size={18} className="mt-0.5 shrink-0" /> {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" loading={submitting}>
        {mode === 'register' ? 'Create account' : 'Sign in'}
      </Button>

      {footer}

      <p className="text-ink-soft text-center text-sm">
        {mode === 'register' ? (
          <>
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-accent-strong font-medium underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{' '}
            <Link
              to="/register"
              className="text-accent-strong font-medium underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

export function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-ink mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && <p className="text-ink-muted mt-1 text-xs">{hint}</p>}
    </div>
  );
}
