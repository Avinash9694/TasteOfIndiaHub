import { type ReactNode } from 'react';
import { ButtonLink } from '@/components/button';
import { ErrorState } from '@/components/states';
import { assetUrl } from '@/lib/assets';
import { useAuth } from './auth-context';

type Props = { title: string; subtitle: string; children: ReactNode };

export function AuthShell({ title, subtitle, children }: Props) {
  const { status, error } = useAuth();

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

  return (
    <div className="container-x py-10 lg:py-14">
      <div className="card mx-auto grid max-w-4xl overflow-hidden lg:grid-cols-[1fr_1.1fr]">
        <div className="bg-surface-2 relative hidden lg:block">
          <img
            src={assetUrl('img/gallery/img-2.webp')}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <p className="font-display absolute bottom-8 left-8 max-w-xs text-2xl leading-snug text-white">
            Save the recipes you actually cook again.
          </p>
        </div>
        <div className="p-6 sm:p-10">
          <h1 className="text-ink text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-ink-soft mt-2 text-sm">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
