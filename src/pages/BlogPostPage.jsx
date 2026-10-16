import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Spark from '../components/Spark'
import CtaBanner from '../components/CtaBanner'
import Seo from '../components/Seo'
import { getPostBySlug } from '../data/posts'
import { parseBody, formatInline } from '../data/markdown'
import { ORGANIZATION, SITE_URL } from '../data/seo'

/** Rend un paragraphe en tenant compte du gras, de l'italique et des liens. */
function Inline({ text }) {
  return formatInline(text).map((part, i) => {
    if (part.type === 'bold') return <strong key={i}>{part.value}</strong>
    if (part.type === 'italic') return <em key={i}>{part.value}</em>
    if (part.type === 'link') {
      const external = /^https?:\/\//.test(part.href)
      return (
        <a
          key={i}
          href={part.href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="font-medium text-wine-600 underline underline-offset-4"
        >
          {part.value}
        </a>
      )
    }
    return <span key={i}>{part.value}</span>
  })
}

const formatDate = (iso) => {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(undefined)

  useEffect(() => {
    let active = true
    setPost(undefined)
    getPostBySlug(slug).then((data) => {
      if (active) setPost(data)
    })
    return () => {
      active = false
    }
  }, [slug])

  if (post === undefined) {
    return (
      <section className="py-24">
        <div className="container-x">
          <p className="text-center text-muted">Chargement de l&apos;article…</p>
        </div>
      </section>
    )
  }

  if (post === null) {
    return (
      <>
        <Seo
          title={`Article introuvable | Association Étincelle`}
          description="Cet article n'existe pas ou a été déplacé."
          noindex
        />
        <section className="py-24">
          <div className="container-x mx-auto max-w-2xl text-center">
            <h1 className="headline text-3xl text-ink sm:text-4xl">
              Cet article est introuvable
            </h1>
            <p className="mt-5 leading-relaxed text-muted">
              Il a peut-être été déplacé ou retiré. Retrouvez nos autres contenus
              ou revenez à l&apos;accueil.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link to="/blog" className="btn-primary">
                Voir tous les articles
              </Link>
              <Link to="/" className="btn-outline">
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  const url = `${SITE_URL}/blog/${post.slug}`
  const cover = post.coverImage
    ? post.coverImage.startsWith('http')
      ? post.coverImage
      : `${SITE_URL}${post.coverImage}`
    : null

  // JSON-LD Article : indispensable pour que Google affiche l'extrait
  // et la date dans les résultats.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || undefined,
    image: cover ? [cover] : undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    inLanguage: 'fr-FR',
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: post.author, url: `${SITE_URL}/` },
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION.name,
      logo: { '@type': 'ImageObject', url: ORGANIZATION.logo.url },
    },
  }

  return (
    <>
      <Seo
        title={`${post.title} | Association Étincelle`}
        description={post.excerpt}
        ogImage={cover}
        jsonLd={jsonLd}
      />

      <article>
        <header className="grain relative overflow-hidden bg-ink-grad py-16 text-porcelain sm:py-20">
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-wine-600/25 blur-3xl" />
          <div className="container-x relative max-w-3xl">
            <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-porcelain/60">
              <Link to="/" className="transition hover:text-gold-300">
                Accueil
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <Link to="/blog" className="transition hover:text-gold-300">
                Blog
              </Link>
            </nav>

            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest2 text-gold-300">
              <Spark className="h-3 w-3" />
              {post.category}
            </div>

            <h1 className="headline mt-5 text-3xl sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-porcelain/70">
              <span>{post.author}</span>
              {formatDate(post.publishedAt) && (
                <time dateTime={post.publishedAt || undefined}>
                  {formatDate(post.publishedAt)}
                </time>
              )}
            </div>
          </div>
        </header>

        {cover && (
          <div className="container-x -mt-10 max-w-4xl">
            <figure className="frame relative overflow-hidden shadow-lift">
              <img
                src={post.coverImage}
                alt={post.coverAlt || ''}
                loading="eager"
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
            </figure>
          </div>
        )}

        <div className="container-x max-w-3xl py-16 sm:py-20">
          {post.excerpt && (
            <p className="border-l-2 border-wine-600/30 pl-6 font-display text-lg leading-relaxed text-ink/85">
              {post.excerpt}
            </p>
          )}

          <div className="mt-10 space-y-10">
            {parseBody(post.body).map((block, i) => (
              <Reveal key={i} variant="up">
                <section>
                  {block.h && (
                    <h2 className="font-display text-2xl font-semibold text-ink">
                      {block.h}
                    </h2>
                  )}
                  <div className="mt-4 space-y-4 leading-relaxed text-muted">
                    {(block.p || []).map((para, j) => (
                      <p key={j}>
                        <Inline text={para} />
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          <footer className="mt-14 border-t border-ink/10 pt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-wine-600 underline-offset-4 transition hover:underline"
            >
              <i className="fa-solid fa-arrow-left text-xs" />
              Retour à tous les articles
            </Link>
          </footer>
        </div>
      </article>

      <Reveal>
        <CtaBanner />
      </Reveal>
    </>
  )
}