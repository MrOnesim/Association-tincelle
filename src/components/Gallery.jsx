import SectionHeading from './SectionHeading'

const images = [
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200',
  '/assets/agee IA.png',
  '/assets/encaisser.png',
  '/assets/FINACE IA.png',
]

export default function Gallery() {
  const loop = [...images, ...images]
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-x">
        <SectionHeading eyebrow="Galerie" title="Nos actions sur le terrain" />
      </div>
      <div className="mt-12 slider">
        <div className="slide-track">
          {loop.map((src, i) => (
            <img key={i} src={src} alt="Action de l'association" className="slide" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  )
}
