export const contact = {
  email: 'aideassociationetincelle@gmail.com',
  whatsapp: 'https://wa.me/33672039614',
  phone: '+33 6 72 03 96 14',
  phoneHref: 'tel:+33672039614',
  // Optionnel : endpoint d'un service type Formspree / Airtable / API Node.
  // Si renseigné, la demande est aussi envoyée côté serveur (stockage sécurisé).
  formEndpoint: '',
  siteUrl: 'https://www.association-etincelle.org',
  // Localisation (fiche Google Maps officielle)
  address: {
    name: 'Association Étincelle',
    street: '2D Av. des Étangs',
    city: '78170 La Celle-Saint-Cloud',
    country: 'France',
  },
  plusCode: 'R4WJ+5M La Celle-Saint-Cloud',
  mapsUrl: 'https://maps.app.goo.gl/vqDznB3VuDMUCQZT9?g_st=iw',
  mapsDirections:
    'https://www.google.com/maps/dir/?api=1&destination=Association+%C3%89tincelle%2C+2D+Av.+des+%C3%89tangs%2C+78170+La+Celle-Saint-Cloud%2C+France',
  // Intégration carte sans clé API
  mapsEmbed:
    'https://www.google.com/maps?q=Association+%C3%89tincelle%2C+2D+Av.+des+%C3%89tangs%2C+78170+La+Celle-Saint-Cloud%2C+France&z=16&output=embed',
  hours: 'Lundi – samedi · 9 h – 18 h',
  socials: [
    {
      name: 'Facebook',
      icon: 'fa-brands fa-facebook-f',
      href: 'https://www.facebook.com/profile.php?id=61591905747417&_rdc=1&_rdr#',
    },
    {
      name: 'TikTok',
      icon: 'fa-brands fa-tiktok',
      href: 'https://www.tiktok.com/@association.etincelle',
    },
    { name: 'Instagram', icon: 'fa-brands fa-instagram', href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: 'https://linkedin.com' },
    { name: 'YouTube', icon: 'fa-brands fa-youtube', href: 'https://youtube.com' },
    { name: 'X', icon: 'fa-brands fa-x-twitter', href: 'https://twitter.com' },
  ],
}

export const addressLine = (a = contact.address) => `${a.street}, ${a.city}, ${a.country}`
