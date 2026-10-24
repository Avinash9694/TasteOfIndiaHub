import { StarIcon } from './icons';

export function Rating({ value, className = '' }: { value: number; className?: string }) {
  return (
    <span
      className={`text-ink-soft inline-flex items-center gap-1 text-sm font-medium ${className}`}
      aria-label={`Rated ${value.toFixed(1)} out of 5`}
    >
      <StarIcon className="text-gold" />
      <span className="font-mono text-xs">{value.toFixed(1)}</span>
    </span>
  );
}
