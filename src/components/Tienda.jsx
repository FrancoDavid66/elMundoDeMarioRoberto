import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { beneficios, categorias, promos, productos, whatsapps, marca } from '../data/tienda'
import { useBolsa } from '../hooks/bolsa'
import { useScrollSuave, irA } from '../hooks/scroll'
import Icono from './Iconos'
import Foto from './Foto'

const ease = [0.19, 1, 0.22, 1]
const entra = (i = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8%' },
  transition: { duration: 1, delay: i * 0.08, ease },
})

export function Encabezado({ titulo, accion, onAccion, href }) {
  const Tag = href ? 'a' : 'button'
  return (
    <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
      <motion.h2 {...entra()} className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-champagne md:text-2xl">
        {titulo}
      </motion.h2>
      {accion && (
        <Tag href={href} target={href ? '_blank' : undefined} rel="noreferrer" onClick={onAccion} className="group flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-champagne/60 transition hover:text-oro">
          {accion}
          <Icono nombre="flecha" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" grosor={2} />
        </Tag>
      )}
    </div>
  )
}

/* ---------------- Beneficios ---------------- */
export function Beneficios() {
  return (
    <section className="border-y border-champagne/10 bg-carbon/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-5 py-7 sm:px-8 md:grid-cols-4">
        {beneficios.map((b, i) => (
          <motion.div key={b.titulo} {...entra(i)} className={`flex items-center gap-3 md:justify-center ${i > 0 ? 'md:border-l md:border-champagne/10' : ''}`}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-oro/40 text-oro">
              <Icono nombre={b.icono} className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-champagne">{b.titulo}</p>
              <p className="text-xs text-champagne/50">{b.texto}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Categorías ---------------- */
export function Categorias() {
  const lenis = useScrollSuave()
  return (
    <section id="tienda" className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 md:pt-28">
      <div className="-mx-5 flex gap-6 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 md:justify-between">
        {categorias.map((c, i) => (
          <motion.button
            key={c.id}
            {...entra(i)}
            onClick={() => irA(lenis, 'destacados')}
            className="group flex w-20 shrink-0 flex-col items-center gap-3 md:w-24"
          >
            <span className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-champagne/15 bg-carbon text-champagne transition-all duration-500 group-hover:-translate-y-1 group-hover:border-oro group-hover:text-oro group-hover:shadow-[0_10px_40px_-8px_rgba(242,177,56,0.5)] md:h-20 md:w-20">
              <span className="absolute inset-1 rounded-full border border-champagne/5" />
              <Icono nombre={c.icono} className="h-8 w-8" grosor={1.1} />
            </span>
            <span className="text-center text-xs font-medium text-champagne/80 transition group-hover:text-oro md:text-sm">{c.nombre}</span>
          </motion.button>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Promos (3 tarjetas) ---------------- */
export function Promos() {
  const claro = (f, foto) => f === 'claro' && !foto
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-5 pt-12 sm:px-8 md:grid-cols-3 md:gap-5">
      {promos.map((p, i) => (
        <motion.a
          key={p.id}
          {...entra(i)}
          href={`https://wa.me/${whatsapps[0].numero}?text=${encodeURIComponent(`¡Hola EL MUNDO! Quiero consultar por ${p.titulo.replace('\n', ' ')}.`)}`}
          target="_blank"
          rel="noreferrer"
          data-cursor="Ver"
          className="group relative block h-60 overflow-hidden rounded-2xl md:h-72"
        >
          <Foto foto={p.foto} alt={p.titulo} arte={p.arte} tono={p.tono} fondo={p.fondo} className="absolute inset-0" claseArte="ml-[42%] w-[48%] -rotate-6" posicion="50% 30%" />
          {p.foto && <div className="absolute inset-0 bg-gradient-to-r from-noche/90 via-noche/55 to-transparent" />}
          <div className={`relative flex h-full max-w-[60%] flex-col p-6 ${claro(p.fondo, p.foto) ? 'text-noche' : 'text-champagne'}`}>
            <span className={`w-fit rounded px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.15em] ${claro(p.fondo, p.foto) ? 'bg-noche text-champagne' : 'bg-noche/70 text-champagne'}`}>{p.etiqueta}</span>
            <h3 className="mt-4 whitespace-pre-line font-display text-xl font-semibold leading-tight md:text-2xl">{p.titulo}</h3>
            <p className={`mt-3 whitespace-pre-line text-sm ${claro(p.fondo, p.foto) ? 'text-noche/70' : 'text-champagne/70'}`}>{p.bajada}</p>
            <span className="mt-auto flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em]">
              {p.cta}
              <Icono nombre="flecha" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5" grosor={2} />
            </span>
          </div>
        </motion.a>
      ))}
    </section>
  )
}

/* ---------------- Más vendidos ---------------- */
function Producto({ p, i }) {
  const { agregar, setAbierta } = useBolsa()
  const [abierto, setAbierto] = useState(false)
  const [ok, setOk] = useState(false)

  const elegir = (t) => {
    agregar(p, t)
    setAbierto(false)
    setOk(true)
    setTimeout(() => setOk(false), 1600)
  }

  return (
    <motion.article {...entra(i % 4)} className="group relative flex flex-col overflow-hidden rounded-2xl border border-champagne/10 bg-carbon transition-colors duration-500 hover:border-oro/40">
      <div className="relative">
        <Foto foto={p.foto} alt={p.nombre} arte={p.arte} tono={p.tono} className="aspect-[4/4.2]" />
        {p.etiqueta && <span className="absolute left-3 top-3 rounded bg-oro px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-noche">{p.etiqueta}</span>}

        <AnimatePresence>
          {abierto && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              className="vidrio absolute inset-x-3 bottom-3 rounded-xl p-3"
            >
              <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-champagne/70">Elegí tu talle</p>
              <div className="flex flex-wrap gap-1.5">
                {p.talles.map((t) => (
                  <button key={t} onClick={() => elegir(t)} className="h-8 min-w-8 rounded-full border border-champagne/20 bg-noche/60 px-2.5 text-xs font-semibold text-champagne transition hover:border-oro hover:bg-oro hover:text-noche">
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <p className="text-sm font-semibold text-champagne">{p.nombre}</p>
        <p className="mt-0.5 text-xs text-champagne/50">{p.categoria}</p>
        <div className="mt-4 flex items-end justify-between">
          <p className="font-display text-base font-semibold text-champagne md:text-lg">{p.precio == null ? 'Consultar' : `$${p.precio.toLocaleString('es-AR')}`}</p>
          <button
            onClick={() => (ok ? setAbierta(true) : setAbierto((a) => !a))}
            aria-label={`Sumar ${p.nombre} a la bolsa`}
            className={`relative flex h-9 w-9 items-center justify-center rounded-lg border transition ${ok ? 'border-oro bg-oro text-noche' : 'border-champagne/20 text-champagne/80 hover:border-oro hover:text-oro'}`}
          >
            {ok ? <span className="text-sm font-bold">✓</span> : <Icono nombre="bolsa" className="h-[18px] w-[18px]" grosor={1.5} />}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export function MasVendidos() {
  return (
    <section id="destacados" className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 md:pt-28">
      <Encabezado titulo="Más vendidos" accion="Ver todo" href={marca.instagram} />
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {productos.map((p, i) => (
          <Producto key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  )
}
