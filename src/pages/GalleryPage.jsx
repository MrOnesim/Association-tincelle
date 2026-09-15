import PageHeader from '../components/PageHeader'
import Team from '../components/Team'
import Gallery from '../components/Gallery'
import CommunityBand from '../components/CommunityBand'
import CtaBanner from '../components/CtaBanner'
import Reveal from '../components/Reveal'

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Galerie"
        title="Nos actions sur le terrain"
        description="Un aperçu de nos journées, rencontres et accompagnements auprès des bénéficiaires."
      />
      <Reveal><Team /></Reveal>
      <Reveal><Gallery /></Reveal>
      <Reveal><CommunityBand /></Reveal>
      <Reveal><CtaBanner /></Reveal>
    </>
  )
}
