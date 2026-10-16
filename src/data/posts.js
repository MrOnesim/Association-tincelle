/**
 * Accès aux articles, côté navigateur.
 *
 * Les données viennent de l'API du site elle-même (/api/posts), jamais
 * directement de la base : aucune chaîne de connexion ni identifiant ne
 * doit atteindre le code du navigateur.
 *
 * Tant que l'API n'est pas disponible — développement local, ou base pas
 * encore configurée — les articles de démonstration prennent le relais.
 */

export const API_BASE = '/api'

const withTimeout = async (url, options = {}, ms = 8000) => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

/** Articles publiés, du plus récent au plus ancien. */
export async function getPublishedPosts() {
  try {
    const res = await withTimeout(`${API_BASE}/posts`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const posts = await res.json()
    if (Array.isArray(posts) && posts.length) return posts
    return posts
  } catch (err) {
    const { localPosts } = await import('./posts.demo')
    console.warn('[posts] API indisponible, articles de démonstration :', err.message)
    return localPosts
  }
}

/** Un article publié par son slug, ou null. */
export async function getPostBySlug(slug) {
  if (!slug) return null
  try {
    const res = await withTimeout(`${API_BASE}/posts?slug=${encodeURIComponent(slug)}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const post = await res.json()
    if (post) return post
  } catch (err) {
    const { localPosts } = await import('./posts.demo')
    console.warn('[posts] API indisponible, démonstration utilisée :', err.message)
    return localPosts.find((p) => p.slug === slug) ?? null
  }
  return null
}

/** Connexion administrateur. */
export async function signIn(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Connexion impossible.')
  return data
}

export async function signOut() {
  await fetch(`${API_BASE}/logout`, { method: 'POST' })
}

/** Vérifie si une session est ouverte, sans rien exposer de sensible. */
export async function checkSession() {
  try {
    const res = await withTimeout(`${API_BASE}/session`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

/** Crée ou met à jour un article. Réservé à l'administrateur connecté. */
export async function saveArticle(article) {
  const res = await fetch(`${API_BASE}/article`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Enregistrement impossible.')
  return data
}

export async function deleteArticle(slug) {
  const res = await fetch(`${API_BASE}/article`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Suppression impossible.')
  return data
}

/**
 * Transforme un titre en identifiant d'URL lisible :
 * « Mon Article Étonnant » devient « mon-article-etonnant ».
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