import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

// Cursor propio: punto + aro que crece con etiqueta sobre elementos [data-cursor]
export default function Cursor() {
  const [habilitado, setHabilitado] = useState(false)
  const [etiqueta, setEtiqueta] = useState(null)
  const [hover, setHover] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ax = useSpring(x, { stiffness: 180, damping: 20, mass: 0.5 })
  const ay = useSpring(y, { stiffness: 180, damping: 20, mass: 0.5 })

  useEffect(() => {
    const fino = window.matchMedia('(pointer: fine)').matches
    if (!fino) return
    setHabilitado(true)
    document.body.classList.add('cursor-propio')
    const mover = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target.closest?.('[data-cursor], a, button')
      setHover(!!t)
      setEtiqueta(t?.getAttribute?.('data-cursor') || null)
    }
    window.addEventListener('pointermove', mover, { passive: true })
    return () => {
      window.removeEventListener('pointermove', mover)
      document.body.classList.remove('cursor-propio')
    }
  }, [x, y])

  if (!habilitado) return null
  const tam = etiqueta ? 84 : hover ? 56 : 34

  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-oro" style={{ x, y }} />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[119] flex items-center justify-center rounded-full border border-oro/60"
        style={{ x: ax, y: ay, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: tam, height: tam, backgroundColor: etiqueta ? 'rgba(242,177,56,1)' : 'rgba(242,177,56,0)' }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <AnimatePresence>
          {etiqueta && (
            <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="etiqueta !text-[0.55rem] !tracking-[0.2em] text-noche">
              {etiqueta}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
