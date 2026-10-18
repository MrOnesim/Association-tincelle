/**
 * Test de bout en bout sur le site déployé, avec le vrai mot de passe.
 *
 * Crée un article de vérification, confirme qu'il reste invisible en
 * public tant qu'il est brouillon, puis le supprime. Ne laisse rien
 * derrière soi.
 *
 * Usage :
 *   node scripts\check-live.mjs            (vérifications publiques)
 *   node scripts\e2e-prod.mjs "motdepasse" (avec écriture réelle)
 */
const SITE = process.argv[2] || 'https://association-tincelle.vercel.app'
const password = process.argv[3]

let cookie = ''
let fail = 0

const check = (label, ok, detail = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
  if (!ok) fail += 1
}

const call = async (path, options = {}) => {
  const res = await fetch(`${SITE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Le cookie doit être transmis sous la forme nom=valeur.
      ...(cookie ? { cookie } : {}),
      ...(options.headers || {}),
    },
  })
  const setCookie = res.headers.get('set-cookie')
  // On ne garde que la paire nom=valeur, sans les attributs.
  if (setCookie) cookie = setCookie.split(';')[0]
  const body = await res.json().catch(() => null)
  return { status: res.status, body }
}

if (!password) {
  console.log('Mot de passe non fourni : vérifications publiques seules.')
  process.exit(0)
}

const EMAIL = 'aideassociationetincelle@gmail.com'

// 1. Connexion réelle
const login = await call('/api/login', {
  method: 'POST',
  body: JSON.stringify({ email: EMAIL, password }),
})
check('connexion réelle en production', login.status === 200, `HTTP ${login.status} ${login.body?.error || ''}`)
if (login.status !== 200) process.exit(1)

// 2. Session reconnue
const session = await call('/api/session')
check('session ouverte', session.body?.authenticated === true, session.body?.email)

// 3. Création d'un brouillon
const slug = `verification-${Date.now()}`
const created = await call('/api/article', {
  method: 'POST',
  body: JSON.stringify({
    slug,
    title: 'Article de vérification',
    excerpt: 'Créé automatiquement pour contrôler le fonctionnement.',
    body: '## Contrôle\n\nCe contenu doit rester invisible.',
    status: 'draft',
  }),
})
check('création d’un article', created.status === 200, created.body?.error)
if (created.status !== 200) process.exit(1)

// 4. Invisible en public tant que brouillon
const publicRead = await call(`/api/posts?slug=${slug}`)
check('brouillon invisible en public', publicRead.body === null)

// 5. Nettoyage
const removed = await call('/api/article', { method: 'DELETE', body: JSON.stringify({ slug }) })
check('suppression du brouillon', removed.status === 200 && removed.body?.removed === 1)

const afterDelete = await call(`/api/posts?slug=${slug}`)
check('article supprimé', afterDelete.body === null)

// 6. Déconnexion
const out = await call('/api/logout', { method: 'POST' })
check('déconnexion', out.status === 200)

const closed = await call('/api/session')
check('session fermée', closed.body?.authenticated === false)

console.log(`\n${fail === 0 ? 'Écriture en production vérifiée, rien laissé derrière.' : 'ÉCHEC'}`)
process.exit(fail === 0 ? 0 : 1)