import SectionHeading from './SectionHeading'
import SmartImage from './SmartImage'

// Visuels locaux optimisés (WebP) — aucune dépendance externe.
// La photo d'équipe réelle est attendue dans public/assets/equipe.jpeg.
const images = [
  { src: '/assets/equipe.jpeg', alt: "Réunion de l'équipe de l'Association Étincelle" },
  { src: '/assets/opt/administration.webp', alt: 'Accueil administratif des bénéficiaires' },
  { src: '/assets/opt/agee-ia.webp', alt: 'Accompagnement d’une personne âgée' },
  { src: '/assets/opt/encaisser.webp', alt: 'Remise d’une aide financière' },
  { src: '/assets/opt/finance-ia.webp', alt: 'Atelier de gestion financière' },
  { src: '/assets/opt/couple.webp', alt: 'Couple accompagné par l’association' },
  { src: '/assets/opt/affiche-ia.webp', alt: 'Campagne de sensibilisation' },
  { src: '/assets/opt/b-debout.webp', alt: 'Bénéficiaire accompagné' },
  { src: '/assets/opt/an.webp', alt: 'Action de terrain' },
]

export default function Gallery() {
  const loop = [...images, ...images]
  return (
    <section className="overflow-hidden bg-ivory py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Galerie"
          title={
            <>
              Nos actions <span className="text-wine-600">sur le terrain</span>
            </>
          }
          description="Un aperçu de nos journées, rencontres et accompagnements auprès des bénéficiaires."
        />
      </div>
      <div className="slider mt-14">
        <div className="slide-track">
          {loop.map((img, i) => (
            <SmartImage key={i} src={img.src} alt={img.alt} className="slide" />
          ))}
        </div>
      </div>
    </section>
  )
}
