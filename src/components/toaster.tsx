import { dismissToast, useToasts, type ToastKind } from '@/store/toast';
import { CloseIcon } from './icons';

const STYLES: Record<ToastKind, string> = {
  success: 'border-leaf/40 [--dot:var(--c-leaf)]',
  error: 'border-chili/40 [--dot:var(--c-chili)]',
  info: 'border-accent/40 [--dot:var(--c-accent)]',
};

export function Toaster() {
  const toasts = useToasts();
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-[90] flex flex-col items-center gap-2 px-4 sm:items-end sm:px-6"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role={t.kind === 'error' ? 'alert' : 'status'}
          className={`animate-toast-in bg-surface text-ink pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-card-hover ${STYLES[t.kind]}`}
        >
          <span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full bg-[var(--dot)]" />
          <p className="flex-1 text-sm leading-snug">{t.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss notification"
            className="text-ink-muted hover:text-ink -m-1 flex size-8 shrink-0 items-center justify-center rounded-lg"
          >
            <CloseIcon size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
