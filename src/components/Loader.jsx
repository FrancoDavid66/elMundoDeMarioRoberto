import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Neon from './Neon'
import { logo } from '../data/tienda'

// Pantalla de carga: contador 0-100 + nombre que se arma letra por letra
export default function Loader({ alTerminar }) {
  const [n, setN] = useState(0)
  const [fuera, setFuera] = useState(false)

  useEffect(() => {
    const inicio = performance.now()
    const dur = 2000
    let raf
    const tick = (t) => {
      const p = Math.min((t - inicio) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setN(Math.round(e * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setFuera(true), 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const letras = 'EL MUNDO'.split('')

  return (
    <AnimatePresence onExitComplete={alTerminar}>
      {!fuera && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-noche"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative mb-8 h-24 w-24">
            <motion.div className="absolute -inset-2 rounded-full border border-dashed border-oro/50" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }} />
            <motion.img src={logo} alt="" className="h-full w-full rounded-full" animate={{ opacity: [0.75, 1, 0.75] }} transition={{ repeat: Infinity, duration: 2.2 }} style={{ boxShadow: '0 0 40px rgba(242,177,56,0.45)' }} />
          </div>

          <Neon texto="EL MUNDO" retraso={0.15} paso={0.09} className="text-5xl sm:text-7xl" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="etiqueta mt-4 text-oro/80">
            de Mario Roberto
          </motion.p>

          <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between sm:bottom-10 sm:left-10 sm:right-10">
            <span className="etiqueta text-champagne/40">Cargando el mundo</span>
            <span className="font-display text-5xl font-light tabular-nums text-champagne sm:text-7xl">
              {String(n).padStart(3, '0')}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 h-px w-full bg-champagne/10">
            <div className="h-full bg-gradient-to-r from-brasa to-oro" style={{ width: `${n}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
