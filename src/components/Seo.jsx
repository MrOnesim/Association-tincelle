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
  el.textContent = JSON.stringify(data)
}

/**
 * Titre, description, canonical, Open Graph et JSON-LD propres à chaque route.
 * Les valeurs par défaut restent dans index.html (crawlers sans JavaScript).
 */
export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = getSeo(pathname)
    const url = absoluteUrl(pathname)

    document.title = seo.title

    setMeta('name', 'description', seo.description)
    setMeta('name', 'robots', seo.robots || 'index, follow')

    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', pathname === '/' ? 'website' : 'article')
    setMeta('property', 'og:image', OG_IMAGE)
    setMeta('property', 'og:locale', 'fr_FR')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', OG_IMAGE)

    setLink('canonical', url)
    setJsonLd(buildJsonLd(seo, pathname))
  }, [pathname])

  return null
}