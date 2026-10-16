import { Link } from 'react-router-dom'
import LegalPage from './LegalPage'
import { contact } from '../data/contact'

export default function MentionsLegales() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions légales"
      intro="Dernière mise à jour : 11 octobre 2026. Les informations ci-dessous identifient l'éditeur, l'hébergeur et les conditions d'utilisation du présent site."
      sections={[
        {
          h: 'Éditeur du site',
          p: [
            <>
              Le site <strong>association-tincelle.vercel.app</strong> est édité par{' '}
              <strong>ETINCELLES FINANCE</strong>.
            </>,
            <>
              Dénomination : ETINCELLES FINANCE — Organisation à but non lucratif, capital de
              50 000 000 €.
            </>,
            <>
              Siège social : 78170 La Celle-Saint-Cloud, France.
              <br />
              SIREN : 980 868 186 — SIRET (siège) : 980 868 186 00019.
              <br />
              Immatriculée au RCS de Chambéry, à confirmer sous le numéro 980 868 186.
              <br />
              Code APE : 7022Z — Conseil pour les affaires et autres conseils de gestion.
            </>,
            <>
              Email : {contact.email}
              <br />
              Téléphone : {contact.phone}
            </>,
          ],
        },
        {
          h: 'Représentants légaux',
          p: [
            <>
              Président : CHANGING THE RULES, SAS (SIREN 888 572 021).
              <br />
              Directeur général : M. Philippe Lutz.
            </>,
          ],
        },
        {
          h: 'Hébergement',
          p: [
            <>
              Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Avenue #4133,
              Covina, CA 91723, États-Unis.
              <br />
              Site web : <a href="https://vercel.com">vercel.com</a>.
            </>,
          ],
        },
        {
          h: 'Activité et statut',
          p: [
            <>
              ETINCELLES FINANCE est une société d'organisation à but non lucratif. Les
              informations publiées sur ce site ont une vocation informative : elles constituent une
              offre d'aide financière non remboursable. Toute prestation fait l'objet d'un accord
              écrit distinct.
            </>,
            <>
              ETINCELLES FINANCE est immatriculée à l'ORIAS.
              <br />
              Autorité de contrôle : ACPR, 4 place de Budapest, CS 92459, 75436 Paris Cedex 09.
            </>,
          ],
        },
        {
          h: 'Propriété intellectuelle',
          p: [
            <>
              L'ensemble du contenu du site (textes, logos, images, graphismes, structure) appartient
              à ETINCELLES FINANCE ou à ses partenaires, sauf mention contraire. Toute reproduction,
              représentation, modification ou exploitation, totale ou partielle, sans autorisation
              écrite préalable est interdite. Elle peut constituer une contrefaçon sanctionnée par le
              Code de la propriété intellectuelle.
            </>,
          ],
        },
        {
          h: 'Responsabilité',
          p: [
            <>
              ETINCELLES FINANCE s'efforce de publier des informations exactes et à jour, sans
              garantir leur exhaustivité ni l'absence d'erreurs. Elle ne peut être tenue responsable
              des dommages liés à l'utilisation du site, à une interruption de service ou au contenu
              de sites tiers vers lesquels il renvoie.
            </>,
          ],
        },
        {
          h: 'Données personnelles',
          p: [
            <>
              Les données collectées sur le site, notamment par le formulaire de demande, sont
              traitées conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et
              Libertés. Le responsable du traitement est ETINCELLES FINANCE.
            </>,
            <>
              Pour connaître les finalités, les durées de conservation et vos droits (accès,
              rectification, effacement, opposition, limitation, portabilité), consultez la{' '}
              <Link to="/confidentialite" className="font-medium text-wine-600 underline">
                politique de confidentialité
              </Link>
              .
            </>,
          ],
        },
        {
          h: 'Cookies',
          p: [
            <>
              Le site utilise uniquement les cookies décrits dans la{' '}
              <Link to="/confidentialite" className="font-medium text-wine-600 underline">
                politique de confidentialité
              </Link>
              . Les cookies non essentiels ne sont déposés qu'avec votre consentement.
            </>,
          ],
        },
        {
          h: 'Médiation de la consommation',
          p: [
            <>
              Si vous êtes consommateur, vous pouvez recourir gratuitement à un médiateur de la
              consommation.
            </>,
          ],
        },
        {
          h: 'Droit applicable',
          p: [
            <>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, et à
              défaut de résolution amiable, les tribunaux français sont compétents.
            </>,
          ],
        },
      ]}
    />
  )
}