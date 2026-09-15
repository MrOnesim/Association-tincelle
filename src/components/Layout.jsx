import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatBot from './ChatBot'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/** Fine barre de progression de lecture, en dégradé de marque. */
function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div className="h-full bg-brand-grad transition-[width] duration-150" style={{ width: `${progress}%` }} />
    </div>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-porcelain">
      <ScrollToTop />
      <ScrollProgress />
      <Header />
      <main className="flex-1 pt-20 md:pt-[116px]">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}
