import ArteProducto from './ArteProducto'

// Muestra la foto real si existe; si no, un "set de estudio" con la ilustración:
// fondo oscuro, luz cenital cálida y reflejo en el piso.
export default function Foto({ foto, alt = '', arte = 'remera', tono = 'oro', className = '', claseArte = 'w-[62%]', fondo = 'oscuro', posicion = 'center' }) {
  const pos = className.includes('absolute') ? '' : 'relative'
  if (foto) {
    return (
      <div className={`${pos} overflow-hidden ${className}`}>
        <img src={foto} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" style={{ objectPosition: posicion }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noche/50 via-transparent to-transparent" />
      </div>
    )
  }

  const fondos = {
    oscuro: 'radial-gradient(ellipse at 50% 28%, #2a2118 0%, #120f0c 55%, #0a0806 100%)',
    claro: 'radial-gradient(ellipse at 60% 30%, #efe6d6 0%, #cfc2ac 60%, #a8977b 100%)',
    oro: 'radial-gradient(ellipse at 60% 30%, #d8b27a 0%, #9b7445 55%, #5b3f1f 100%)',
    bronce: 'radial-gradient(ellipse at 60% 30%, #8a6446 0%, #4d3525 55%, #241a13 100%)',
  }

  return (
    <div className={`${pos} flex items-center justify-center overflow-hidden ${className}`} style={{ background: fondos[fondo] || fondos.oscuro }} role="img" aria-label={alt}>
      {/* tela / textura */}
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 9px)' }} />
      {/* luz cenital */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[70%] w-[80%] -translate-x-1/2 opacity-60" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,214,150,0.35), transparent 70%)' }} />
      <div className={`relative ${claseArte} transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.04]`}>
        <ArteProducto tipo={arte} tono={tono} className="w-full drop-shadow-[0_30px_35px_rgba(0,0,0,0.55)]" />
      </div>
    </div>
  )
}
