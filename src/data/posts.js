/**
 * Accès aux articles du blog.
 *
 * Deux sources possibles, choisies à l'exécution :
 *  - Supabase (REST) si VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont
 *    définis au build, ce qui est le cas en production sur Vercel ;
 *  - sinon les données de démonstration locales, pour permettre de
 *    développer et de valider l'interface sans base configurée.
 *
 * L'interface est identique dans les deux cas, ce qui évite de
 * conditionner les composants eux-mêmes.
 */
import { localPosts } from './posts.demo'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const SUPABASE_CONFIGURED = Boolean(url && anonKey)

/** Articles publiés uniquement : le brouillon ne doit jamais fuiter. */
const ARTICLES_PATH = `${url}/rest/v1/articles?status=eq.published&select=*&order=published_at.desc`

const headers = {
  apikey: anonKey,
  Authorization: `Bearer ${anonKey}`,
}

/**
 * Normalise une ligne de la base en article exploitable par l'interface.
 * Les champs absents ou mal typés ne doivent pas faire échouer l'affichage.
 */
const normalize = (row) => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt ?? '',
  body: row.body ?? '',
  coverImage: row.cover_image ?? null,
  coverAlt: row.cover_alt ?? '',
  author: row.author ?? 'Association Étincelle',
  category: row.category ?? 'Général',
  status: row.status ?? 'draft',
  publishedAt: row.published_at ?? null,
  updatedAt: row.updated_at ?? null,
})

const byDateDesc = (a, b) =>
  new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()

/** Liste des articles publiés, du plus récent au plus ancien. */
export async function getPublishedPosts() {
  if (!SUPABASE_CONFIGURED) return [...localPosts].sort(byDateDesc)

  try {
    const res = await fetch(ARTICLES_PATH, { headers })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const rows = await res.json()
    return rows.map(normalize)
  } catch (err) {
    console.error('[posts] lecture impossible, repli sur les données locales :', err.message)
    return [...localPosts].sort(byDateDesc)
  }
}

/** Un article publié par son slug, ou null s'il n'existe pas. */
export async function getPostBySlug(slug) {
  if (!slug) return null

  if (!SUPABASE_CONFIGURED) {
    return localPosts.find((p) => p.slug === slug) ?? null
  }

  const path = `${url}/rest/v1/articles?slug=eq.${encodeURIComponent(
    slug,
  )}&status=eq.published&select=*&limit=1`

  try {
    const res = await fetch(path, { headers })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const rows = await res.json()
    return rows.length ? normalize(rows[0]) : null
  } catch (err) {
    console.error('[posts] article introuvable :', err.message)
    return null
  }
}

/** Slugs publiés, utilisés par le script de pré-rendu. */
export async function getPublishedSlugs() {
  const posts = await getPublishedPosts()
  return posts.map((p) => p.slug).filter(Boolean)
}

/**
 * Rend un slug lisible depuis un titre : « Mon Article Étonnant »
 * devient « mon-article-etonnant ». Les accents sont retirés pour que
 * l'URL reste stable et lisible quel que soit le navigateur.
 */
export function slugify(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}