// ============================================================
//  EL MUNDO — datos editables de la tienda
//  Todo lo que el cliente puede cambiar está acá.
//  FOTOS: guardalas en src/assets/fotos/, importalas arriba
//  (import miFoto from '../assets/fotos/archivo.webp') y usala en "foto".
//  Si foto es null se muestra la ilustración dorada.
// ============================================================

import fotoLogo from '../assets/fotos/logo.webp'
import fotoLocal from '../assets/fotos/local.webp'
import fotoCamiseta from '../assets/fotos/camiseta.webp'
import fotoAlbum from '../assets/fotos/album.webp'
import evento1 from '../assets/fotos/evento1.webp'
import evento2 from '../assets/fotos/evento2.webp'
import evento3 from '../assets/fotos/evento3.webp'
import evento4 from '../assets/fotos/evento4.webp'
import evento5 from '../assets/fotos/evento5.webp'
import evento6 from '../assets/fotos/evento6.webp'

export const logo = fotoLogo

export const marca = {
  nombre: 'EL MUNDO',
  firma: 'de Mario Roberto',
  bajada: 'Ropa, estilo y la camiseta siempre puesta.',
  seguidores: 9858,
  instagram: 'https://www.instagram.com/elmundodemarioroberto_/',
  instagramUser: '@elmundodemarioroberto_',
  tiktok: 'https://www.tiktok.com/@elmundodemarioroberto',
  tiktokUser: '@elmundodemarioroberto',
}

// Formato wa.me: 549 + código de área sin 0 + número sin 15
export const whatsapps = [
  { etiqueta: 'WhatsApp 1', numero: '5491122816444', visible: '11 2281-6444' },
  { etiqueta: 'WhatsApp 2', numero: '5491127245748', visible: '11 2724-5748' },
]

// PENDIENTE: confirmar qué WhatsApp atiende cada local y los horarios
export const locales = [
  {
    id: 'simon-perez',
    nombre: 'Local Simón Pérez',
    direccion: 'Av. Simón Pérez 4420',
    zona: 'Buenos Aires',
    horario: 'Lun a Sáb · consultar horario',
    whatsapp: whatsapps[0],
    mapa: 'https://www.google.com/maps/search/?api=1&query=Av.+Sim%C3%B3n+P%C3%A9rez+4420',
  },
  {
    id: 'posamay',
    nombre: 'Local Posamay',
    direccion: 'Av. Posamay 539',
    zona: 'Buenos Aires',
    horario: 'Lun a Sáb · consultar horario',
    whatsapp: whatsapps[1],
    mapa: 'https://www.google.com/maps/search/?api=1&query=Av.+Posamay+539',
  },
]

// Fila de categorías con íconos (icono: remera | buzo | campera | conjunto | gorra | mochila | estrella)
export const categorias = [
  { id: 'camisetas', nombre: 'Camisetas', icono: 'remera' },
  { id: 'buzos', nombre: 'Buzos', icono: 'buzo' },
  { id: 'camperas', nombre: 'Camperas', icono: 'campera' },
  { id: 'conjuntos', nombre: 'Conjuntos', icono: 'conjunto' },
  { id: 'gorras', nombre: 'Gorras', icono: 'gorra' },
  { id: 'accesorios', nombre: 'Accesorios', icono: 'mochila' },
  { id: 'nuevos', nombre: 'Nuevos ingresos', icono: 'estrella' },
]

// Las 3 tarjetas grandes debajo de las categorías
export const promos = [
  { id: 'pr1', etiqueta: 'Nuevo', titulo: 'Camisetas\nde Selección', bajada: 'Titular, suplente y retro.\nTodos los talles.', cta: 'Ver camisetas', fondo: 'claro', arte: 'remera', tono: 'celeste', foto: fotoCamiseta },
  { id: 'pr2', etiqueta: 'Más vendido', titulo: 'Buzos\nOversize', bajada: 'Calce amplio.\nAbrigo de verdad.', cta: 'Descubrir', fondo: 'oro', arte: 'buzo', tono: 'grafito', foto: null },
  { id: 'pr3', etiqueta: 'Edición limitada', titulo: 'Gorras\nEl Mundo', bajada: 'Bordado en dorado.\nPocas unidades.', cta: 'Consultar', fondo: 'bronce', arte: 'gorra', tono: 'champagne', foto: null },
]

// Grilla "Más vendidos". precio: null => "Consultar"
// PENDIENTE: reemplazar por productos, precios y fotos reales del cliente
export const productos = [
  { id: 'p1', nombre: 'Camiseta Albiceleste', categoria: 'Camisetas', precio: null, arte: 'remera', tono: 'celeste', etiqueta: 'Más pedido', talles: ['S', 'M', 'L', 'XL', 'XXL'], foto: null },
  { id: 'p2', nombre: 'Buzo Oversize Globo', categoria: 'Buzos', precio: null, arte: 'buzo', tono: 'oro', etiqueta: 'Nuevo', talles: ['S', 'M', 'L', 'XL'], foto: null },
  { id: 'p3', nombre: 'Campera Track Noche', categoria: 'Camperas', precio: null, arte: 'campera', tono: 'grafito', etiqueta: null, talles: ['M', 'L', 'XL'], foto: null },
  { id: 'p4', nombre: 'Gorra Mundo Bordada', categoria: 'Gorras', precio: null, arte: 'gorra', tono: 'oro', etiqueta: 'Limitada', talles: ['Único'], foto: null },
  { id: 'p5', nombre: 'Camiseta Retro 86', categoria: 'Camisetas', precio: null, arte: 'remera', tono: 'champagne', etiqueta: 'Retro', talles: ['S', 'M', 'L', 'XL'], foto: null },
  { id: 'p6', nombre: 'Short Training', categoria: 'Conjuntos', precio: null, arte: 'short', tono: 'grafito', etiqueta: null, talles: ['S', 'M', 'L', 'XL'], foto: null },
  { id: 'p7', nombre: 'Campera Dorada', categoria: 'Camperas', precio: null, arte: 'campera', tono: 'oro', etiqueta: 'Nuevo', talles: ['M', 'L', 'XL'], foto: null },
  { id: 'p8', nombre: 'Buzo Noche', categoria: 'Buzos', precio: null, arte: 'buzo', tono: 'grafito', etiqueta: null, talles: ['S', 'M', 'L', 'XL'], foto: null },
]

// Banner de promo. PENDIENTE: confirmar la promo real con el cliente
export const bannerPromo = {
  arriba: 'Nueva temporada · Ya en los locales',
  titulo: 'Llevate el look\ncompleto',
  bajada: 'Armá tu combo de camiseta, buzo y gorra y consultá el precio especial por WhatsApp.',
  cta: 'Consultar promo',
  mensaje: '¡Hola EL MUNDO! Quiero consultar por la promo del look completo.',
  foto: fotoLocal,
}

// "Lo nuevo en EL MUNDO" (3 tarjetas editoriales)
export const novedades = [
  { id: 'n1', etiqueta: 'Guía', titulo: 'Cómo elegir el talle de tu camiseta', cta: 'Preguntanos', url: `https://wa.me/${whatsapps[0].numero}?text=${encodeURIComponent('¡Hola! Quiero que me ayuden a elegir el talle de una camiseta.')}`, arte: 'remera', tono: 'celeste', foto: null },
  { id: 'n2', etiqueta: 'Recomendado', titulo: 'Los 5 buzos que más salen esta temporada', cta: 'Ver en Instagram', url: marca.instagram, arte: 'buzo', tono: 'oro', foto: null },
  { id: 'n3', etiqueta: 'En el local', titulo: 'Figuritas, sorteos y visitas: seguí la movida', cta: 'Ver en TikTok', url: marca.tiktok, arte: 'gorra', tono: 'champagne', foto: fotoAlbum },
]

// Fila de beneficios (solo cosas que el local cumple de verdad)
export const beneficios = [
  { icono: 'chat', titulo: 'Atención por WhatsApp', texto: 'Respuesta rápida' },
  { icono: 'pin', titulo: '2 locales', texto: 'Vení a probártelo' },
  { icono: 'estrella', titulo: 'Ingresos semanales', texto: 'Siempre lo último' },
  { icono: 'escudo', titulo: 'Asesoramiento', texto: 'Talle y calce justo' },
]

// Galería de la comunidad (fotos de eventos en el local)
export const galeria = [evento6, evento1, evento4, evento2, evento3, evento5]

export const manifiesto =
  'Más que un local, un punto de encuentro. Acá se viene a probarse la camiseta, a completar el álbum, a sacarse la foto y a llevarse el look del barrio al mundo entero.'

// Rutas del globo 3D: salen de Buenos Aires hacia estas ciudades
export const rutasGlobo = [
  [40.71, -74.0],   // Nueva York
  [40.42, -3.7],    // Madrid
  [48.85, 2.35],    // París
  [-23.55, -46.63], // San Pablo
  [19.43, -99.13],  // CDMX
  [25.2, 55.27],    // Dubái
  [35.68, 139.69],  // Tokio
  [51.5, -0.12],    // Londres
]
export const baseGlobo = [-34.66, -58.56] // Buenos Aires (zona oeste)
