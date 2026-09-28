import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { ScrollCtx } from './hooks/scroll'
import { BolsaProvider, useBolsa } from './hooks/bolsa'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquesina from './components/Marquesina'
import Manifiesto from './components/Manifiesto'
import { Beneficios, Categorias, Promos, MasVendidos } from './components/Tienda'
import { BannerPromo, Novedades, ListaDifusion } from './components/Editorial'
import Comunidad from './components/Comunidad'
import Locales from './components/Locales'
import Footer from './components/Footer'
import Bolsa from './components/Bolsa'
import { whatsapps } from './data/tienda'

function BarraProgreso() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-brasa via-oro to-champagne" style={{ scaleX: x }} />
}

function BotonesFlotantes() {
  const { total, setAbierta } = useBolsa()
  return (
    <div className="fixed bottom-5 right-5 z-[45] flex flex-col items-end gap-3">
      <AnimatePresence>
        {total > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setAbierta(true)}
            className="flex items-center gap-2 rounded-full bg-champagne px-5 py-3 text-sm font-bold text-noche shadow-2xl"
          >
            Bolsa · {total}
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href={`https://wa.me/${whatsapps[0].numero}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-oro text-noche shadow-[0_10px_40px_-5px_rgba(242,177,56,0.6)] md:hidden"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-oro/40" />
        <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" /></svg>
      </a>
    </div>
  )
}

export default function App() {
  const [lenis, setLenis] = useState(null)
  const [listo, setListo] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const l = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    let raf
    const loop = (t) => {
      l.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    setLenis(l)
    return () => {
      cancelAnimationFrame(raf)
      l.destroy()
    }
  }, [])

  // Bloquea el scroll mientras carga
  useEffect(() => {
    if (!lenis) return
    listo ? lenis.start() : lenis.stop()
  }, [listo, lenis])

  return (
    <ScrollCtx.Provider value={lenis}>
      <BolsaProvider>
        <Loader alTerminar={() => setListo(true)} />
        <div className="grano" aria-hidden="true" />
        <Cursor />
        <BarraProgreso />
        <Navbar />
        <main>
          <Hero listo={listo} />
          <Beneficios />
          <Categorias />
          <Promos />
          <MasVendidos />
          <BannerPromo />
          <Novedades />
          <Manifiesto />
          <Marquesina
            items={['Nueva temporada', 'Camisetas', 'Urbano', 'Deportivo', 'Accesorios', '2 locales']}
            className="mt-16 border-y border-champagne/10 bg-carbon py-5 font-display text-3xl font-extrabold uppercase tracking-tight text-champagne md:text-6xl"
          />
          <Comunidad />
          <Locales />
          <ListaDifusion />
        </main>
        <Footer />
        <Bolsa />
        <BotonesFlotantes />
      </BolsaProvider>
    </ScrollCtx.Provider>
  )
}
