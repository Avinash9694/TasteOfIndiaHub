import { type ReactNode } from 'react';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, action, id }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-accent-strong mb-2 font-mono text-xs tracking-[0.18em] uppercase">
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="text-ink text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="text-ink-soft mt-3 text-base leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
