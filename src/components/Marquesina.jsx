import { useRef } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion'

const envolver = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

// Cinta infinita que acelera y cambia de sentido según el scroll
export default function Marquesina({ items, velocidad = 2.2, invertida = false, className = '' }) {
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useVelocity(scrollY)
  const suave = useSpring(vel, { damping: 50, stiffness: 400 })
  const factor = useTransform(suave, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(base, (v) => `${envolver(-25, 0, v)}%`)
  const dir = useRef(invertida ? -1 : 1)
  const skew = useTransform(suave, [-2000, 2000], [8, -8])

  useAnimationFrame((_, delta) => {
    let mov = dir.current * velocidad * (delta / 1000)
    if (factor.get() < 0) dir.current = invertida ? 1 : -1
    else if (factor.get() > 0) dir.current = invertida ? -1 : 1
    mov += dir.current * mov * factor.get()
    base.set(base.get() + mov)
  })

  const fila = (
    <span className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className={i % 2 ? 'contorno' : ''}>{t}</span>
          <span className="mx-6 inline-block text-oro md:mx-10">✦</span>
        </span>
      ))}
    </span>
  )

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max" style={{ x, skewX: skew }}>
        {fila}
        {fila}
        {fila}
        {fila}
      </motion.div>
    </div>
  )
}
