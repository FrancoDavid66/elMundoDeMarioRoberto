import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Globo from './Globo'
import Neon from './Neon'
import Magnetico from './Magnetico'
import { marca } from '../data/tienda'
import { useScrollSuave, irA } from '../hooks/scroll'

const ease = [0.19, 1, 0.22, 1]

export default function Hero({ listo }) {
  const ref = useRef(null)
  const lenis = useScrollSuave()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yTexto = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opTexto = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const aparece = (d) => ({
    initial: { opacity: 0, y: 30 },
    animate: listo ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.2, ease, delay: d },
  })

  return (
    <section id="inicio" ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* halo de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-20%] top-[5%] h-[80vmax] w-[80vmax] rounded-full opacity-40 blur-3xl md:right-[-10%]" style={{ background: 'radial-gradient(circle, rgba(255,138,30,0.35), rgba(242,177,56,0.08) 40%, transparent 65%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-noche via-noche/70 to-transparent" />
      </div>

      {/* Globo 3D */}
      <motion.div
        className="absolute left-1/2 top-[6%] h-[62svh] w-[140vw] -translate-x-1/2 md:left-auto md:right-[-6vw] md:top-1/2 md:h-[118svh] md:w-[68vw] md:-translate-y-1/2 md:translate-x-0"
        initial={{ opacity: 0 }}
        animate={listo ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
      >
        <Globo activo={listo} className="h-full w-full" />
      </motion.div>

      {/* HUD */}
      <motion.div {...aparece(1.4)} className="pointer-events-none absolute right-6 top-28 hidden text-right lg:block">
        <p className="etiqueta text-oro/70">Base de operaciones</p>
        <p className="mt-2 font-display text-xs font-light tracking-widest text-champagne/60">34°39′S · 58°33′O</p>
      </motion.div>
      <motion.div {...aparece(1.55)} className="pointer-events-none absolute bottom-40 right-[8%] hidden items-center gap-3 lg:flex">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-celeste opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-celeste" />
        </span>
        <span className="etiqueta text-champagne/60">2 locales · Buenos Aires</span>
      </motion.div>

      {/* Texto */}
      <motion.div style={{ y: yTexto, opacity: opTexto }} className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 md:pb-16">
        <motion.p {...aparece(0.2)} className="etiqueta mb-5 flex items-center gap-3 text-oro">
          <span className="h-px w-10 bg-oro" /> Tienda de ropa · Camisetas · Urbano
        </motion.p>

        <h1 className="leading-[0.9]">
          <Neon texto="EL" encendido={listo} retraso={0.2} zumbido={[1]} className="block text-[21vw] tracking-[0.02em] md:text-[12.5vw]" />
          <Neon texto="MUNDO" encendido={listo} retraso={0.45} zumbido={[3]} className="block text-[21vw] tracking-[0.02em] md:text-[12.5vw]" />
        </h1>

        <div className="mt-6 flex flex-col gap-8 md:mt-8 md:flex-row md:items-end md:justify-between">
          <motion.div {...aparece(0.75)} className="max-w-md">
            <p className="font-display text-sm font-light uppercase tracking-[0.3em] text-champagne/50">{marca.firma}</p>
            <p className="mt-3 text-lg leading-relaxed text-champagne/80 md:text-xl">{marca.bajada} Dos locales, miles de looks y una comunidad que no para de crecer.</p>
          </motion.div>

          <motion.div {...aparece(0.95)} className="flex flex-wrap items-center gap-3">
            <Magnetico>
              <button
                onClick={() => irA(lenis, 'tienda')}
                data-cursor="Ver"
                className="group relative overflow-hidden rounded-full bg-oro px-8 py-4 font-semibold text-noche"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Ver la tienda
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
                <span className="absolute inset-0 translate-y-full rounded-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-y-0" />
              </button>
            </Magnetico>
            <Magnetico>
              <button onClick={() => irA(lenis, 'locales')} className="rounded-full border border-champagne/20 px-8 py-4 font-medium text-champagne transition hover:border-oro hover:text-oro">
                Visitanos
              </button>
            </Magnetico>
          </motion.div>
        </div>
      </motion.div>

      {/* indicador scroll */}
      <motion.div {...aparece(1.6)} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="etiqueta text-champagne/40">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-champagne/15">
          <motion.span className="absolute left-0 top-0 block h-1/2 w-px bg-oro" animate={{ y: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} />
        </span>
      </motion.div>
    </section>
  )
}
