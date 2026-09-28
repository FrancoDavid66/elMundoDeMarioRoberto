import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { productos, whatsapps } from '../data/tienda'
import ArteProducto from './ArteProducto'
import Titulo from './Titulo'
import { useBolsa } from '../hooks/bolsa'

const formatoPrecio = (p) => (p == null ? 'Consultar precio' : `$ ${p.toLocaleString('es-AR')}`)

function Producto({ p, i }) {
  const ref = useRef(null)
  const { agregar, setAbierta } = useBolsa()
  const [talle, setTalle] = useState(p.talles.length === 1 ? p.talles[0] : null)
  const [aviso, setAviso] = useState(false)
  const [agregado, setAgregado] = useState(false)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 160, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 160, damping: 18 })
  const brilloX = useTransform(mx, [0, 1], ['0%', '100%'])
  const brilloY = useTransform(my, [0, 1], ['0%', '100%'])

  const mover = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const salir = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  const sumar = () => {
    if (!talle) {
      setAviso(true)
      setTimeout(() => setAviso(false), 1600)
      return
    }
    agregar(p, talle)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 1400)
  }

  const consulta = `https://wa.me/${whatsapps[0].numero}?text=${encodeURIComponent(`¡Hola EL MUNDO! Quiero consultar por: ${p.nombre}${talle ? ` (talle ${talle})` : ''}.`)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 1.1, delay: (i % 3) * 0.1, ease: [0.19, 1, 0.22, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.article
        ref={ref}
        onPointerMove={mover}
        onPointerLeave={salir}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="borde-oro group relative overflow-hidden rounded-[1.75rem] bg-carbon"
      >
        <div className="relative aspect-[4/4.4] overflow-hidden" data-cursor="Mirá">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 60%, rgba(255,138,30,0.16), transparent 62%)' }} />
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: useTransform([brilloX, brilloY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,227,163,0.18), transparent 45%)`) }}
          />
          {p.etiqueta && <span className="etiqueta absolute left-5 top-5 z-10 rounded-full bg-oro px-3 py-1.5 !text-[0.55rem] text-noche">{p.etiqueta}</span>}
          <div style={{ transform: 'translateZ(60px)' }} className="absolute inset-[12%] transition-transform duration-700 group-hover:scale-105">
            {p.imagen ? (
              <img src={p.imagen} alt={p.nombre} className="h-full w-full object-contain" loading="lazy" />
            ) : (
              <ArteProducto tipo={p.arte} tono={p.tono} className="h-full w-full drop-shadow-[0_25px_30px_rgba(0,0,0,0.65)]" />
            )}
          </div>
        </div>

        <div className="relative space-y-4 border-t border-champagne/5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="etiqueta text-champagne/40">{p.categoria}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-champagne">{p.nombre}</h3>
            </div>
            <p className="shrink-0 pt-5 text-sm font-semibold text-oro">{formatoPrecio(p.precio)}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {p.talles.map((t) => (
              <button
                key={t}
                onClick={() => setTalle(t)}
                className={`h-9 min-w-9 rounded-full border px-3 text-xs font-semibold transition ${
                  talle === t ? 'border-oro bg-oro text-noche' : 'border-champagne/15 text-champagne/70 hover:border-oro/60'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative flex gap-2">
            <button onClick={sumar} className="relative flex-1 overflow-hidden rounded-full bg-champagne py-3 text-sm font-bold text-noche transition hover:bg-oro">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={agregado ? 'ok' : 'add'} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="block">
                  {agregado ? '✓ Agregado' : 'Sumar a la bolsa'}
                </motion.span>
              </AnimatePresence>
            </button>
            <a href={consulta} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/15 text-champagne transition hover:border-oro hover:text-oro">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" /></svg>
            </a>
            <AnimatePresence>
              {aviso && (
                <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -top-9 left-0 rounded-full bg-brasa px-3 py-1 text-xs font-semibold text-noche">
                  Elegí un talle primero
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          {agregado && (
            <button onClick={() => setAbierta(true)} className="text-xs text-oro underline underline-offset-4">
              Ver bolsa
            </button>
          )}
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function Destacados() {
  return (
    <section id="destacados" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-40">
      <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="etiqueta mb-6 flex items-center gap-3 text-oro">
            <span className="h-px w-10 bg-oro" /> Destacados de la semana
          </p>
          <Titulo lineas={['Lo que', 'se está llevando']} className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-champagne md:text-7xl" />
        </div>
        <p className="max-w-sm text-champagne/60">Armá tu bolsa, elegí el local y te respondemos por WhatsApp con precio, stock y talle al toque.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((p, i) => (
          <Producto key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  )
}
