import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { colecciones } from '../data/tienda'
import ArteProducto from './ArteProducto'
import Titulo from './Titulo'
import { useScrollSuave, irA } from '../hooks/scroll'

function Tarjeta({ c, i }) {
  const lenis = useScrollSuave()
  return (
    <motion.article
      data-cursor="Ver"
      onClick={() => irA(lenis, 'destacados')}
      whileHover="hover"
      className="borde-oro group relative flex h-[68svh] w-[82vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[2rem] bg-carbon p-7 sm:w-[60vw] md:h-[72vh] md:w-[40vw] md:p-10"
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 55%, rgba(255,138,30,0.18), transparent 60%)' }} />
      <span className="pointer-events-none absolute -right-4 -top-10 font-display text-[11rem] font-black leading-none text-champagne/[0.04] md:text-[16rem]">{c.numero}</span>

      <div className="relative flex items-center justify-between">
        <span className="etiqueta text-oro">Colección {c.numero}</span>
        <motion.span variants={{ hover: { rotate: -45, backgroundColor: '#f2b138', color: '#060504' } }} className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/20 text-champagne">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </motion.span>
      </div>

      <motion.div
        className="relative mx-auto w-[70%] max-w-[340px]"
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 5 + i, ease: 'easeInOut' }}
      >
        <motion.div variants={{ hover: { scale: 1.08, rotate: -4 } }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
          {c.imagen ? (
            <img src={c.imagen} alt={c.titulo} className="w-full rounded-2xl object-cover" loading="lazy" />
          ) : (
            <ArteProducto tipo={c.arte} tono={['celeste', 'oro', 'grafito', 'champagne'][i % 4]} className="w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" />
          )}
        </motion.div>
      </motion.div>

      <div className="relative">
        <h3 className="font-display text-3xl font-extrabold tracking-tight text-champagne md:text-5xl">{c.titulo}</h3>
        <p className="mt-3 max-w-sm text-champagne/60">{c.bajada}</p>
      </div>
    </motion.article>
  )
}

export default function Colecciones() {
  const seccion = useRef(null)
  const pista = useRef(null)
  const [dist, setDist] = useState(0)
  const [desktop, setDesktop] = useState(true)

  useLayoutEffect(() => {
    const medir = () => {
      const d = window.matchMedia('(min-width: 768px)').matches
      setDesktop(d)
      if (pista.current) setDist(Math.max(0, pista.current.scrollWidth - window.innerWidth))
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [])

  const { scrollYProgress } = useScroll({ target: seccion, offset: ['start start', 'end end'] })
  const xCrudo = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const x = useSpring(xCrudo, { stiffness: 120, damping: 30, mass: 0.3 })
  const barra = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const intro = (
    <div className="flex w-[82vw] shrink-0 flex-col justify-center pr-6 sm:w-[60vw] md:w-[34vw] md:pr-16">
      <p className="etiqueta mb-6 flex items-center gap-3 text-oro">
        <span className="h-px w-10 bg-oro" /> Colecciones
      </p>
      <Titulo lineas={['Cuatro', 'mundos', 'para vestirte']} className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-champagne md:text-7xl" claseLinea="" />
      <p className="mt-6 max-w-sm text-champagne/60">Desde la camiseta del partido hasta el look de todos los días. Deslizá y elegí tu mundo.</p>
    </div>
  )

  if (!desktop) {
    return (
      <section id="colecciones" className="py-24">
        <div className="px-5">{intro}</div>
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none]">
          {colecciones.map((c, i) => (
            <Tarjeta key={c.id} c={c} i={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="colecciones" ref={seccion} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={pista} style={{ x }} className="flex items-center gap-6 pl-[6vw] pr-[6vw]">
          {intro}
          {colecciones.map((c, i) => (
            <Tarjeta key={c.id} c={c} i={i} />
          ))}
        </motion.div>
        <div className="absolute bottom-8 left-[6vw] right-[6vw] flex items-center gap-6">
          <span className="etiqueta text-champagne/40">Deslizá</span>
          <div className="h-px flex-1 bg-champagne/10">
            <motion.div className="h-full bg-gradient-to-r from-brasa to-oro" style={{ width: barra }} />
          </div>
          <span className="etiqueta text-champagne/40">0{colecciones.length}</span>
        </div>
      </div>
    </section>
  )
}
