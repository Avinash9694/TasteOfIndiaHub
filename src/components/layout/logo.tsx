import { Link } from 'react-router-dom';

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-lg font-semibold"
      aria-label="Taste of India Hub — home"
    >
      <span
        aria-hidden
        className="bg-accent text-on-accent flex size-9 items-center justify-center rounded-xl shadow-[0_6px_16px_-8px_var(--c-accent)]"
      >
        <svg viewBox="0 0 64 64" width="22" height="22" fill="currentColor">
          <path d="M14 38c0-6 4-10 10-10h16c6 0 10 4 10 10v2H14z" />
          <path d="M12 42h40v4a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z" opacity=".7" />
          <path d="M26 24c0-4 3-5 3-9 0 0 3 2 3 6s-3 5-3 9c0 0-3-2-3-6zM36 22c0-3 2.5-4 2.5-7 0 0 2.5 1.5 2.5 4.5S38.5 23 38.5 26c0 0-2.5-1.5-2.5-4z" />
        </svg>
      </span>
      <span className="font-display text-ink text-base leading-none tracking-tight whitespace-nowrap sm:text-lg">
        Taste of <span className="text-accent-strong">India</span> Hub
      </span>
    </Link>
  );
}
