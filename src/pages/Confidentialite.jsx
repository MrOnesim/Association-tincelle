import LegalPage from './LegalPage'
import { contact } from '../data/contact'

export default function Confidentialite() {
  return (
    <LegalPage
      eyebrow="Vie privée"
      title="Politique de confidentialité"
      intro="Cette politique décrit la manière dont l'Association Étincelle collecte et traite vos données personnelles."
      sections={[
        {
          h: 'Données collectées',
          p: [
            "Via le formulaire de demande : nom, adresse, code postal, ville, pays, téléphone, e-mail, situation financière, montant demandé, motivations, et coordonnées bancaires.",
            "Pièces justificatives : pièce d'identité, justificatif de domicile, documents financiers.",
          ],
        },
        {
          h: 'Finalité du traitement',
          p: "L'étude et le suivi de votre demande d'aide financière, ainsi que la gestion de nos relations avec les bénéficiaires.",
        },
        {
          h: 'Base légale',
          p: "Le traitement repose sur votre consentement explicite, recueilli via la case à cocher du formulaire.",
        },
        {
          h: 'Destinataires',
          p: [
            "Les données sont transmises à l'équipe de l'Association Étincelle et, pour le suivi, via le canal WhatsApp indiqué sur le site.",
            "Aucune donnée n'est vendue à des tiers.",
          ],
        },
        {
          h: 'Sécurité',
          p: "Attention : la transmission via WhatsApp s'effectue en clair. Pour des documents sensibles (RIB, pièce d'identité), nous recommandons d'utiliser un canal chiffré et nous vous invitons à nous le signaler.",
        },
        {
          h: 'Durée de conservation',
          p: "Vos données sont conservées le temps strictement nécessaire au traitement de la demande, puis supprimées selon nos règles internes.",
        },
        {
          h: 'Vos droits',
          p: [
            "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition sur vos données.",
            `Pour exercer ces droits, écrivez-nous à ${contact.email}.`,
          ],
        },
      ]}
    />
  )
}
