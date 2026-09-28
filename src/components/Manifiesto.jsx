import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { manifiesto } from '../data/tienda'

function Palabra({ texto, progreso, rango, destacada }) {
  const op = useTransform(progreso, rango, [0.12, 1])
  const blur = useTransform(progreso, rango, ['blur(6px)', 'blur(0px)'])
  return (
    <motion.span style={{ opacity: op, filter: blur }} className={`mr-[0.25em] inline-block ${destacada ? 'neon-suave' : ''}`}>
      {texto}
    </motion.span>
  )
}

// Texto que se "enciende" palabra por palabra a medida que scrolleás
export default function Manifiesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  const palabras = manifiesto.split(' ')
  const clave = ['encuentro.', 'camiseta,', 'mundo']

  return (
    <section ref={ref} className="relative mx-auto max-w-7xl px-5 pb-8 pt-28 sm:px-8 md:pt-40">
      <p className="etiqueta mb-10 flex items-center gap-3 text-oro">
        <span className="h-px w-10 bg-oro" /> Nuestro mundo
      </p>
      <p className="font-display text-[7.2vw] font-semibold leading-[1.15] tracking-[-0.03em] text-champagne md:text-[3.9vw]">
        {palabras.map((p, i) => {
          const ini = i / palabras.length
          return <Palabra key={i} texto={p} progreso={scrollYProgress} rango={[ini, ini + 1 / palabras.length]} destacada={clave.includes(p)} />
        })}
      </p>
    </section>
  )
}
