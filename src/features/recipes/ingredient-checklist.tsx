import { useEffect, useState } from 'react';
import { Button } from '@/components/button';
import { CheckIcon } from '@/components/icons';
import { readJson, writeJson } from '@/lib/storage';

type Props = { recipeSlug: string; ingredients: string[] };

// Ticked ingredients persist per recipe so a page refresh mid-shop does not lose progress.
export function IngredientChecklist({ recipeSlug, ingredients }: Props) {
  const key = `toih:checklist:${recipeSlug}`;
  const [checked, setChecked] = useState<number[]>(() => readJson<number[]>(key, []));

  useEffect(() => {
    writeJson(key, checked);
  }, [key, checked]);

  const toggle = (i: number) =>
    setChecked((prev) => (prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]));

  const done = checked.length;

  return (
    <section aria-labelledby="ingredients-heading" className="card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 id="ingredients-heading" className="text-ink text-2xl font-semibold">
          Ingredients
        </h2>
        <p className="text-ink-muted font-mono text-xs" aria-live="polite">
          {done}/{ingredients.length}
        </p>
      </div>
      <div className="bg-surface-2 mt-3 h-1.5 overflow-hidden rounded-full" aria-hidden>
        <div
          className="bg-leaf h-full rounded-full transition-[width] duration-300"
          style={{ width: `${(done / ingredients.length) * 100}%` }}
        />
      </div>
      <ul className="mt-4 space-y-1">
        {ingredients.map((item, i) => {
          const isChecked = checked.includes(i);
          const id = `ing-${recipeSlug}-${i}`;
          return (
            <li key={id}>
              <label
                htmlFor={id}
                className="hover:bg-surface-2 flex min-h-11 cursor-pointer items-start gap-3 rounded-lg px-2 py-2"
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(i)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus ${
                    isChecked ? 'bg-leaf border-leaf text-white' : 'border-line-strong bg-surface'
                  }`}
                >
                  {isChecked && <CheckIcon size={13} />}
                </span>
                <span
                  className={`text-sm leading-relaxed sm:text-base ${isChecked ? 'text-ink-muted line-through' : 'text-ink'}`}
                >
                  {item}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {done > 0 && (
        <Button variant="ghost" size="sm" className="mt-3" onClick={() => setChecked([])}>
          Reset list
        </Button>
      )}
    </section>
  );
}
