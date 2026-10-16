/**
 * Injecte les articles de démonstration dans la base.
 *
 * Utile une première fois pour que le blog ne soit pas vide, et pour
 * vérifier de bout en bout que le pré-rendu lit bien la base.
 *
 * Les corps sont convertis en Markdown, format réellement stocké.
 *
 * Usage : node --env-file=.env scripts/seed-demo.mjs [--publier]
 */
import pg from 'pg'
import { localPosts } from '../src/data/posts.demo.js'

const publish = process.argv.includes('--publier')

/** Convertit la structure de démonstration en Markdown. */
const toMarkdown = (post) =>
  post.body
    .map((block) => {
      const title = block.h ? `## ${block.h}\n\n` : ''
      const paragraphs = (block.p || []).join('\n\n')
      return `${title}${paragraphs}`
    })
    .join('\n\n')

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
  ssl: process.env.DATABASE_URL.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : undefined,
})

for (const post of localPosts) {
  const status = publish ? 'published' : 'draft'
  await pool.query(
    `insert into articles
       (slug, title, excerpt, body, cover_image, cover_alt,
        author, category, status, published_at, updated_at)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, now())
     on conflict (slug) do update set
       title        = excluded.title,
       excerpt      = excluded.excerpt,
       body         = excluded.body,
       cover_image  = excluded.cover_image,
       cover_alt    = excluded.cover_alt,
       category     = excluded.category,
       author       = excluded.author,
       status       = excluded.status,
       published_at = excluded.published_at,
       updated_at   = now()`,
    [
      post.slug,
      post.title,
      post.excerpt,
      toMarkdown(post),
      post.coverImage,
      post.coverAlt,
      post.author,
      post.category,
      status,
      post.publishedAt,
    ],
  )
  console.log(`${status === 'published' ? 'publié  ' : 'brouillon'} ${post.slug}`)
}

await pool.end()
console.log(`\n${localPosts.length} article(s) traité(s).`)
console.log(
  publish
    ? 'Relance le build pour qu\'ils apparaissent sur le site.'
    : 'Relance avec --publier pour les rendre visibles sur le site.',
)