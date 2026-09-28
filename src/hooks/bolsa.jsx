import { createContext, useContext, useMemo, useState } from 'react'

const BolsaCtx = createContext(null)

export function BolsaProvider({ children }) {
  const [items, setItems] = useState([])
  const [abierta, setAbierta] = useState(false)

  const valor = useMemo(() => {
    const agregar = (producto, talle) => {
      setItems((prev) => {
        const clave = `${producto.id}-${talle}`
        const existe = prev.find((i) => i.clave === clave)
        if (existe) return prev.map((i) => (i.clave === clave ? { ...i, cantidad: i.cantidad + 1 } : i))
        return [...prev, { clave, producto, talle, cantidad: 1 }]
      })
    }
    const cambiar = (clave, delta) =>
      setItems((prev) =>
        prev
          .map((i) => (i.clave === clave ? { ...i, cantidad: i.cantidad + delta } : i))
          .filter((i) => i.cantidad > 0)
      )
    const vaciar = () => setItems([])
    const total = items.reduce((s, i) => s + i.cantidad, 0)
    return { items, agregar, cambiar, vaciar, total, abierta, setAbierta }
  }, [items, abierta])

  return <BolsaCtx.Provider value={valor}>{children}</BolsaCtx.Provider>
}

export const useBolsa = () => useContext(BolsaCtx)
