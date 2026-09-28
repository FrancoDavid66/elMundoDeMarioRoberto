import { createContext, useContext } from 'react'

export const ScrollCtx = createContext(null)
export const useScrollSuave = () => useContext(ScrollCtx)

// Scroll a una sección (usa Lenis si está disponible)
export function irA(lenis, id) {
  const destino = document.getElementById(id)
  if (!destino) return
  if (lenis) lenis.scrollTo(destino, { offset: 0, duration: 1.6 })
  else destino.scrollIntoView({ behavior: 'smooth' })
}
