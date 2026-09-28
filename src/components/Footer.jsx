import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { marca, whatsapps } from '../data/tienda'
import { useScrollSuave, irA } from '../hooks/scroll'
import Magnetico from './Magnetico'
import { LogoGlobo } from './Navbar'

export default function Footer() {
  const ref = useRef(null)
  const lenis = useScrollSuave()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])
  const escala = useTransform(scrollYProgress, [0, 1], [0.85, 1])

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-champagne/10 pt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <div>
            <p className="etiqueta mb-6 text-oro">¿Viste algo que te gustó?</p>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-champagne md:text-8xl">
              Escribinos.
              <br />
              <span className="neon-suave">Te lo guardamos.</span>
            </h2>
          </div>
          <Magnetico fuerza={0.5}>
            <a
              href={`https://wa.me/${whatsapps[0].numero}?text=${encodeURIComponent('¡Hola EL MUNDO! Quiero hacer una consulta.')}`}
              target="_blank"
              rel="noreferrer"
              data-cursor="Chat"
              className="group relative flex h-40 w-40 items-center justify-center rounded-full bg-oro text-center font-display text-sm font-bold uppercase tracking-widest text-noche md:h-48 md:w-48"
            >
              <motion.svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}>
                <defs>
                  <path id="circulo" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text fontSize="12.5" letterSpacing="5" fill="#060504" fontFamily="Unbounded Variable, Unbounded">
                  <textPath href="#circulo">WHATSAPP · RESPUESTA RÁPIDA · WHATSAPP · RESPUESTA RÁPIDA ·</textPath>
                </text>
              </motion.svg>
              <span className="relative transition-transform duration-500 group-hover:scale-110">Hablar</span>
            </a>
          </Magnetico>
        </div>

        <div className="mt-24 grid gap-10 border-t border-champagne/10 pt-12 text-sm text-champagne/60 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <LogoGlobo className="h-12 w-12" />
            <div>
              <p className="neon neon-luz text-xl tracking-[0.08em]">EL MUNDO</p>
              <p className="text-xs">{marca.firma}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="etiqueta text-champagne/40">Navegar</p>
            {[['tienda', 'Tienda'], ['destacados', 'Más vendidos'], ['comunidad', 'Comunidad'], ['locales', 'Locales']].map(([id, txt]) => (
              <button key={id} onClick={() => irA(lenis, id)} className="block transition hover:text-oro">{txt}</button>
            ))}
          </div>
          <div className="space-y-2">
            <p className="etiqueta text-champagne/40">WhatsApp</p>
            {whatsapps.map((w) => (
              <a key={w.numero} href={`https://wa.me/${w.numero}`} target="_blank" rel="noreferrer" className="block transition hover:text-oro">{w.visible}</a>
            ))}
          </div>
          <div className="space-y-2">
            <p className="etiqueta text-champagne/40">Redes</p>
            <a href={marca.instagram} target="_blank" rel="noreferrer" className="block transition hover:text-oro">Instagram</a>
            <a href={marca.tiktok} target="_blank" rel="noreferrer" className="block transition hover:text-oro">TikTok</a>
          </div>
        </div>
      </div>

      <motion.p style={{ y, scale: escala }} className="neon neon-luz pointer-events-none mt-16 select-none whitespace-nowrap pb-6 text-center text-[19vw] leading-[0.85]" aria-hidden="true">
        EL MUNDO
      </motion.p>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-champagne/40 sm:flex-row sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} EL MUNDO de Mario Roberto. Todos los derechos reservados.</p>
        <button onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))} className="text-left transition hover:text-oro sm:text-right">
          Volver arriba ↑
        </button>
      </div>
    </footer>
  )
}
