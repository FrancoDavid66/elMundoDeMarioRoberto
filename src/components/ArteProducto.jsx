// Ilustraciones vectoriales de las prendas (se reemplazan por fotos reales
// cargando "imagen" en src/data/tienda.js)

const tonos = {
  oro: { a: '#f2b138', b: '#7a3f07', linea: '#ffe3a3' },
  celeste: { a: '#9cc7ee', b: '#2c5a86', linea: '#ffffff' },
  grafito: { a: '#3a332a', b: '#0e0c0a', linea: '#f2b138' },
  champagne: { a: '#f6e7c8', b: '#9b8156', linea: '#7a3f07' },
}

const formas = {
  remera: 'M60 30 L85 18 Q100 30 115 18 L140 30 L168 62 L148 78 L138 68 L138 170 L62 170 L62 68 L52 78 L32 62 Z',
  buzo: 'M58 34 Q80 12 100 22 Q120 12 142 34 L170 70 L172 150 L152 152 L146 84 L142 172 L58 172 L54 84 L48 152 L28 150 L30 70 Z',
  campera: 'M62 30 L86 18 L100 30 L114 18 L138 30 L168 64 L170 156 L150 158 L144 80 L142 172 L58 172 L56 80 L50 158 L30 156 L32 64 Z',
  gorra: 'M42 118 Q44 60 100 56 Q156 60 158 118 Z M40 118 L176 118 Q186 126 174 134 L40 132 Z',
  short: 'M52 50 L148 50 L160 150 L112 154 L100 96 L88 154 L40 150 Z',
}

export default function ArteProducto({ tipo = 'remera', tono = 'oro', className = '' }) {
  const t = tonos[tono] || tonos.oro
  const id = `${tipo}-${tono}`
  const d = formas[tipo] || formas.remera
  const esCeleste = tono === 'celeste' && tipo === 'remera'

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.a} />
          <stop offset="1" stopColor={t.b} />
        </linearGradient>
        <clipPath id={`c-${id}`}>
          <path d={d} />
        </clipPath>
        <radialGradient id={`luz-${id}`} cx="35%" cy="25%" r="70%">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="186" rx="62" ry="6" fill="#000" opacity=".5" />
      <path d={d} fill={`url(#g-${id})`} />
      <g clipPath={`url(#c-${id})`}>
        {esCeleste && [70, 92, 114, 136].map((x) => <rect key={x} x={x - 7} y="0" width="11" height="200" fill="#fff" opacity=".85" />)}
        {tipo === 'campera' && <rect x="98.5" y="20" width="3" height="160" fill={t.linea} opacity=".8" />}
        {(tipo === 'campera' || tipo === 'short') && (
          <>
            <rect x="30" y="0" width="4" height="200" fill={t.linea} opacity=".7" />
            <rect x="166" y="0" width="4" height="200" fill={t.linea} opacity=".7" />
          </>
        )}
        {tipo === 'buzo' && <path d="M72 120 h56 v30 h-56z" fill="none" stroke={t.linea} strokeOpacity=".4" />}
        <rect width="200" height="200" fill={`url(#luz-${id})`} />
      </g>
      {/* mini globo bordado */}
      {tipo !== 'short' && (
        <g transform={tipo === 'gorra' ? 'translate(100 88)' : 'translate(100 76)'} opacity=".9">
          <circle r="9" fill="none" stroke={t.linea} strokeWidth="1.3" />
          <ellipse rx="4" ry="9" fill="none" stroke={t.linea} strokeWidth="1" />
          <path d="M-9 0h18" stroke={t.linea} strokeWidth="1" />
        </g>
      )}
      <path d={d} fill="none" stroke={t.linea} strokeOpacity=".25" />
    </svg>
  )
}
