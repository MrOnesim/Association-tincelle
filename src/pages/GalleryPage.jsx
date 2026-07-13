import PageHeader from '../components/PageHeader'
import Gallery from '../components/Gallery'
import Reveal from '../components/Reveal'

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Galerie"
        title="Nos actions sur le terrain"
        description="Un aperçu de nos journées, rencontres et accompagnements auprès des bénéficiaires."
      />
      <Reveal><Gallery /></Reveal>
    </>
  )
}
