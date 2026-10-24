import { type ReactNode } from 'react';
import { type Diet, type Difficulty } from '@/data/types';
import { FlameIcon, LeafIcon } from './icons';

type Tone = 'neutral' | 'accent' | 'leaf' | 'chili' | 'gold';

const TONES: Record<Tone, string> = {
  neutral: 'bg-surface-2 text-ink-soft',
  accent: 'bg-accent-soft text-accent-strong',
  leaf: 'bg-leaf-soft text-leaf',
  chili: 'bg-chili-soft text-chili',
  gold: 'bg-accent-soft text-terracotta',
};

export function Badge({
  tone = 'neutral',
  children,
  className = '',
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function DietBadge({ diet, compact = false }: { diet: Diet; compact?: boolean }) {
  const veg = diet === 'veg';
  return (
    <Badge tone={veg ? 'leaf' : 'chili'}>
      <span
        aria-hidden
        className={`inline-block size-2 rounded-full ${veg ? 'bg-leaf' : 'bg-chili'}`}
      />
      {compact ? (veg ? 'Veg' : 'Non-veg') : veg ? 'Vegetarian' : 'Non-vegetarian'}
    </Badge>
  );
}

const DIFFICULTY_TONE: Record<Difficulty, Tone> = { easy: 'leaf', medium: 'gold', hard: 'chili' };

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <Badge tone={DIFFICULTY_TONE[difficulty]}>
      {difficulty === 'easy' ? <LeafIcon /> : <FlameIcon />}
      <span className="capitalize">{difficulty}</span>
    </Badge>
  );
}
