import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useScrollSuave, irA } from '../hooks/scroll'
import { useBolsa } from '../hooks/bolsa'
import { marca, whatsapps, logo } from '../data/tienda'
import Magnetico from './Magnetico'

const links = [
  { id: 'tienda', txt: 'Tienda' },
  { id: 'destacados', txt: 'Más vendidos' },
  { id: 'comunidad', txt: 'Comunidad' },
  { id: 'locales', txt: 'Locales' },
]

export function LogoGlobo({ className = 'h-9 w-9' }) {
  return <img src={logo} alt="" className={`${className} rounded-full shadow-[0_0_18px_rgba(242,177,56,0.45)]`} />
}

export default function Navbar() {
  const lenis = useScrollSuave()
  const { total, setAbierta } = useBolsa()
  const [oculto, setOculto] = useState(false)
  const [solido, setSolido] = useState(false)
  const [menu, setMenu] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setOculto(y > prev && y > 200 && !menu)
    setSolido(y > 40)
  })

  useEffect(() => {
    if (!lenis) return
    menu ? lenis.stop() : lenis.start()
  }, [menu, lenis])

  const ir = (id) => {
    setMenu(false)
    setTimeout(() => irA(lenis, id), menu ? 350 : 0)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
        animate={{ y: oculto ? '-120%' : '0%' }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:px-4 ${
            solido ? 'vidrio shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]' : 'border border-transparent'
          }`}
        >
          <button onClick={() => ir('inicio')} className="flex items-center gap-3" aria-label="Ir al inicio">
            <LogoGlobo />
            <span className="neon neon-luz text-xl tracking-[0.08em]">EL MUNDO</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <button onClick={() => ir(l.id)} className="group relative overflow-hidden rounded-full px-4 py-2 text-sm text-champagne/70 transition-colors hover:text-champagne">
                  <span className="relative block transition-transform duration-500 group-hover:-translate-y-[130%]">{l.txt}</span>
                  <span className="absolute inset-x-4 top-2 block translate-y-[130%] text-oro transition-transform duration-500 group-hover:translate-y-0">{l.txt}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAbierta(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-champagne/15 text-champagne transition hover:border-oro hover:text-oro"
              aria-label="Abrir bolsa"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <AnimatePresence>
                {total > 0 && (
                  <motion.span
                    key={total}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-oro px-1 text-[10px] font-bold text-noche"
                  >
                    {total}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <Magnetico className="hidden sm:inline-block">
              <a
                href={`https://wa.me/${whatsapps[0].numero}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-oro px-5 py-2.5 text-sm font-semibold text-noche transition hover:bg-champagne"
              >
                WhatsApp
              </a>
            </Magnetico>
            <button onClick={() => setMenu((m) => !m)} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden" aria-label="Menú">
              <motion.span animate={menu ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="block h-px w-6 bg-champagne" />
              <motion.span animate={menu ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} className="block h-px w-6 bg-champagne" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-noche px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {links.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.button
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    onClick={() => ir(l.id)}
                    className="flex items-baseline gap-4 font-display text-4xl font-extrabold text-champagne"
                  >
                    <span className="text-xs font-light text-oro">0{i + 1}</span>
                    {l.txt}
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="space-y-3 text-sm text-champagne/60">
              {whatsapps.map((w) => (
                <a key={w.numero} href={`https://wa.me/${w.numero}`} className="block text-lg text-champagne">
                  {w.visible}
                </a>
              ))}
              <a href={marca.instagram} className="block">{marca.instagramUser}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
