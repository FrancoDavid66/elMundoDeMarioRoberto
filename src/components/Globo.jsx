import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import tierra from '../data/tierra.json'
import { rutasGlobo, baseGlobo } from '../data/tienda'

// Convierte lat/lon a un punto sobre la esfera
function aVector(lat, lon, r = 1) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

const vertPuntos = /* glsl */ `
  attribute float aRand;
  uniform float uTime;
  uniform float uSize;
  uniform float uReveal;
  varying float vAlpha;
  varying float vMix;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * position);
    float frente = dot(n, normalize(-mv.xyz));
    vAlpha = smoothstep(-0.3, 0.5, frente) * 0.95 + 0.05;
    float brillo = 0.75 + 0.25 * sin(uTime * 1.7 + aRand * 60.0);
    float aparece = smoothstep(aRand - 0.08, aRand + 0.02, uReveal);
    vAlpha *= brillo * aparece;
    vMix = aRand;
    gl_PointSize = uSize * (0.75 + aRand * 0.55) * (1.0 + (1.0 - aparece) * 3.0) / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`
const fragPuntos = /* glsl */ `
  varying float vAlpha;
  varying float vMix;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float nucleo = smoothstep(0.5, 0.0, d);
    float halo = pow(nucleo, 2.4);
    vec3 oro = vec3(1.0, 0.72, 0.24);
    vec3 brasa = vec3(1.0, 0.48, 0.10);
    vec3 col = mix(oro, brasa, vMix * 0.8) + vec3(1.0, 0.9, 0.7) * halo * 0.55;
    gl_FragColor = vec4(col * 1.25, min(1.0, nucleo * 1.35) * vAlpha);
  }
`
const vertAtmos = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const fragAtmos = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    float f = pow(1.0 - abs(dot(vN, vV)), uPower);
    gl_FragColor = vec4(uColor, f * uIntensity);
  }
`
const vertArco = /* glsl */ `
  attribute float aT;
  varying float vT;
  void main() {
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const fragArco = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  uniform float uReveal;
  varying float vT;
  void main() {
    float cabeza = fract(uTime * 0.28 + uOffset);
    float cola = smoothstep(cabeza - 0.28, cabeza, vT) * step(vT, cabeza);
    float base = 0.10;
    float a = (base + cola * 0.95) * uReveal;
    vec3 col = mix(vec3(1.0, 0.62, 0.2), vec3(1.0, 0.95, 0.8), cola);
    gl_FragColor = vec4(col, a);
  }
`

export default function Globo({ activo = true, className = '' }) {
  const montaje = useRef(null)
  const activoRef = useRef(activo)
  activoRef.current = activo

  useEffect(() => {
    const el = montaje.current
    if (!el) return
    const movil = window.matchMedia('(max-width: 768px)').matches
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, movil ? 1.6 : 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const escena = new THREE.Scene()
    const camara = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camara.position.set(0, 0, 5.3)

    const pivote = new THREE.Group() // inclinación / mouse
    const globo = new THREE.Group() // rotación
    pivote.add(globo)
    escena.add(pivote)
    pivote.rotation.z = 0.18

    // ---- Esfera interior oscura (da cuerpo)
    const interior = new THREE.Mesh(
      new THREE.SphereGeometry(0.985, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x070504 })
    )
    globo.add(interior)

    // ---- Brillo interior (fresnel suave)
    const brilloInt = new THREE.Mesh(
      new THREE.SphereGeometry(0.99, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: vertAtmos,
        fragmentShader: fragAtmos,
        uniforms: { uColor: { value: new THREE.Color('#ff9a2a') }, uPower: { value: 3.4 }, uIntensity: { value: 0.28 } },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    globo.add(brilloInt)

    // ---- Continentes en puntos
    const paso = movil ? 2 : 1
    const pos = []
    const rnd = []
    for (let i = 0; i < tierra.length; i += 2 * paso) {
      const v = aVector(tierra[i] / 10, tierra[i + 1] / 10, 1.004)
      pos.push(v.x, v.y, v.z)
      rnd.push(Math.random())
    }
    const geoPuntos = new THREE.BufferGeometry()
    geoPuntos.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    geoPuntos.setAttribute('aRand', new THREE.Float32BufferAttribute(rnd, 1))
    const matPuntos = new THREE.ShaderMaterial({
      vertexShader: vertPuntos,
      fragmentShader: fragPuntos,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: (movil ? 26 : 25) * renderer.getPixelRatio() },
        uReveal: { value: reducido ? 1.2 : 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    globo.add(new THREE.Points(geoPuntos, matPuntos))

    // ---- Atmósfera exterior
    const atmos = new THREE.Mesh(
      new THREE.SphereGeometry(1.18, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: vertAtmos,
        fragmentShader: fragAtmos,
        uniforms: { uColor: { value: new THREE.Color('#ff8f1f') }, uPower: { value: 5.0 }, uIntensity: { value: 0.95 } },
        side: THREE.BackSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    pivote.add(atmos)

    // ---- Rutas desde Buenos Aires
    const origen = aVector(baseGlobo[0], baseGlobo[1], 1.005)
    const arcos = []
    rutasGlobo.forEach(([lat, lon], idx) => {
      const destino = aVector(lat, lon, 1.005)
      const dist = origen.distanceTo(destino)
      const medio = origen.clone().add(destino).multiplyScalar(0.5).normalize().multiplyScalar(1 + dist * 0.42)
      const curva = new THREE.QuadraticBezierCurve3(origen, medio, destino)
      const pts = curva.getPoints(90)
      const g = new THREE.BufferGeometry().setFromPoints(pts)
      g.setAttribute('aT', new THREE.Float32BufferAttribute(pts.map((_, i) => i / 90), 1))
      const m = new THREE.ShaderMaterial({
        vertexShader: vertArco,
        fragmentShader: fragArco,
        uniforms: { uTime: { value: 0 }, uOffset: { value: idx * 0.137 }, uReveal: { value: 0 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      globo.add(new THREE.Line(g, m))
      arcos.push(m)
    })

    // ---- Marcador Buenos Aires (celeste)
    const texPunto = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 128
      const x = c.getContext('2d')
      const gr = x.createRadialGradient(64, 64, 0, 64, 64, 64)
      gr.addColorStop(0, 'rgba(255,255,255,1)')
      gr.addColorStop(0.25, 'rgba(160,210,255,0.9)')
      gr.addColorStop(1, 'rgba(116,172,223,0)')
      x.fillStyle = gr
      x.fillRect(0, 0, 128, 128)
      return new THREE.CanvasTexture(c)
    })()
    const marcador = new THREE.Sprite(new THREE.SpriteMaterial({ map: texPunto, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }))
    marcador.position.copy(aVector(baseGlobo[0], baseGlobo[1], 1.02))
    marcador.scale.setScalar(0.09)
    globo.add(marcador)
    const pulso = new THREE.Mesh(
      new THREE.RingGeometry(0.02, 0.028, 48),
      new THREE.MeshBasicMaterial({ color: 0x74acdf, transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    pulso.position.copy(aVector(baseGlobo[0], baseGlobo[1], 1.012))
    pulso.lookAt(0, 0, 0)
    globo.add(pulso)

    // ---- Anillos orbitales con satélite
    const anillos = []
    ;[
      { r: 1.42, rx: 1.25, ry: 0.2, vel: 0.35 },
      { r: 1.62, rx: 1.45, ry: -0.5, vel: -0.22 },
    ].forEach(({ r, rx, ry, vel }) => {
      const grupo = new THREE.Group()
      grupo.rotation.set(rx, ry, 0)
      const curva = new THREE.EllipseCurve(0, 0, r, r)
      const g = new THREE.BufferGeometry().setFromPoints(curva.getPoints(200).map((p) => new THREE.Vector3(p.x, p.y, 0)))
      const linea = new THREE.LineLoop(g, new THREE.LineBasicMaterial({ color: 0xf2b138, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false }))
      grupo.add(linea)
      const sat = new THREE.Sprite(new THREE.SpriteMaterial({ map: texPunto, color: 0xffc46b, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }))
      sat.scale.setScalar(0.07)
      grupo.add(sat)
      pivote.add(grupo)
      anillos.push({ grupo, sat, r, vel, linea })
    })

    // ---- Polvo estelar
    const nEst = movil ? 350 : 800
    const est = new Float32Array(nEst * 3)
    for (let i = 0; i < nEst; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(3 + Math.random() * 6)
      est.set([v.x, v.y, v.z], i * 3)
    }
    const geoEst = new THREE.BufferGeometry()
    geoEst.setAttribute('position', new THREE.BufferAttribute(est, 3))
    const estrellas = new THREE.Points(
      geoEst,
      new THREE.PointsMaterial({ color: 0xf6e7c8, size: 0.012, transparent: true, opacity: 0.55, depthWrite: false })
    )
    escena.add(estrellas)

    // ---- Interacción: arrastrar + parallax
    let arrastrando = false
    let ultimoX = 0
    let velGiro = 0
    let objX = 0
    let objY = 0
    const alBajar = (e) => {
      arrastrando = true
      ultimoX = e.clientX
      el.setPointerCapture?.(e.pointerId)
    }
    const alMover = (e) => {
      const r = el.getBoundingClientRect()
      objX = ((e.clientX - r.left) / r.width - 0.5) * 2
      objY = ((e.clientY - r.top) / r.height - 0.5) * 2
      if (arrastrando) {
        velGiro += (e.clientX - ultimoX) * 0.00045
        ultimoX = e.clientX
      }
    }
    const alSoltar = () => (arrastrando = false)
    el.addEventListener('pointerdown', alBajar)
    window.addEventListener('pointermove', alMover, { passive: true })
    window.addEventListener('pointerup', alSoltar)

    // ---- Tamaño
    const ajustar = () => {
      const { width, height } = el.getBoundingClientRect()
      renderer.setSize(width, height, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camara.aspect = width / height
      camara.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(ajustar)
    ro.observe(el)
    ajustar()

    // ---- Visibilidad (pausa fuera de pantalla)
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 })
    io.observe(el)

    // Arranca mirando a Sudamérica
    globo.rotation.y = -0.6
    const reloj = new THREE.Clock()
    let reveal = reducido ? 1.2 : 0
    let raf
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      const dt = Math.min(reloj.getDelta(), 0.05)
      const t = reloj.elapsedTime

      if (activoRef.current && reveal < 1.2) reveal = Math.min(1.2, reveal + dt * 0.55)
      const rv = Math.min(reveal, 1)
      matPuntos.uniforms.uTime.value = t
      matPuntos.uniforms.uReveal.value = reveal
      arcos.forEach((m) => {
        m.uniforms.uTime.value = t
        m.uniforms.uReveal.value = Math.max(0, (reveal - 0.7) * 2)
      })

      // giro
      velGiro *= 0.94
      globo.rotation.y += (reducido ? 0 : dt * 0.09) + velGiro

      // parallax suave
      pivote.rotation.x += (objY * 0.18 - pivote.rotation.x) * 0.04
      pivote.rotation.y += (objX * 0.25 - pivote.rotation.y) * 0.04

      // entrada + scroll
      const scroll = Math.min(window.scrollY / window.innerHeight, 1.4)
      const escalaIn = 0.6 + 0.4 * (1 - Math.pow(1 - rv, 3))
      pivote.scale.setScalar(escalaIn * (1 + scroll * 0.25))
      pivote.position.y = scroll * 0.35
      camara.position.z = 5.3 - scroll * 0.7

      // pulso
      const p = (t * 0.8) % 1
      pulso.scale.setScalar(1 + p * 3.2)
      pulso.material.opacity = (1 - p) * 0.9 * rv
      marcador.material.opacity = rv

      anillos.forEach((a, i) => {
        const ang = t * a.vel + i
        a.sat.position.set(Math.cos(ang) * a.r, Math.sin(ang) * a.r, 0)
        a.linea.material.opacity = 0.16 * rv
        a.sat.material.opacity = rv
      })
      estrellas.rotation.y = t * 0.01
      atmos.material.uniforms.uIntensity.value = 0.95 * rv

      renderer.render(escena, camara)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      el.removeEventListener('pointerdown', alBajar)
      window.removeEventListener('pointermove', alMover)
      window.removeEventListener('pointerup', alSoltar)
      escena.traverse((o) => {
        o.geometry?.dispose?.()
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose())
      })
      texPunto.dispose()
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={montaje} className={`cursor-grab active:cursor-grabbing ${className}`} data-cursor="Girá" aria-hidden="true" />
}
