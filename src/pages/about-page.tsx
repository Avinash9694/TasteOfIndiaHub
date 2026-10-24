import { ButtonLink } from '@/components/button';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { assetUrl } from '@/lib/assets';

const PRINCIPLES = [
  {
    title: 'Quantities, not vibes',
    body: 'Every recipe lists exact amounts and timings. "Spices to taste" is how good dishes go wrong on a Tuesday night.',
  },
  {
    title: 'Regional, not generic',
    body: 'A Goan fish curry is not a Bengali one. Each recipe is tagged by region so you learn the grammar, not just the dish.',
  },
  {
    title: 'Works offline, works fast',
    body: 'The recipe catalog ships with the site, so pages load instantly and keep working if the API is down.',
  },
  {
    title: 'Yours to keep',
    body: 'Sign in to save recipes. Your list is stored on your device and tied to your account, with no tracking.',
  },
];

export default function AboutPage() {
  useDocumentTitle('About', 'What Taste of India Hub is, how it was built and why.');
  return (
    <div className="container-x py-10 lg:py-14">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-accent-strong mb-3 font-mono text-xs tracking-[0.18em] uppercase">
            About
          </p>
          <h1 className="text-ink text-4xl font-semibold tracking-tight sm:text-5xl">
            A recipe site that respects your Tuesday night.
          </h1>
          <p className="text-ink-soft mt-6 text-lg leading-relaxed">
            Taste of India Hub started in 2023 as a React learning project: a place to collect
            recipes from the chefs we grew up watching and make them cookable in an ordinary home
            kitchen. This is the second version, rebuilt from scratch with the same content and a
            much higher bar for speed, accessibility and polish.
          </p>
          <p className="text-ink-soft mt-4 leading-relaxed">
            Six chefs, eighteen recipes, four regions, two diets and a blog. Nothing is behind a
            paywall and nothing hotlinks someone else&apos;s photos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/recipes" size="lg">
              Start cooking
            </ButtonLink>
            <ButtonLink to="/blog" variant="secondary" size="lg">
              Read the blog
            </ButtonLink>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            'img/gallery/img-2.webp',
            'img/gallery/img-5.webp',
            'img/gallery/img-6.webp',
            'img/gallery/img-7.webp',
          ].map((src, i) => (
            <div
              key={src}
              className={`bg-surface-2 overflow-hidden rounded-2xl shadow-card ${i % 3 === 0 ? 'mt-6' : ''}`}
              style={{ aspectRatio: '1 / 1' }}
            >
              <img
                src={assetUrl(src)}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="principles">
        <h2 id="principles" className="text-ink text-3xl font-semibold tracking-tight">
          What we care about
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className="card p-6">
              <p className="text-accent-strong font-mono text-xs">0{i + 1}</p>
              <h3 className="text-ink mt-2 text-xl font-semibold">{p.title}</h3>
              <p className="text-ink-soft mt-2 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card mt-20 grid gap-6 p-8 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <h2 className="text-ink text-2xl font-semibold">Built in the open</h2>
          <p className="text-ink-soft mt-2 leading-relaxed">
            React 18, TypeScript, Vite and Tailwind, with Zod-validated data, Firebase auth and a
            test suite. The source is on GitHub if you want to see how a page is put together.
          </p>
        </div>
        <a
          href="https://github.com/Avinash9694/TasteOfIndiaHub"
          className="bg-ink text-bg hover:bg-ink-soft inline-flex h-12 items-center justify-center rounded-xl px-6 font-medium"
        >
          View source
        </a>
      </section>
    </div>
  );
}
