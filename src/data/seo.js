export const SITE_URL = 'https://association-tincelle.vercel.app'

export const OG_IMAGE = `${SITE_URL}/assets/opt/siege.webp`

export const ORGANIZATION = {
  '@type': 'NGO',
  '@id': `${SITE_URL}/#organization`,
  name: 'Association Étincelle',
  legalName: 'Association Étincelle',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/assets/logo-etincelle.png`,
    width: 512,
    height: 512,
  },
  image: OG_IMAGE,
  description:
    "Association à but non lucratif : accompagnement financier transparent et humain pour étudiants, entrepreneurs et familles.",
  email: 'aideassociationetincelle@gmail.com',
  telephone: '+33672039614',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2D Av. des Étangs',
    addressLocality: 'La Celle-Saint-Cloud',
    postalCode: '78170',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61591905747417',
    'https://www.tiktok.com/@association.etincelle',
  ],
}

const BRAND = 'Association Étincelle'

/** Métadonnées par route. Clé = pathname exact (react-router). */
export const seoByPath = {
  '/': {
    title: `${BRAND} — Votre liberté financière, notre objectif`,
    description:
      "Association Étincelle, organisation à but non lucratif. Accompagnement financier transparent et humain pour étudiants, entrepreneurs et familles. Votre liberté financière, notre objectif.",
    priority: 1,
  },
  '/programmes': {
    title: `Nos programmes d'aide | ${BRAND}`,
    description:
      "Études, entrepreneuriat, projets personnels ou accompagnement : découvrez les dispositifs d'aide de l'Association Étincelle et le processus pour en bénéficier.",
    breadcrumbs: ['Nos programmes'],
    priority: 2,
  },
  '/apropos': {
    title: `À propos de l'association | ${BRAND}`,
    description:
      "Découvrez l'Association Étincelle : notre mission, nos valeurs et notre engagement auprès des étudiants, entrepreneurs et familles accompagnés.",
    breadcrumbs: ['À propos'],
    priority: 2,
  },
  '/demande': {
    title: `Déposer une demande d'aide | ${BRAND}`,
    description:
      "Formulaire de demande d'aide de l'Association Étincelle : études, entrepreneuriat, soutien aux familles. 100 % confidentiel, réponse sous 48 h.",
    breadcrumbs: ['Déposer une demande'],
    priority: 2,
  },
  '/partenaires': {
    title: `Nos partenaires | ${BRAND}`,
    description:
      "Les acteurs engagés qui collaborent avec l'Association Étincelle pour amplifier son impact sur le terrain.",
    breadcrumbs: ['Partenaires'],
    priority: 3,
  },
  '/temoignages': {
    title: `Témoignages de nos bénéficiaires | ${BRAND}`,
    description:
      "Parcours accompagnés et projets concrétisés : découvrez les témoignages de nos bénéficiaires accompagnés par l'Association Étincelle.",
    breadcrumbs: ['Témoignages'],
    priority: 3,
  },
  '/galerie': {
    title: `Nos actions en images | ${BRAND}`,
    description:
      "Un aperçu de nos journées, rencontres et accompagnements auprès des bénéficiaires de l'Association Étincelle.",
    breadcrumbs: ['Galerie'],
    priority: 3,
  },
  '/faq': {
    title: `Questions fréquentes | ${BRAND}`,
    description:
      "Réponses aux questions fréquentes : qui peut bénéficier d'une aide de l'Association Étincelle, comment faire une demande, quels justificatifs fournir.",
    breadcrumbs: ['FAQ'],
    priority: 3,
  },
  '/conditions': {
    title: `Conditions d'éligibilité | ${BRAND}`,
    description:
      "Critères pour présenter une demande d'aide à l'Association Étincelle et étapes du processus d'accompagnement.",
    breadcrumbs: ['Conditions'],
    priority: 4,
  },
  '/mentions-legales': {
    title: `Mentions légales | ${BRAND}`,
    description:
      "Informations légales relatives à l'éditeur et à l'hébergement du site de l'Association Étincelle.",
    breadcrumbs: ['Mentions légales'],
    priority: 5,
  },
  '/confidentialite': {
    title: `Politique de confidentialité | ${BRAND}`,
    description:
      "Comment l'Association Étincelle collecte et traite vos données personnelles, et comment exercer vos droits RGPD.",
    breadcrumbs: ['Politique de confidentialité'],
    priority: 5,
  },
}

export const notFoundSeo = {
  title: `Page introuvable | ${BRAND}`,
  description: "Cette page n'existe pas ou a été déplacée. Retrouvez l'accueil de l'Association Étincelle.",
  robots: 'noindex, follow',
  breadcrumbs: ['Page introuvable'],
}

/** Normalise /foo/ → /foo pour retrouver l'entrée du tableau. */
export const normalizePath = (pathname) => {
  if (!pathname || pathname === '/') return '/'
  return pathname.replace(/\/+$/, '') || '/'
}

export const getSeo = (pathname) => seoByPath[normalizePath(pathname)] || notFoundSeo

export const absoluteUrl = (pathname) => `${SITE_URL}${normalizePath(pathname)}`

export const breadcrumbsFor = (seo, pathname) => {
  if (!seo.breadcrumbs?.length) return []
  const url = absoluteUrl(pathname)
  return [
    { name: 'Accueil', url: `${SITE_URL}/` },
    ...seo.breadcrumbs.map((name) => ({ name, url })),
  ]
}

/** Graphe JSON-LD de la page courante (Organization + WebPage + fil d'Ariane). */
export const buildJsonLd = (seo, pathname) => {
  const url = absoluteUrl(pathname)
  const graph = [
    ORGANIZATION,
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: seo.title,
      description: seo.description,
      inLanguage: 'fr-FR',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      primaryImageOfPage: { '@id': OG_IMAGE },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: BRAND,
      description: ORGANIZATION.description,
      inLanguage: 'fr-FR',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ]

  if (seo.breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: `${SITE_URL}/`,
        },
        ...seo.breadcrumbs.map((name, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          name,
          item: url,
        })),
      ],
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}