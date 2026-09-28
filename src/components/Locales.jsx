import { motion } from 'framer-motion'
import { locales } from '../data/tienda'
import Titulo from './Titulo'
import Magnetico from './Magnetico'

function Radar() {
  return (
    <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-60">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-oro/40"
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 3.6, delay: i * 1.2, ease: 'easeOut' }}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-oro shadow-[0_0_30px_8px_rgba(242,177,56,0.5)]" />
    </div>
  )
}

export default function Locales() {
  return (
    <section id="locales" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-40">
      <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="etiqueta mb-6 flex items-center gap-3 text-oro">
            <span className="h-px w-10 bg-oro" /> Locales
          </p>
          <Titulo lineas={['Vení a', 'probártelo']} className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-champagne md:text-7xl" />
        </div>
        <p className="max-w-sm text-champagne/60">Dos locales para que tengas EL MUNDO cerca. Te esperamos con el mate y la camiseta puesta.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {locales.map((l, i) => (
          <motion.article
            key={l.id}
            initial={{ opacity: 0, y: 60, clipPath: 'inset(20% 0 0 0 round 2rem)' }}
            whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0 round 2rem)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="borde-oro relative overflow-hidden rounded-[2rem] bg-carbon p-8 md:p-12"
          >
            <Radar />
            <span className="font-display text-sm font-light text-oro">Local 0{i + 1}</span>
            <h3 className="mt-10 font-display text-3xl font-extrabold leading-tight text-champagne md:text-5xl">{l.direccion}</h3>
            <p className="mt-3 text-champagne/50">{l.zona}</p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-champagne/10 pt-8 text-sm">
              <div>
                <dt className="etiqueta text-champagne/40">Horario</dt>
                <dd className="mt-2 text-champagne/80">{l.horario}</dd>
              </div>
              <div>
                <dt className="etiqueta text-champagne/40">WhatsApp</dt>
                <dd className="mt-2 text-champagne/80">{l.whatsapp.visible}</dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetico>
                <a href={l.mapa} target="_blank" rel="noreferrer" data-cursor="Ir" className="flex items-center gap-2 rounded-full bg-oro px-6 py-3.5 text-sm font-semibold text-noche transition hover:bg-champagne">
                  Cómo llegar
                </a>
              </Magnetico>
              <Magnetico>
                <a href={`https://wa.me/${l.whatsapp.numero}`} target="_blank" rel="noreferrer" className="rounded-full border border-champagne/20 px-6 py-3.5 text-sm font-medium text-champagne transition hover:border-oro hover:text-oro">
                  Escribir al local
                </a>
              </Magnetico>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
