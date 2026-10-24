import { Link } from 'react-router-dom';
import { Badge } from '@/components/badge';
import { SectionHeading } from '@/components/section-heading';
import { BLOG_POSTS, formatDate } from '@/data/blog-posts';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { assetUrl } from '@/lib/assets';

export default function BlogPage() {
  useDocumentTitle(
    'Blog',
    'Technique, regional cooking and kitchen stories from Taste of India Hub.',
  );
  const [featured, ...rest] = BLOG_POSTS;
  if (!featured) return null;

  return (
    <div className="container-x py-10 lg:py-14">
      <SectionHeading
        eyebrow="Blog"
        title="Notes from the kitchen"
        description="Technique, regional cooking and the occasional opinion. Short reads you can finish while the dal simmers."
      />
      <article className="card card-hover relative grid overflow-hidden lg:grid-cols-2">
        <div className="bg-surface-2" style={{ aspectRatio: '16 / 10' }}>
          <img
            src={assetUrl(featured.cover)}
            alt=""
            loading="eager"
            decoding="sync"
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
          <div className="flex items-center gap-3">
            <Badge tone="accent">{featured.tag}</Badge>
            <PostMeta post={featured} />
          </div>
          <h2 className="text-ink text-3xl font-semibold tracking-tight">
            <Link
              to={`/blog/${featured.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {featured.title}
            </Link>
          </h2>
          <p className="text-ink-soft leading-relaxed">{featured.excerpt}</p>
        </div>
      </article>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {rest.map((post) => (
          <article key={post.slug} className="card card-hover relative overflow-hidden">
            <div className="bg-surface-2" style={{ aspectRatio: '16 / 9' }}>
              <img
                src={assetUrl(post.cover)}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-3">
                <Badge tone="accent">{post.tag}</Badge>
                <PostMeta post={post} />
              </div>
              <h2 className="text-ink text-xl font-semibold">
                <Link
                  to={`/blog/${post.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-ink-soft line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PostMeta({ post }: { post: { publishedOn: string; readMinutes: number } }) {
  return (
    <p className="text-ink-muted font-mono text-xs">
      <time dateTime={post.publishedOn}>{formatDate(post.publishedOn)}</time> · {post.readMinutes}{' '}
      min read
    </p>
  );
}
