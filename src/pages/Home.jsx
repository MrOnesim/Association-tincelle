import Hero from '../components/Hero'
import Programs from '../components/Programs'
import Commitments from '../components/Commitments'
import Team from '../components/Team'
import CommunityBand from '../components/CommunityBand'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import Partners from '../components/Partners'
import Gallery from '../components/Gallery'
import Location from '../components/Location'
import CtaBanner from '../components/CtaBanner'
import Reveal from '../components/Reveal'

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal><Programs /></Reveal>
      <Reveal><Commitments /></Reveal>
      <Reveal><Team /></Reveal>
      <Reveal><CommunityBand /></Reveal>
      <Reveal><Stats /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><Partners /></Reveal>
      <Reveal><Gallery /></Reveal>
      <Reveal><Location /></Reveal>
      <Reveal><CtaBanner /></Reveal>
    </>
  )
}
