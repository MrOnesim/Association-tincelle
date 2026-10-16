import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { buildJsonLd, getSeo, absoluteUrl, OG_IMAGE } from '../data/seo'

const setMeta = (attr, key, content) => {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

const setJsonLd = (data) => {
  let el = document.getElementById('route-jsonld')
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'route-jsonld'
    document.head.appendChild(el)
  }
  // Les champs absents deviennent null après JSON.stringify : on les retire
  // pour ne pas envoyer de propriétés vides aux moteurs de recherche.
  const clean = (value) => {
    if (Array.isArray(value)) return value.map(clean).filter((v) => v !== undefined)
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, clean(v)]),
      )
    }
    return value
  }
  el.textContent = JSON.stringify(clean(data))
}

/**
 * Titre, description, canonical, Open Graph et JSON-LD propres à chaque route.
 * Les valeurs par défaut restent dans index.html (crawlers sans JavaScript).
 *
 * Les props `title`, `description`, `ogImage`, `jsonLd` et `noindex` permettent
 * de décrire une page dont le contenu est chargé à l'exécution, comme un
 * article de blog. Sans elles, les métadonnées sont déduites de l'URL.
 */
export default function Seo({ title, description, ogImage, jsonLd, noindex }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const route = getSeo(pathname)
    const url = absoluteUrl(pathname)
    const resolvedTitle = title || route.title
    const resolvedDescription = description || route.description
    const image = ogImage || OG_IMAGE

    document.title = resolvedTitle

    setMeta('name', 'description', resolvedDescription)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : route.robots || 'index, follow')

    setMeta('property', 'og:title', resolvedTitle)
    setMeta('property', 'og:description', resolvedDescription)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', pathname === '/' ? 'website' : 'article')
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:locale', 'fr_FR')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', resolvedTitle)
    setMeta('name', 'twitter:description', resolvedDescription)
    setMeta('name', 'twitter:image', image)

    setLink('canonical', url)
    setJsonLd(jsonLd || buildJsonLd(route, pathname))
  }, [pathname, title, description, ogImage, jsonLd, noindex])

  return null
}