// Íconos de línea finos para categorías y beneficios
const trazos = {
  remera: <path d="M8 4 5 6 3 10l3 1.5V20h12v-8.5L21 10l-2-4-3-2c-.6 1.3-2.1 2-4 2S8.6 5.3 8 4Z" />,
  buzo: (
    <>
      <path d="M8 4c1 1.6 2.4 2.4 4 2.4S15 5.6 16 4l3.5 3L21 18h-2.5L17.5 11v9h-11v-9L5.5 18H3L4.5 7Z" />
      <path d="M9 15h6" />
    </>
  ),
  campera: (
    <>
      <path d="M8 4 5 6 3 18h3l1-7v9h10v-9l1 7h3L19 6l-3-2-4 3-4-3Z" />
      <path d="M12 7v13" />
    </>
  ),
  conjunto: (
    <>
      <path d="M8 3 6 4.5 4.5 8 6.5 9V13h11V9l2-1-1.5-3.5L16 3c-.5 1-2 1.6-4 1.6S8.5 4 8 3Z" />
      <path d="M7.5 14h9l.8 7h-3.8L12 17l-1.5 4H6.7Z" />
    </>
  ),
  gorra: (
    <>
      <path d="M4 15c0-4.8 3.6-8 8-8s8 3.2 8 8Z" />
      <path d="M3 15h14c2.5 0 4 .7 4 1.5S19.5 18 17 18H3Z" />
      <path d="M12 7V5.5" />
    </>
  ),
  mochila: (
    <>
      <rect x="5" y="7" width="14" height="13" rx="4" />
      <path d="M9 7V5.5a3 3 0 0 1 6 0V7M8 13h8" />
    </>
  ),
  estrella: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />,
  chat: (
    <>
      <path d="M4 18.5 5 15a7.5 7.5 0 1 1 3.2 3Z" />
      <path d="M9 11.5h.01M12.5 11.5h.01M16 11.5h.01" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  escudo: (
    <>
      <path d="M12 3 5 6v5.5c0 4.4 3 7.8 7 9.5 4-1.7 7-5.1 7-9.5V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  bolsa: (
    <>
      <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  flecha: <path d="M5 12h14M13 6l6 6-6 6" />,
}

export default function Icono({ nombre, className = 'h-6 w-6', grosor = 1.3 }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {trazos[nombre] || trazos.estrella}
    </svg>
  )
}
