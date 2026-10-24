import { type SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: Props) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
});

export const SearchIcon = ({ size = 20, ...p }: Props) => (
  <svg {...base(size, p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const MenuIcon = ({ size = 22, ...p }: Props) => (
  <svg {...base(size, p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = ({ size = 22, ...p }: Props) => (
  <svg {...base(size, p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const SunIcon = ({ size = 20, ...p }: Props) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
  </svg>
);

export const MoonIcon = ({ size = 20, ...p }: Props) => (
  <svg {...base(size, p)}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export const ClockIcon = ({ size = 16, ...p }: Props) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const UsersIcon = ({ size = 16, ...p }: Props) => (
  <svg {...base(size, p)}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-5-6.3" />
  </svg>
);

export const StarIcon = ({ size = 16, ...p }: Props) => (
  <svg {...base(size, p)} fill="currentColor" stroke="none">
    <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
  </svg>
);

export const HeartIcon = ({ size = 20, filled = false, ...p }: Props & { filled?: boolean }) => (
  <svg {...base(size, p)} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20.5s-7.5-4.6-9.3-9.4C1.5 7.8 3.6 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.4 0 5.5 3.3 4.3 6.6-1.8 4.8-9.3 9.4-9.3 9.4z" />
  </svg>
);

export const ShareIcon = ({ size = 18, ...p }: Props) => (
  <svg {...base(size, p)}>
    <circle cx="18" cy="5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="19" r="2.5" />
    <path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6" />
  </svg>
);

export const CheckIcon = ({ size = 16, ...p }: Props) => (
  <svg {...base(size, p)} strokeWidth={2.4}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </svg>
);

export const ArrowRightIcon = ({ size = 18, ...p }: Props) => (
  <svg {...base(size, p)}>
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

export const ArrowLeftIcon = ({ size = 18, ...p }: Props) => (
  <svg {...base(size, p)}>
    <path d="M19 12H5m6 6-6-6 6-6" />
  </svg>
);

export const LeafIcon = ({ size = 14, ...p }: Props) => (
  <svg {...base(size, p)}>
    <path d="M5 19c0-8 5-13 14-14 0 9-5 14-14 14z" />
    <path d="M5 19c3-4 6-7 10-9" />
  </svg>
);

export const FlameIcon = ({ size = 14, ...p }: Props) => (
  <svg {...base(size, p)}>
    <path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.3 2.6-5.2 3.6-8 1.3 1.1 2 2.4 2.4 3.9 1-1.1 1.4-2.8 1.3-4.7 3.4 2.1 5.7 5.2 5.7 8.8 0 3.6-2.6 6.2-6.5 6.2z" />
  </svg>
);

export const GitHubIcon = ({ size = 20, ...p }: Props) => (
  <svg {...base(size, p)} fill="currentColor" stroke="none">
    <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
  </svg>
);

export const LinkedInIcon = ({ size = 20, ...p }: Props) => (
  <svg {...base(size, p)} fill="currentColor" stroke="none">
    <path d="M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2zM8 19H5V9.5h3zM6.5 8.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4zM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3V9.5h2.9v1.3a3.2 3.2 0 0 1 2.9-1.6c3 0 3.6 2 3.6 4.6z" />
  </svg>
);

export const QuoteIcon = ({ size = 28, ...p }: Props) => (
  <svg {...base(size, p)} fill="currentColor" stroke="none">
    <path d="M7.2 6C4.3 6 2.5 8.3 2.5 11.4c0 3.6 2.4 6.1 6 6.6l.4-1.6c-1.8-.6-2.8-1.7-3-3.3h1.5c1.8 0 3.1-1.3 3.1-3.3S9.2 6 7.2 6zm10 0c-2.9 0-4.7 2.3-4.7 5.4 0 3.6 2.4 6.1 6 6.6l.4-1.6c-1.8-.6-2.8-1.7-3-3.3h1.5c1.8 0 3.1-1.3 3.1-3.3S19.2 6 17.2 6z" />
  </svg>
);

export const UserIcon = ({ size = 20, ...p }: Props) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

export const BookmarkIcon = ({ size = 20, ...p }: Props) => (
  <svg {...base(size, p)}>
    <path d="M6 3h12v18l-6-4-6 4z" />
  </svg>
);

export const AlertIcon = ({ size = 20, ...p }: Props) => (
  <svg {...base(size, p)}>
    <path d="M12 3 2.5 20h19z" />
    <path d="M12 9.5v4.5m0 2.5v.5" />
  </svg>
);
