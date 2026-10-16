/**
 * Banc d'essai local des fonctions d'API.
 *
 * Vite ne sert pas le dossier /api en développement, et la CLI Vercel
 * n'est pas disponible ici. On appelle donc chaque handler avec des
 * objets req/res simulés, en conditions réelles : la base est jointe, les
 * mots de passe sont dérivés, les permissions PostgreSQL s'appliquent.
 *
 * Usage :
 *   node --env-file=.env scripts/test-handlers.mjs "mot-de-passe"
 */
const results = { pass: 0, fail: 0 }

function makeRes() {
  const res = {
    statusCode: 200,
    body: null,
    headers: {},
    setHeader(k, v) {
      this.headers[k.toLowerCase()] = v
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }
  return res
}

/** Renvoie la valeur du cookie (sans le nom), comme le ferait un navigateur. */
function cookiesFrom(res) {
  const raw = res.headers['set-cookie']
  if (!raw) return ''
  const pair = (Array.isArray(raw) ? raw[0] : raw).split(';')[0]
  return pair.slice(pair.indexOf('=') + 1)
}

const check = (label, condition, detail = '') => {
  console.log(`${condition ? 'OK  ' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
  if (condition) results.pass += 1
  else results.fail += 1
}

const posts = (await import('../api/posts.js')).default
const login = (await import('../api/login.js')).default
const logout = (await import('../api/logout.js')).default
const session = (await import('../api/session.js')).default
const article = (await import('../api/article.js')).default

const EMAIL = 'aideassociationetincelle@gmail.com'
const password = process.argv[2]

// ---------------------------------------------------------------- lecture
{
  const res = makeRes()
  await posts({ method: 'GET', query: {} }, res)
  check('GET /api/posts répond 200', res.statusCode === 200, `HTTP ${res.statusCode}`)
  check('renvoie un tableau', Array.isArray(res.body), typeof res.body)
  console.log(`      articles publiés en base : ${Array.isArray(res.body) ? res.body.length : '—'}`)
}

{
  const res = makeRes()
  await posts({ method: 'POST', query: {} }, res)
  check('GET /api/posts refuse POST', res.statusCode === 405)
}

// ------------------------------------------------------------- connexion
{
  const res = makeRes()
  await login({ method: 'POST', body: { email: EMAIL, password: 'faux-mot-de-passe' }, cookies: {} }, res)
  check('mauvais mot de passe refusé', res.statusCode === 401, `HTTP ${res.statusCode}`)
}

{
  const res = makeRes()
  await login({ method: 'POST', body: { email: 'inconnu@example.com', password: 'peu-importe-1234' }, cookies: {} }, res)
  // 403 : l'adresse n'est pas celle autorisée par ADMIN_EMAIL. La
  // connexion est refusée avant même d regarder la base.
  check('adresse non autorisée refusée', res.statusCode === 403, `HTTP ${res.statusCode}`)
}

if (!password) {
  console.log('\nMot de passe non fourni : tests d’écriture et de session ignorés.')
} else {
  // ------------------------------------------------- écriture sans session
  {
    const res = makeRes()
    await article(
      { method: 'POST', body: { slug: 'x', title: 'x' }, cookies: {} },
      res,
    )
    check('écriture refusée sans session', res.statusCode === 401, `HTTP ${res.statusCode}`)
  }

  // ------------------------------------------------------- session ouverte
  let cookie = ''
  {
    const res = makeRes()
    await login({ method: 'POST', body: { email: EMAIL, password }, cookies: {} }, res)
    check('connexion réussie', res.statusCode === 200, `HTTP ${res.statusCode}`)
    cookie = cookiesFrom(res)
    check('cookie de session posé', Boolean(cookie))
  }

  {
    const res = makeRes()
    await session({ method: 'GET', cookies: cookie ? { etincelle_admin: cookie } : {} }, res)
    check('session reconnue', res.body?.authenticated === true, res.body?.email)
  }

  // ------------------------------------------------------ écriture d’un article
  {
    const res = makeRes()
    await article(
      { method: 'POST', body: { slug: 'Mauvais Slug!', title: 'Test' }, cookies: { etincelle_admin: cookie } },
      res,
    )
    check('identifiant d’URL invalide refusé', res.statusCode === 400, res.body?.error)
  }

  const slug = `test-technique-${Date.now()}`
  let created = false
  {
    const res = makeRes()
    await article(
      {
        method: 'POST',
        body: {
          slug,
          title: 'Article de test technique',
          excerpt: 'Vérification automatique.',
          body: '## Section\n\nContenu de vérification.',
          status: 'draft',
        },
        cookies: { etincelle_admin: cookie },
      },
      res,
    )
    created = res.statusCode === 200
    check('création d’un article', created, res.body?.error)
    check('statut brouillon enregistré', res.body?.article?.status === 'draft')
  }

  if (created) {
    const res = makeRes()
    await posts({ method: 'GET', query: { slug } }, res)
    check('brouillon invisible en lecture publique', res.body === null)
  }

  {
    const res = makeRes()
    await article({ method: 'DELETE', body: { slug }, cookies: { etincelle_admin: cookie } }, res)
    check('suppression de l’article', res.statusCode === 200 && res.body?.removed === 1)
  }

  // ------------------------------------------------------------ déconnexion
  {
    const res = makeRes()
    await logout({ method: 'POST', cookies: { etincelle_admin: cookie } }, res)
    check('déconnexion', res.statusCode === 200)
  }

  {
    const res = makeRes()
    await session({ method: 'GET', cookies: { etincelle_admin: cookie } }, res)
    check('session invalidée après déconnexion', res.body?.authenticated === false)
  }
}

console.log(`\n${results.fail === 0 ? 'Tous les tests passent.' : 'ÉCHEC'} — ${results.pass} réussis, ${results.fail} en échec.`)
process.exit(results.fail === 0 ? 0 : 1)