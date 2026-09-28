import { motion } from 'framer-motion'

// Título que entra línea por línea, con máscara
export default function Titulo({ lineas, className = '', as = 'h2', retraso = 0, claseLinea = '' }) {
  const Tag = motion[as]
  return (
    <Tag className={className} initial="oculto" whileInView="visible" viewport={{ once: true, margin: '-12% 0px' }}>
      {lineas.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${claseLinea}`}
            variants={{
              oculto: { y: '110%', rotate: 3 },
              visible: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: [0.19, 1, 0.22, 1], delay: retraso + i * 0.09 } },
            }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
