import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <div className="bg-white min-h-screen flex flex-col overflow-x-hidden">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-20 md:pt-[116px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
