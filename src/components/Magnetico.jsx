import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Envuelve cualquier botón y lo "imanta" al cursor
export default function Magnetico({ children, fuerza = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const mover = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * fuerza)
    y.set((e.clientY - (r.top + r.height / 2)) * fuerza)
  }
  const salir = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div ref={ref} onPointerMove={mover} onPointerLeave={salir} style={{ x: sx, y: sy }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  )
}
