# EL MUNDO — web premium

Stack: Vite + React + Tailwind + Framer Motion + Lenis + Three.js (globo 3D).

## Arrancar
npm install
npm run dev

## Publicar (Vercel)
npm run build  → subir a Vercel (framework: Vite, output: dist)

## Editar contenido
Todo en `src/data/tienda.js`: WhatsApps, locales, horarios, colecciones, productos, precios y fotos.
- Fotos: guardarlas en `src/assets/fotos/`, importarlas arriba de `tienda.js` y usarlas en el campo `foto`.
- `precio: null` muestra "Consultar precio".

## Pendiente con el cliente
- Horarios de cada local y qué WhatsApp atiende cada uno
- Confirmar dirección "Av. Posamay 539" y localidad de ambos locales
- Productos, precios y fotos reales
- Dominio definitivo
