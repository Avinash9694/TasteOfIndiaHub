import { Link } from 'react-router-dom';
import { GitHubIcon, LinkedInIcon } from '../icons';
import { Logo } from './logo';
import { NAV_LINKS } from './nav-links';

export function Footer() {
  return (
    <footer className="border-line bg-surface mt-20 border-t">
      <div className="container-x grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="text-ink-soft mt-4 max-w-sm text-sm leading-relaxed">
            Recipes from chefs you know, written for home kitchens. Search by region, diet and
            difficulty, tick off ingredients as you cook, and save the ones worth repeating.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-ink-muted font-mono text-xs tracking-[0.18em] uppercase">Explore</h2>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-ink-soft hover:text-accent-strong text-sm">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-ink-muted font-mono text-xs tracking-[0.18em] uppercase">Account</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/login" className="text-ink-soft hover:text-accent-strong text-sm">
                Sign in
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-ink-soft hover:text-accent-strong text-sm">
                Create account
              </Link>
            </li>
            <li>
              <Link to="/saved" className="text-ink-soft hover:text-accent-strong text-sm">
                Saved recipes
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-line border-t">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-5 text-sm sm:flex-row sm:items-center">
          <p className="text-ink-soft">
            Built by{' '}
            <a
              href="https://avinash9694.github.io"
              className="text-ink hover:text-accent-strong font-medium underline-offset-4 hover:underline"
            >
              Avinash Sahu
            </a>
          </p>
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/Avinash9694"
              aria-label="Avinash Sahu on GitHub"
              className="text-ink-soft hover:bg-surface-2 hover:text-ink flex size-10 items-center justify-center rounded-lg"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/A-v-i-n-a-s-h/"
              aria-label="Avinash Sahu on LinkedIn"
              className="text-ink-soft hover:bg-surface-2 hover:text-ink flex size-10 items-center justify-center rounded-lg"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
