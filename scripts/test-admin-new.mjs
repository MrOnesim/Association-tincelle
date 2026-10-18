/**
 * Vérifie les nouvelles routes d'administration : liste des articles,
 * lecture d'un brouillon, dépôt d'image.
 *
 * Usage : node --env-file=.env scripts\test-admin-new.mjs "motdepasse"
 */
import { createServer } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

const password = process.argv[2]
const EMAIL = 'aideassociationetincelle@gmail.com'

let fail = 0
const check = (label, ok, detail = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
  if (!ok) fail += 1
}

function makeRes() {
  return {
    statusCode: 200,
    body: null,
    headers: {},
    setHeader(k, v) {
      this.headers[k.toLowerCase()] = v
    },
    status(c) {
      this.statusCode = c
      return this
    },
    json(p) {
      this.body = p
      return this
    },
    send(p) {
      this.body = p
      return this
    },
    end() {
      return this
    },
  }
}

// Un PNG 1x1 valide, signature réelle reconnue par le contrôle de type.
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

const adminArticles = (await import('../api/admin/articles.js')).default
const upload = (await import('../api/upload.js')).default
const image = (await import('../api/image.js')).default
const article = (await import('../api/article.js')).default

const slug = `essai-${Date.now()}`
let cookie = ''

// 1. Liste refusée sans session
{
  const res = makeRes()
  await adminArticles({ method: 'GET', query: {}, cookies: {} }, res)
  check('liste refusée sans session', res.statusCode === 401)
}

// 2. Envoi d'image refusé sans session
{
  const res = makeRes()
  await upload(
    { method: 'POST', body: { filename: 'x.png', dataBase64: PNG.toString('base64') }, cookies: {} },
    res,
  )
  check('envoi d’image refusé sans session', res.statusCode === 401)
}

// 3. Session
if (!password) {
  console.log('\nMot de passe non fourni : suite ignorée.')
  process.exit(fail === 0 ? 0 : 1)
}

const login = (await import('../api/login.js')).default
{
  const res = makeRes()
  await login({ method: 'POST', body: { email: EMAIL, password }, cookies: {} }, res)
  check('connexion', res.statusCode === 200, res.body?.error || '')
  cookie = (res.headers['set-cookie'] || [''])[0].split(';')[0].slice('etincelle_admin='.length)
}
const auth = { etincelle_admin: cookie }

// 4. Création d'un brouillon pour tester
{
  const res = makeRes()
  await article(
    {
      method: 'POST',
      body: { slug, title: 'Essai image', body: '## Test\n\nContenu.', status: 'draft' },
      cookies: auth,
    },
    res,
  )
  check('création du brouillon', res.statusCode === 200, res.body?.error || '')
}

// 5. Liste : contient le brouillon
{
  const res = makeRes()
  await adminArticles({ method: 'GET', query: {}, cookies: auth }, res)
  check('liste renvoyée', res.statusCode === 200 && Array.isArray(res.body), `${res.body?.length} article(s)`)
  check('brouillon présent dans la liste', res.body?.some((a) => a.slug === slug))
}

// 6. Lecture du brouillon (invisible en public)
{
  const res = makeRes()
  await adminArticles({ method: 'GET', query: { slug }, cookies: auth }, res)
  check('lecture du brouillon pour édition', res.statusCode === 200 && res.body?.title === 'Essai image')
}

// 7. Envoi d'image
let imageKey = ''
{
  const res = makeRes()
  await upload(
    { method: 'POST', body: { filename: 'Ma Photo Été.png', dataBase64: PNG.toString('base64') }, cookies: auth },
    res,
  )
  check('envoi d’image accepté', res.statusCode === 200, res.body?.error || '')
  check('extension déduite du contenu (PNG malgré le nom .png)', res.body?.path?.includes('.png'), res.body?.path)
  imageKey = res.body?.key || ''
  check('accents retirés du nom de fichier', /ma-photo-ete/.test(imageKey), imageKey)
}

// 8. Type réellement refusé
{
  const res = makeRes()
  await upload(
    { method: 'POST', body: { filename: 'faux.png', dataBase64: Buffer.from('ceci nest pas une image').toString('base64') }, cookies: auth },
    res,
  )
  check('faux fichier image refusé', res.statusCode === 415, res.body?.error)
}

// 9. Image servie publiquement
if (imageKey) {
  const res = makeRes()
  await image({ method: 'GET', query: { key: imageKey } }, res)
  check('image servie', res.statusCode === 200 && Buffer.isBuffer(res.body), `${res.body?.length} octets`)
  check('type MIME correct', res.headers['content-type'] === 'image/png', res.headers['content-type'])
}

// 10. Clé d'image refusée si elle sort du format attendu
{
  const res = makeRes()
  await image({ method: 'GET', query: { key: '../../etc/passwd' } }, res)
  check('chemin non conforme refusé', res.statusCode === 400)
}

// 11. Nettoyage
{
  const res = makeRes()
  await article({ method: 'DELETE', body: { slug }, cookies: auth }, res)
  check('suppression du brouillon', res.statusCode === 200 && res.body?.removed === 1)
}

console.log(`\n${fail === 0 ? 'Toutes les vérifications passent.' : `${fail} échec(s).`}`)
process.exit(fail === 0 ? 0 : 1)