import { Link } from 'react-router-dom';
import { type Chef } from '@/data/types';
import { formatCount } from '@/lib/format';
import { Avatar } from './avatar';
import { ArrowRightIcon } from './icons';

export function ChefCard({ chef }: { chef: Chef }) {
  return (
    <article className="card card-hover relative flex h-full flex-col gap-4 p-5">
      <div className="flex items-center gap-4">
        <Avatar name={chef.name} src={chef.img} size={64} className="ring-line ring-2" />
        <div className="min-w-0">
          <h3 className="text-ink truncate text-lg font-semibold">
            <Link
              to={`/chefs/${chef.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {chef.name}
            </Link>
          </h3>
          <p className="text-ink-muted truncate text-sm">{chef.specialty}</p>
        </div>
      </div>
      <p className="text-ink-soft line-clamp-3 text-sm leading-relaxed">{chef.bio}</p>
      <dl className="border-line mt-auto grid grid-cols-3 gap-2 border-t pt-4 text-center">
        <Stat label="Recipes" value={formatCount(chef.recipesCount)} />
        <Stat label="Years" value={formatCount(chef.yearsOfExperience)} />
        <Stat label="Likes" value={formatCount(chef.likes)} />
      </dl>
      <span className="text-accent-strong inline-flex items-center gap-1 text-sm font-medium">
        View recipes <ArrowRightIcon size={16} />
      </span>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-ink-muted text-[11px] tracking-wide uppercase">{label}</dt>
      <dd className="text-ink font-mono text-sm font-medium">{value}</dd>
    </div>
  );
}
