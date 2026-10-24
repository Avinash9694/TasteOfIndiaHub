import { assetUrl, hueFor } from '@/lib/assets';
import { initials } from '@/lib/format';

type Props = {
  src: string | null;
  alt: string;
  name: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

// Recipes without a photo get a warm gradient with the dish initial instead of a hotlink.
export function DishImage({
  src,
  alt,
  name,
  ratio = '4 / 3',
  className = '',
  sizes,
  priority = false,
}: Props) {
  const hue = hueFor(name);
  return (
    <div
      className={`bg-surface-2 relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <img
          src={assetUrl(src)}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          className="size-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="font-display flex size-full items-center justify-center text-white"
          style={{
            background: `linear-gradient(135deg, hsl(${hue} 60% 48%), hsl(${(hue + 40) % 360} 65% 36%))`,
          }}
        >
          <span className="text-5xl font-semibold drop-shadow-sm sm:text-6xl">
            {initials(name).charAt(0)}
          </span>
          <span
            aria-hidden
            className="absolute -right-6 -bottom-8 size-32 rounded-full bg-white/10 blur-sm"
          />
        </div>
      )}
    </div>
  );
}
