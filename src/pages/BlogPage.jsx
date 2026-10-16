import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Spark from '../components/Spark'
import CtaBanner from '../components/CtaBanner'
import { getPublishedPosts } from '../data/posts'

const formatDate = (iso) => {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    let active = true
    getPublishedPosts().then((data) => {
      if (active) setPosts(data)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Nos articles et guides"
        description="Des contenus concrets sur les démarches, les dispositifs d'aide et l'accompagnement que nous proposons."
      />

      <section className="relative py-16 sm:py-20">
        <div className="container-x">
          {posts === null && (
            <p className="text-center text-muted">Chargement des articles…</p>
          )}

          {posts?.length === 0 && (
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Aucun article pour le moment
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Les premiers articles sont en cours de rédaction. En attendant,
                l&apos;équipe reste disponible pour répondre à vos questions.
              </p>
              <Link to="/faq" className="btn-primary mt-8 inline-flex">
                Consulter la FAQ
              </Link>
            </div>
          )}

          {posts?.length > 0 && (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id || post.slug} delay={i * 80} variant="up">
                  <article className="card group flex h-full flex-col overflow-hidden">
                    {post.coverImage && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.coverAlt || ''}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest2 text-wine-600">
                        <Spark className="h-2.5 w-2.5" />
                        {post.category}
                      </div>

                      <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-ink">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="transition-colors hover:text-wine-600"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {post.excerpt && (
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="mt-auto flex items-center justify-between gap-4 border-t border-ink/8 pt-5 text-xs text-muted">
                        <time dateTime={post.publishedAt || undefined}>
                          {formatDate(post.publishedAt)}
                        </time>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 font-bold text-wine-600 underline-offset-4 hover:underline"
                        >
                          Lire l&apos;article
                          <i className="fa-solid fa-arrow-right text-[10px]" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <Reveal>
        <CtaBanner />
      </Reveal>
    </>
  )
}