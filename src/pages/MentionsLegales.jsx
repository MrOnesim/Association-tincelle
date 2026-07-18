import LegalPage from './LegalPage'
import { contact } from '../data/contact'

export default function MentionsLegales() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions légales"
      intro="Conformément aux dispositions légales applicables, voici les informations relatives à l'éditeur du site."
      sections={[
        {
          h: 'Éditeur du site',
          p: [
            "Association Étincelle, organisation à but non lucratif.",
            `Contact : ${contact.email}`,
          ],
        },
        {
          h: 'Directeur de publication',
          p: 'Le représentant légal de l\'Association Étincelle.',
        },
        {
          h: 'Hébergement',
          p: 'Le site est hébergé par un prestataire d\'hébergement web professionnel (à préciser).',
        },
        {
          h: 'Propriété intellectuelle',
          p: "L'ensemble des contenus (textes, visuels, logotype) est la propriété de l'Association Étincelle, sauf mention contraire. Toute reproduction sans autorisation est interdite.",
        },
        {
          h: 'Responsabilité',
          p: "L'Association Étincelle s'efforce de fournir des informations exactes, mais ne saurait être tenue responsable d'éventuelles erreurs ou omissions.",
        },
        {
          h: 'Liens hypertextes',
          p: 'Les liens vers des sites tiers sont fournis à titre d\'information ; l\'Association Étincelle n\'en assume pas la responsabilité.',
        },
        {
          h: 'Droit applicable',
          p: "Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux compétents seront seuls juges.",
        },
      ]}
    />
  )
}
