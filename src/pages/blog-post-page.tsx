import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/badge';
import { ArrowLeftIcon } from '@/components/icons';
import { BLOG_POSTS, findPost, formatDate } from '@/data/blog-posts';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { assetUrl } from '@/lib/assets';
import NotFoundPage from './not-found-page';

export default function BlogPostPage() {
  const { slug = '' } = useParams();
  const post = findPost(slug);
  useDocumentTitle(post?.title, post?.excerpt);

  if (!post) return <NotFoundPage />;

  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="container-x py-10 lg:py-14">
      <Link
        to="/blog"
        className="text-ink-soft hover:text-accent-strong inline-flex items-center gap-1.5 text-sm"
      >
        <ArrowLeftIcon size={16} /> All posts
      </Link>
      <header className="mx-auto mt-6 max-w-3xl text-center">
        <div className="flex items-center justify-center gap-3">
          <Badge tone="accent">{post.tag}</Badge>
          <p className="text-ink-muted font-mono text-xs">
            <time dateTime={post.publishedOn}>{formatDate(post.publishedOn)}</time> ·{' '}
            {post.readMinutes} min read
          </p>
        </div>
        <h1 className="text-ink mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="text-ink-soft mt-4 text-lg leading-relaxed">{post.excerpt}</p>
      </header>
      <div
        className="bg-surface-2 mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl shadow-card"
        style={{ aspectRatio: '16 / 8' }}
      >
        <img
          src={assetUrl(post.cover)}
          alt=""
          loading="eager"
          decoding="sync"
          className="size-full object-cover"
        />
      </div>
      <div className="text-ink-soft mx-auto mt-10 max-w-2xl space-y-6 text-lg leading-relaxed">
        {post.body.map((paragraph, i) => (
          <p
            key={i}
            className={
              i === 0
                ? 'text-ink first-letter:font-display first-letter:text-accent-strong first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:leading-[0.8]'
                : ''
            }
          >
            {paragraph}
          </p>
        ))}
      </div>

      <aside className="border-line mx-auto mt-16 max-w-3xl border-t pt-10" aria-label="More posts">
        <h2 className="text-ink-muted font-mono text-xs tracking-[0.18em] uppercase">
          Keep reading
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((p) => (
            <li key={p.slug} className="card card-hover p-5">
              <Badge tone="accent">{p.tag}</Badge>
              <h3 className="text-ink mt-3 text-lg font-semibold">
                <Link to={`/blog/${p.slug}`} className="hover:text-accent-strong">
                  {p.title}
                </Link>
              </h3>
              <p className="text-ink-soft mt-2 line-clamp-2 text-sm">{p.excerpt}</p>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
