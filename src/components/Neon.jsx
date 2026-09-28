// Texto en tubo de neón dorado: arranca apagado y se prende titilando letra por letra
export default function Neon({ texto, encendido = true, className = '', retraso = 0, paso = 0.11, zumbido = [] , as: Tag = 'span' }) {
  let n = 0
  return (
    <Tag className={`neon ${className}`} aria-label={texto}>
      {texto.split('').map((l, i) => {
        if (l === ' ') return <span key={i} className="inline-block w-[0.3em]" aria-hidden="true" />
        const d = retraso + (n++) * paso + (i % 3) * 0.05
        return (
          <span
            key={i}
            aria-hidden="true"
            className={`neon-letra ${encendido ? 'on' : ''} ${zumbido.includes(i) ? 'zumba' : ''}`}
            style={{ animationDelay: zumbido.includes(i) ? `${d}s, ${d + 2.5}s` : `${d}s` }}
          >
            {l}
          </span>
        )
      })}
    </Tag>
  )
}
