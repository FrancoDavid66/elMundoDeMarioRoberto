import { useState } from 'react'
import { motion } from 'framer-motion'
import { bannerPromo, novedades, whatsapps } from '../data/tienda'
import { Encabezado } from './Tienda'
import Foto from './Foto'
import Icono from './Iconos'
import Magnetico from './Magnetico'

const ease = [0.19, 1, 0.22, 1]

/* Onda de puntos dorados (como un ecualizador) */
function OndaDorada() {
  const barras = Array.from({ length: 64 })
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] items-center gap-[5px] md:flex" aria-hidden="true">
      {barras.map((_, i) => {
        const centro = 1 - Math.abs(i - 32) / 32
        return (
          <motion.span
            key={i}
            className="block w-[3px] rounded-full bg-gradient-to-b from-transparent via-oro to-transparent"
            style={{ opacity: 0.15 + centro * 0.7 }}
            animate={{ height: [`${10 + centro * 30}%`, `${20 + centro * 70}%`, `${10 + centro * 30}%`] }}
            transition={{ repeat: Infinity, duration: 1.6 + (i % 7) * 0.25, ease: 'easeInOut', delay: (i % 11) * 0.12 }}
          />
        )
      })}
    </div>
  )
}

export function BannerPromo() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 md:pt-28">
      <motion.div
        initial={{ opacity: 0, clipPath: 'inset(8% 8% 8% 8% round 1.5rem)' }}
        whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 1.5rem)' }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.3, ease }}
        className="borde-oro relative overflow-hidden rounded-3xl bg-carbon"
      >
        <OndaDorada />
        {bannerPromo.foto ? (
          <Foto foto={bannerPromo.foto} posicion="50% 22%" className="absolute inset-y-0 right-0 w-full md:w-[60%]" />
        ) : (
          <div className="pointer-events-none absolute -bottom-10 right-[6%] hidden w-[30%] md:block">
            <Foto arte="campera" tono="oro" className="aspect-square rounded-full bg-transparent" claseArte="w-[80%]" fondo="oscuro" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/85 to-transparent" />
        <div className="relative max-w-xl px-7 py-12 md:px-14 md:py-16">
          <p className="font-display text-[0.65rem] font-light uppercase tracking-[0.3em] text-champagne/70">{bannerPromo.arriba}</p>
          <h2 className="mt-5 whitespace-pre-line font-display text-3xl font-semibold leading-[1.1] text-champagne md:text-5xl">{bannerPromo.titulo}</h2>
          <p className="mt-5 max-w-md text-champagne/60">{bannerPromo.bajada}</p>
          <Magnetico className="mt-8">
            <a
              href={`https://wa.me/${whatsapps[0].numero}?text=${encodeURIComponent(bannerPromo.mensaje)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md bg-gradient-to-b from-[#f6c766] to-[#c98a23] px-6 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-noche shadow-[0_10px_30px_-10px_rgba(242,177,56,0.7)] transition hover:brightness-110"
            >
              {bannerPromo.cta}
              <Icono nombre="flecha" className="h-3.5 w-3.5" grosor={2.2} />
            </a>
          </Magnetico>
        </div>
      </motion.div>
    </section>
  )
}

export function Novedades() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 md:pt-28">
      <Encabezado titulo="Lo nuevo en El Mundo" accion="Ver todo" href={novedades[1].url} />
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {novedades.map((n, i) => (
          <motion.a
            key={n.id}
            href={n.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 1, delay: i * 0.1, ease }}
            className="group relative flex h-44 overflow-hidden rounded-2xl border border-champagne/10 bg-carbon transition-colors duration-500 hover:border-oro/40"
          >
            <div className="relative z-10 flex w-[58%] flex-col p-5">
              <span className="w-fit rounded bg-champagne/10 px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.15em] text-champagne/80">{n.etiqueta}</span>
              <h3 className="mt-3 text-[0.95rem] font-semibold leading-snug text-champagne">{n.titulo}</h3>
              <span className="mt-auto flex items-center gap-1.5 text-xs text-champagne/60 transition group-hover:text-oro">
                {n.cta}
                <Icono nombre="flecha" className="h-3 w-3 transition-transform group-hover:translate-x-1" grosor={2} />
              </span>
            </div>
            <Foto foto={n.foto} alt={n.titulo} arte={n.arte} tono={n.tono} className="absolute inset-y-0 right-0 w-[48%]" claseArte="w-[78%]" />
            <div className="pointer-events-none absolute inset-y-0 left-[40%] w-[20%] bg-gradient-to-r from-carbon to-transparent" />
          </motion.a>
        ))}
      </div>
    </section>
  )
}

export function ListaDifusion() {
  const [nombre, setNombre] = useState('')
  const enviar = (e) => {
    e.preventDefault()
    const txt = `¡Hola EL MUNDO! ${nombre ? `Soy ${nombre}. ` : ''}Quiero sumarme a la lista de novedades para enterarme primero de los ingresos y promos.`
    window.open(`https://wa.me/${whatsapps[0].numero}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener')
  }
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
        className="flex flex-col gap-6 rounded-2xl border border-champagne/10 bg-carbon p-7 md:flex-row md:items-center md:justify-between md:p-10"
      >
        <div>
          <h2 className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-champagne md:text-xl">Enterate primero</h2>
          <p className="mt-2 max-w-md text-sm text-champagne/60">Sumate a la lista de WhatsApp y recibí los ingresos nuevos, promos y sorteos antes que nadie.</p>
        </div>
        <form onSubmit={enviar} className="flex w-full max-w-lg overflow-hidden rounded-lg border border-champagne/15 bg-noche focus-within:border-oro">
          <label htmlFor="lista-nombre" className="sr-only">Tu nombre</label>
          <input id="lista-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-champagne placeholder:text-champagne/35 focus:outline-none" />
          <button type="submit" className="bg-gradient-to-b from-[#f6c766] to-[#c98a23] px-5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-noche transition hover:brightness-110">
            Sumarme
          </button>
        </form>
      </motion.div>
    </section>
  )
}
