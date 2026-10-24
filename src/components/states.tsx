import { type ReactNode } from 'react';
import { AlertIcon } from './icons';

type Props = { title: string; description?: string; action?: ReactNode; icon?: ReactNode };

export function EmptyState({ title, description, action, icon }: Props) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <div className="bg-accent-soft text-accent-strong mb-4 flex size-14 items-center justify-center rounded-full text-2xl">
        {icon ?? <span aria-hidden>🍽</span>}
      </div>
      <h2 className="text-ink text-xl font-semibold">{title}</h2>
      {description && <p className="text-ink-soft mt-2 max-w-md text-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({ title, description, action }: Props) {
  return (
    <div
      role="alert"
      className="card border-chili/30 flex flex-col items-center px-6 py-14 text-center"
    >
      <div className="bg-chili-soft text-chili mb-4 flex size-14 items-center justify-center rounded-full">
        <AlertIcon size={26} />
      </div>
      <h2 className="text-ink text-xl font-semibold">{title}</h2>
      {description && <p className="text-ink-soft mt-2 max-w-md text-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
