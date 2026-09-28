import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { marca, galeria } from '../data/tienda'
import Titulo from './Titulo'
import Marquesina from './Marquesina'

function Contador({ hasta }) {
  const ref = useRef(null)
  const visto = useInView(ref, { once: true, margin: '-20%' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!visto) return
    const c = animate(0, hasta, { duration: 2.4, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [visto, hasta])
  return <span ref={ref}>{v.toLocaleString('es-AR')}</span>
}

function Red({ nombre, usuario, url, icono, i }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      data-cursor="Seguir"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: i * 0.12, ease: [0.19, 1, 0.22, 1] }}
      className="borde-oro group relative flex items-center justify-between overflow-hidden rounded-3xl bg-carbon p-7 md:p-9"
    >
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-oro transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-y-100" />
      <div className="relative">
        <p className="etiqueta text-oro transition-colors group-hover:text-noche">{nombre}</p>
        <p className="mt-3 break-all font-display text-base font-semibold text-champagne transition-colors group-hover:text-noche sm:text-xl md:text-2xl">{usuario}</p>
      </div>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-champagne/15 text-champagne transition-all duration-500 group-hover:rotate-[-35deg] group-hover:border-noche group-hover:text-noche">
        {icono}
      </span>
    </motion.a>
  )
}

export default function Comunidad() {
  return (
    <section id="comunidad" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(242,177,56,0.35), transparent 60%)' }} />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <p className="etiqueta mb-6 flex items-center gap-3 text-oro">
          <span className="h-px w-10 bg-oro" /> Comunidad
        </p>
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="font-display text-[19vw] font-black leading-[0.85] tracking-[-0.05em] lg:text-[10vw]">
              <span className="neon-suave">
                +<Contador hasta={marca.seguidores} />
              </span>
            </p>
            <Titulo lineas={['personas siguen', 'el mundo']} className="mt-4 font-display text-3xl font-bold leading-tight text-champagne md:text-5xl" />
          </div>
          <div className="space-y-4">
            <p className="mb-8 text-lg leading-relaxed text-champagne/60">
              Eventos en el local, figuritas, sorteos, visitas y todos los ingresos antes que nadie. Si no nos seguís, te lo estás perdiendo.
            </p>
            <Red
              i={0}
              nombre="Instagram"
              usuario={marca.instagramUser}
              url={marca.instagram}
              icono={<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>}
            />
            <Red
              i={1}
              nombre="TikTok"
              usuario={marca.tiktokUser}
              url={marca.tiktok}
              icono={<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6Z" /></svg>}
            />
          </div>
        </div>
      </div>

      {/* Galería de eventos: cinta infinita de fotos */}
      <div className="relative mt-24 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-[galeria_45s_linear_infinite] gap-5 py-6 hover:[animation-play-state:paused]">
          {[...galeria, ...galeria].map((f, i) => (
            <a
              key={i}
              href={marca.instagram}
              target="_blank"
              rel="noreferrer"
              data-cursor="Ver"
              className={`group relative block h-72 w-56 shrink-0 overflow-hidden rounded-2xl transition-all duration-500 hover:rotate-0 hover:scale-105 galeria-foto md:h-96 md:w-72 ${i % 2 ? 'rotate-2' : '-rotate-2'}`}
            >
              <img src={f} alt="Evento en EL MUNDO" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-oro/30" />
            </a>
          ))}
        </div>
      </div>

      <Marquesina
        items={[marca.instagramUser, 'SEGUINOS', marca.tiktokUser, 'SUMATE AL MUNDO']}
        velocidad={1.6}
        invertida
        className="mt-28 border-y border-champagne/10 py-6 font-display text-4xl font-extrabold uppercase text-champagne md:text-7xl"
      />
    </section>
  )
}
