import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ProgramsPage from './pages/ProgramsPage'
import TestimonialsPage from './pages/TestimonialsPage'
import PartnersPage from './pages/PartnersPage'
import ConditionsPage from './pages/ConditionsPage'
import FaqPage from './pages/FaqPage'
import DemandPage from './pages/DemandPage'
import GalleryPage from './pages/GalleryPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/programmes" element={<ProgramsPage />} />
        <Route path="/apropos" element={<AboutPage />} />
        <Route path="/temoignages" element={<TestimonialsPage />} />
        <Route path="/partenaires" element={<PartnersPage />} />
        <Route path="/conditions" element={<ConditionsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/demande" element={<DemandPage />} />
        <Route path="/galerie" element={<GalleryPage />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
