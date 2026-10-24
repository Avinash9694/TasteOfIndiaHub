import { assetUrl, hueFor } from '@/lib/assets';
import { initials } from '@/lib/format';

type Props = {
  name: string;
  src?: string | null;
  size?: number;
  className?: string;
  priority?: boolean;
};

export function Avatar({ name, src, size = 40, className = '', priority = false }: Props) {
  const hue = hueFor(name);
  const style = { width: size, height: size, fontSize: Math.max(12, size * 0.38) };
  if (src) {
    return (
      <img
        src={assetUrl(src)}
        alt={name}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        style={style}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }
  return (
    <span
      role="img"
      aria-label={name}
      style={{
        ...style,
        background: `linear-gradient(135deg, hsl(${hue} 55% 50%), hsl(${(hue + 50) % 360} 60% 38%))`,
      }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${className}`}
    >
      {initials(name)}
    </span>
  );
}
