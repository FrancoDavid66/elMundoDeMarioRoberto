import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBolsa } from '../hooks/bolsa'
import { useScrollSuave } from '../hooks/scroll'
import { locales } from '../data/tienda'
import ArteProducto from './ArteProducto'

// Bolsa lateral: arma el pedido y lo manda por WhatsApp al local elegido
export default function Bolsa() {
  const { items, cambiar, vaciar, total, abierta, setAbierta } = useBolsa()
  const lenis = useScrollSuave()
  const [local, setLocal] = useState(locales[0].id)
  const [nombre, setNombre] = useState('')

  useEffect(() => {
    if (!lenis) return
    abierta ? lenis.stop() : lenis.start()
  }, [abierta, lenis])

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setAbierta(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [setAbierta])

  const elegido = locales.find((l) => l.id === local)
  const mensaje = [
    `¡Hola EL MUNDO! 👋${nombre ? ` Soy ${nombre}.` : ''}`,
    `Quiero consultar por este pedido (${elegido.nombre}):`,
    '',
    ...items.map((i) => `• ${i.cantidad} x ${i.producto.nombre} — talle ${i.talle}`),
    '',
    '¿Tienen stock? ¿Precio final? Gracias!',
  ].join('\n')
  const enlace = `https://wa.me/${elegido.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`

  return (
    <AnimatePresence>
      {abierta && (
        <>
          <motion.div className="fixed inset-0 z-[80] bg-noche/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAbierta(false)} />
          <motion.aside
            className="fixed bottom-0 right-0 top-0 z-[90] flex w-full max-w-md flex-col border-l border-champagne/10 bg-carbon"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
            role="dialog"
            aria-label="Tu bolsa"
          >
            <div className="flex items-center justify-between border-b border-champagne/10 p-6">
              <div>
                <p className="etiqueta text-oro">Tu bolsa</p>
                <p className="mt-1 font-display text-2xl font-bold text-champagne">{total} {total === 1 ? 'prenda' : 'prendas'}</p>
              </div>
              <button onClick={() => setAbierta(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/15 text-champagne transition hover:rotate-90 hover:border-oro" aria-label="Cerrar">
                ✕
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-6">
              {items.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="h-20 w-20 rounded-full border border-dashed border-oro/40" />
                  <p className="mt-6 font-display text-lg text-champagne">Tu bolsa está vacía</p>
                  <p className="mt-2 text-sm text-champagne/50">Elegí talle y sumá lo que te guste.</p>
                </div>
              )}
              <AnimatePresence initial={false}>
                {items.map((i) => (
                  <motion.div key={i.clave} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40, height: 0 }} className="flex items-center gap-4 rounded-2xl bg-grafito p-3">
                    <div className="h-16 w-16 shrink-0 rounded-xl bg-noche p-2">
                      <ArteProducto tipo={i.producto.arte} tono={i.producto.tono} className="h-full w-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-champagne">{i.producto.nombre}</p>
                      <p className="text-xs text-champagne/50">Talle {i.talle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => cambiar(i.clave, -1)} className="h-8 w-8 rounded-full border border-champagne/15 text-champagne">−</button>
                      <span className="w-4 text-center text-sm text-champagne">{i.cantidad}</span>
                      <button onClick={() => cambiar(i.clave, 1)} className="h-8 w-8 rounded-full border border-champagne/15 text-champagne">+</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <div className="space-y-4 border-t border-champagne/10 p-6">
                <div>
                  <p className="etiqueta mb-3 text-champagne/50">¿A qué local?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {locales.map((l) => (
                      <button key={l.id} onClick={() => setLocal(l.id)} className={`rounded-xl border px-3 py-3 text-left text-xs transition ${local === l.id ? 'border-oro bg-oro/10 text-champagne' : 'border-champagne/10 text-champagne/60'}`}>
                        <span className="block font-semibold">{l.direccion}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre (opcional)" className="w-full rounded-xl border border-champagne/10 bg-noche px-4 py-3 text-sm text-champagne placeholder:text-champagne/30 focus:border-oro focus:outline-none" />
                <a href={enlace} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-3 rounded-full bg-oro py-4 font-bold text-noche transition hover:bg-champagne">
                  Enviar pedido por WhatsApp
                </a>
                <button onClick={vaciar} className="w-full text-xs text-champagne/40 hover:text-champagne">Vaciar bolsa</button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
