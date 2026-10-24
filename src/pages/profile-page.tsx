import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '@/components/avatar';
import { Button, ButtonLink } from '@/components/button';
import { BookmarkIcon } from '@/components/icons';
import { SectionHeading } from '@/components/section-heading';
import { useAuth } from '@/features/auth/auth-context';
import { Field, inputClass } from '@/features/auth/auth-form';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { useSavedRecipes } from '@/store/saved-recipes';
import { toast } from '@/store/toast';

export default function ProfilePage() {
  useDocumentTitle('Your profile');
  const auth = useAuth();
  const navigate = useNavigate();
  const user = auth.user;
  const { saved } = useSavedRecipes(user?.uid ?? null);
  const [name, setName] = useState(user?.displayName ?? '');
  const [saving, setSaving] = useState(false);

  if (!user) return null;
  const displayName = user.displayName ?? user.email ?? 'You';

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      toast.error('Please enter at least two characters.');
      return;
    }
    setSaving(true);
    const ok = await auth.updateDisplayName(trimmed);
    setSaving(false);
    if (ok) toast.success('Name updated.');
  };

  return (
    <div className="container-x py-10 lg:py-14">
      <SectionHeading eyebrow="Account" title="Your profile" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <section className="card flex flex-col items-center p-8 text-center" aria-labelledby="who">
          <Avatar name={displayName} size={96} className="ring-accent-soft ring-4" />
          <h2 id="who" className="text-ink mt-4 text-2xl font-semibold">
            {displayName}
          </h2>
          <p className="text-ink-muted mt-1 font-mono text-xs break-all">{user.email}</p>
          <p className="text-ink-muted mt-4 text-xs">
            Member id <span className="font-mono">{user.uid.slice(0, 8)}</span>
          </p>
          <Button
            variant="secondary"
            className="mt-6"
            onClick={async () => {
              await auth.signOut();
              toast.info('Signed out.');
              navigate('/');
            }}
          >
            Sign out
          </Button>
        </section>

        <div className="space-y-6">
          <section className="card p-6 sm:p-8" aria-labelledby="saved-heading">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="saved-heading" className="text-ink text-xl font-semibold">
                  Saved recipes
                </h2>
                <p className="text-ink-soft mt-1 text-sm">
                  {saved.length === 0
                    ? 'Nothing saved yet. Tap the heart on any recipe to add it here.'
                    : `${saved.length} ${saved.length === 1 ? 'recipe' : 'recipes'} saved on this device.`}
                </p>
              </div>
              <span className="bg-accent-soft text-accent-strong flex size-11 shrink-0 items-center justify-center rounded-xl">
                <BookmarkIcon />
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink to="/saved" variant={saved.length ? 'primary' : 'secondary'}>
                View saved recipes
              </ButtonLink>
              <Link
                to="/recipes"
                className="text-accent-strong self-center text-sm font-medium underline-offset-4 hover:underline"
              >
                Browse recipes
              </Link>
            </div>
          </section>

          <section className="card p-6 sm:p-8" aria-labelledby="edit-heading">
            <h2 id="edit-heading" className="text-ink text-xl font-semibold">
              Display name
            </h2>
            <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <Field id="display-name" label="Name shown in the header">
                  <input
                    id="display-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    autoComplete="name"
                    minLength={2}
                    required
                  />
                </Field>
              </div>
              <Button type="submit" loading={saving}>
                Save
              </Button>
            </form>
            {auth.error && (
              <p role="alert" className="text-chili mt-3 text-sm">
                {auth.error}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
