import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/auth-context';
import { useTheme } from '@/store/theme';
import { toast } from '@/store/toast';
import { Avatar } from '../avatar';
import { ButtonLink, buttonClass } from '../button';
import {
  BookmarkIcon,
  CloseIcon,
  MenuIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  UserIcon,
} from '../icons';
import { Logo } from './logo';
import { NAV_LINKS } from './nav-links';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-accent-soft text-accent-strong'
      : 'text-ink-soft hover:bg-surface-2 hover:text-ink'
  }`;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const user = auth.status === 'signed-in' ? auth.user : null;
  const authAvailable = auth.status !== 'unavailable';

  const handleSignOut = async () => {
    await auth.signOut();
    toast.info('Signed out.');
    navigate('/');
  };

  return (
    <header
      className={`bg-bg/85 sticky top-0 z-50 backdrop-blur-md transition-shadow ${
        scrolled ? 'border-line border-b shadow-[0_8px_24px_-20px_rgb(0_0_0/0.4)]' : ''
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={'end' in l} className={navClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <NavLink
            to="/recipes?focus=search"
            aria-label="Search recipes"
            className={buttonClass('ghost', 'sm', 'size-10 px-0')}
          >
            <SearchIcon />
          </NavLink>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className={buttonClass('ghost', 'sm', 'size-10 px-0')}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {user ? (
            <NavLink
              to="/profile"
              className="hover:bg-surface-2 ml-1 hidden items-center gap-2 rounded-full p-1 pr-3 md:flex"
              aria-label="Your profile"
            >
              <Avatar name={user.displayName ?? user.email ?? 'You'} size={32} />
              <span className="text-ink max-w-28 truncate text-sm font-medium">
                {user.displayName ?? 'Profile'}
              </span>
            </NavLink>
          ) : authAvailable ? (
            <div className="ml-1 hidden md:block">
              <ButtonLink to="/login" size="sm">
                Sign in
              </ButtonLink>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={buttonClass('ghost', 'sm', 'size-10 px-0 md:hidden')}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" role="presentation">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="bg-surface animate-fade-up absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-card-hover"
          >
            <div className="bg-line-strong mx-auto mb-3 h-1.5 w-12 rounded-full" aria-hidden />
            <div className="mb-2 flex items-center justify-between">
              <Logo onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className={buttonClass('ghost', 'sm', 'size-10 px-0')}
              >
                <CloseIcon />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={'end' in l}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-medium ${
                      isActive ? 'bg-accent-soft text-accent-strong' : 'text-ink hover:bg-surface-2'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <div className="border-line mt-3 border-t pt-3">
              {user ? (
                <div className="flex flex-col gap-1">
                  <NavLink
                    to="/profile"
                    className="text-ink hover:bg-surface-2 flex items-center gap-3 rounded-xl px-4 py-3"
                  >
                    <UserIcon /> Profile
                  </NavLink>
                  <NavLink
                    to="/saved"
                    className="text-ink hover:bg-surface-2 flex items-center gap-3 rounded-xl px-4 py-3"
                  >
                    <BookmarkIcon /> Saved recipes
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-ink-soft hover:bg-surface-2 rounded-xl px-4 py-3 text-left"
                  >
                    Sign out
                  </button>
                </div>
              ) : authAvailable ? (
                <div className="grid grid-cols-2 gap-2">
                  <ButtonLink to="/login" variant="secondary" size="lg">
                    Sign in
                  </ButtonLink>
                  <ButtonLink to="/register" size="lg">
                    Create account
                  </ButtonLink>
                </div>
              ) : (
                <p className="text-ink-muted px-4 text-sm">Sign-in is unavailable right now.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
