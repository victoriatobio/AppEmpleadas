import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* ─── Imágenes de la mascota ───────────────────────────────────────────────── */
function MascotImg({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full max-w-[150px] mx-auto drop-shadow-md select-none"
      draggable={false}
    />
  )
}

/* ─── SVG fallback (se muestra si la imagen no carga) ────────────────────── */
/* Cuerpo compartido de la llave */
function KeyBody() {
  return (
    <>
      {/* Varilla (shaft) */}
      <rect x="109" y="110" width="22" height="106" rx="7" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.8"/>
      {/* Dientes */}
      <rect x="131" y="140" width="13" height="10" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5"/>
      <rect x="131" y="156" width="19" height="10" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5"/>
      <rect x="131" y="172" width="13" height="10" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5"/>
      {/* Cabeza (bow) — encima para tapar el top de la varilla */}
      <circle cx="120" cy="66" r="45" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2"/>
      {/* Agujero */}
      <circle cx="120" cy="66" r="16" fill="white" stroke="#1D4ED8" strokeWidth="2"/>
      {/* Brillo */}
      <ellipse cx="107" cy="46" rx="11" ry="7" fill="white" opacity="0.22" transform="rotate(-28 107 46)"/>
    </>
  )
}

/* Cara compartida */
function KeyFace() {
  return (
    <>
      {/* Cejas */}
      <path d="M108 57 Q112 54 117 56" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M123 56 Q128 54 132 57" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Ojos */}
      <circle cx="111" cy="63" r="4.5" fill="#1E293B"/>
      <circle cx="129" cy="63" r="4.5" fill="#1E293B"/>
      {/* Brillo ojos */}
      <circle cx="113" cy="61" r="1.8" fill="white"/>
      <circle cx="131" cy="61" r="1.8" fill="white"/>
      {/* Sonrisa */}
      <path d="M110 76 Q120 85 130 76" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      {/* Cachetes */}
      <ellipse cx="106" cy="74" rx="5.5" ry="3.5" fill="#FCA5A5" opacity="0.6"/>
      <ellipse cx="134" cy="74" rx="5.5" ry="3.5" fill="#FCA5A5" opacity="0.6"/>
    </>
  )
}

/* Piernas y zapatillas compartidas */
function KeyLegs() {
  return (
    <>
      <rect x="100" y="213" width="12" height="20" rx="4.5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5"/>
      <rect x="116" y="213" width="12" height="20" rx="4.5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5"/>
      {/* Zapatillas */}
      <rect x="91"  y="229" width="24" height="13" rx="6.5" fill="white" stroke="#D1D5DB" strokeWidth="1.5"/>
      <rect x="113" y="229" width="24" height="13" rx="6.5" fill="white" stroke="#D1D5DB" strokeWidth="1.5"/>
    </>
  )
}

/* Brazo genérico con efecto de volumen */
function Arm({ d }) {
  return (
    <>
      <path d={d} stroke="#1D4ED8" strokeWidth="13" strokeLinecap="round" fill="none"/>
      <path d={d} stroke="#3B82F6" strokeWidth="9"  strokeLinecap="round" fill="none"/>
    </>
  )
}

/* ── Pose 1: Saludando con la mano en alto ────────────────────────────────── */
function KeyWaving() {
  return (
    <svg viewBox="0 0 240 260" fill="none" className="w-full max-w-[200px] mx-auto drop-shadow-sm">
      {/* Fondo blob */}
      <ellipse cx="120" cy="200" rx="96" ry="52" fill="#EFF6FF"/>
      <ellipse cx="120" cy="196" rx="74" ry="40" fill="#DBEAFE"/>

      {/* Brazo izquierdo — relajado */}
      <Arm d="M109 124 Q82 140 66 162"/>
      <circle cx="63" cy="166" r="12" fill="white" stroke="#1D4ED8" strokeWidth="1.8"/>

      {/* Brazo derecho — saludando arriba */}
      <Arm d="M131 118 Q160 102 172 78"/>
      <circle cx="175" cy="74" r="12" fill="white" stroke="#1D4ED8" strokeWidth="1.8"/>
      {/* Destellos del saludo */}
      <path d="M181 62 Q188 54 185 66" stroke="#93C5FD" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M188 56 Q196 48 192 60" stroke="#93C5FD" strokeWidth="1.7" strokeLinecap="round" fill="none"/>
      <path d="M177 55 Q181 46 183 56" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

      <KeyBody />
      <KeyFace />
      <KeyLegs />
    </svg>
  )
}

/* ── Pose 2: Con lupa (Buscá) ─────────────────────────────────────────────── */
function KeySearching() {
  return (
    <svg viewBox="0 0 240 260" fill="none" className="w-full max-w-[200px] mx-auto drop-shadow-sm">
      <ellipse cx="120" cy="200" rx="96" ry="52" fill="#EFF6FF"/>
      <ellipse cx="120" cy="196" rx="74" ry="40" fill="#DBEAFE"/>

      {/* Brazo izquierdo — sostiene lupa */}
      <Arm d="M109 124 Q80 138 62 160"/>
      {/* Lupa */}
      <circle cx="50" cy="172" r="21" fill="white" stroke="#1D4ED8" strokeWidth="2.5"/>
      <circle cx="50" cy="172" r="15" fill="#DBEAFE" opacity="0.55"/>
      {/* Brillo lupa */}
      <circle cx="43" cy="163" r="5" fill="white" opacity="0.75"/>
      {/* Mango */}
      <line x1="63" y1="185" x2="78" y2="200" stroke="#1D4ED8" strokeWidth="5" strokeLinecap="round"/>

      {/* Brazo derecho — en la cintura */}
      <Arm d="M131 126 Q158 140 168 162"/>
      <circle cx="171" cy="166" r="12" fill="white" stroke="#1D4ED8" strokeWidth="1.8"/>

      <KeyBody />
      <KeyFace />
      <KeyLegs />
    </svg>
  )
}

/* ── Pose 3: Pulgar arriba (Disfrutá) ────────────────────────────────────── */
function KeyThumbsUp() {
  return (
    <svg viewBox="0 0 240 260" fill="none" className="w-full max-w-[200px] mx-auto drop-shadow-sm">
      <ellipse cx="120" cy="200" rx="96" ry="52" fill="#EFF6FF"/>
      <ellipse cx="120" cy="196" rx="74" ry="40" fill="#DBEAFE"/>

      {/* Brazo izquierdo — relajado */}
      <Arm d="M109 124 Q82 140 66 162"/>
      <circle cx="63" cy="166" r="12" fill="white" stroke="#1D4ED8" strokeWidth="1.8"/>

      {/* Brazo derecho — pulgar arriba */}
      <Arm d="M131 118 Q160 104 170 82"/>
      {/* Guante con pulgar */}
      <rect x="163" y="66" width="16" height="22" rx="8" fill="white" stroke="#1D4ED8" strokeWidth="1.8"/>
      <rect x="155" y="78" width="17" height="14" rx="6" fill="white" stroke="#1D4ED8" strokeWidth="1.8"/>
      {/* Destellos del pulgar arriba */}
      <path d="M180 64 Q187 56 184 68" stroke="#93C5FD" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M186 58 Q194 50 190 62" stroke="#93C5FD" strokeWidth="1.7" strokeLinecap="round" fill="none"/>

      <KeyBody />
      <KeyFace />
      <KeyLegs />
    </svg>
  )
}

/* ── Slide data ────────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 0,
    visual: <MascotImg src="/mascot/llave-casa.png" alt="Llave con casita" />,
    fallback: <KeyWaving />,
    eyebrow: 'Bienvenida a Kasei',
    title: 'El hogar en\nbuenas manos',
    desc: 'Conectamos empleadoras con empleadas de confianza en barrios cerrados de Buenos Aires.',
  },
  {
    id: 1,
    visual: <MascotImg src="/mascot/llave-lupa.png" alt="Llave con lupa" />,
    fallback: <KeySearching />,
    eyebrow: 'Búsqueda inteligente',
    title: 'Filtrá por lo que\nnecesitás',
    desc: 'Elegí las habilidades que buscás — limpieza, cocina, cuidado de niños — y encontrá a quien se adapta a tu hogar.',
  },
  {
    id: 2,
    visual: <MascotImg src="/mascot/llave-telefono.png" alt="Llave con teléfono" />,
    fallback: <KeyThumbsUp />,
    eyebrow: 'Simple y directo',
    title: 'Contacto\ndirecto',
    desc: 'Escribile a quien te interesa. Coordiná en minutos. Sin vueltas ni comisiones.',
  },
]

/* ── Onboarding component ──────────────────────────────────────────────────── */
export default function Onboarding() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [exiting, setExiting] = useState(false)

  function finish(path) {
    localStorage.setItem('kasei_onboarded', '1')
    navigate(path, { replace: true })
  }

  function next() {
    if (current < SLIDES.length - 1) {
      setExiting(true)
      setTimeout(() => {
        setCurrent(c => c + 1)
        setExiting(false)
      }, 180)
    } else {
      finish('/registro?rol=empleadora')
    }
  }

  function skip() {
    finish('/')
  }

  const slide = SLIDES[current]
  const isLast = current === SLIDES.length - 1

  return (
    <div className="fixed inset-0 bg-white flex flex-col overflow-hidden">
      {/* Skip */}
      <div className="flex justify-end p-5 pt-6 z-10">
        <button onClick={skip} className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors px-2 py-1">
          Omitir
        </button>
      </div>

      {/* Slide content */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-8 pb-4"
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'translateX(-24px)' : 'translateX(0)',
          transition: 'opacity 180ms ease, transform 180ms ease',
        }}
      >
        {/* Ilustración */}
        <div className="w-full max-w-xs flex items-center justify-center mb-8">
          {slide.visual}
        </div>

        {/* Texto */}
        <div className="text-center max-w-xs">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">
            {slide.eyebrow}
          </p>
          <h1 className="text-3xl font-bold text-zinc-900 leading-tight tracking-tight whitespace-pre-line mb-4">
            {slide.title}
          </h1>
          <p className="text-zinc-500 text-[15px] leading-relaxed">
            {slide.desc}
          </p>
        </div>
      </div>

      {/* Controles */}
      <div className="px-8 pb-10 pt-2 flex flex-col items-center gap-5">
        {/* Dots */}
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className="transition-all duration-200">
              <div className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-6 h-2 bg-blue-600' : 'w-2 h-2 bg-zinc-200 hover:bg-zinc-300'
              }`} />
            </button>
          ))}
        </div>

        {/* CTAs */}
        <div className="w-full max-w-xs space-y-2.5">
          <button
            onClick={next}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-2xl text-[15px] transition-all active:scale-[0.98]"
          >
            {isLast ? 'Empezar →' : 'Continuar'}
          </button>

          {isLast && (
            <button
              onClick={() => finish('/registro?rol=empleada')}
              className="w-full border border-zinc-200 hover:bg-zinc-50 text-zinc-600 font-medium py-3.5 rounded-2xl text-[15px] transition-all active:scale-[0.98]"
            >
              Busco trabajo
            </button>
          )}

          <button
            onClick={() => finish('/login')}
            className="w-full text-zinc-400 hover:text-zinc-600 font-medium py-2 text-sm transition-colors"
          >
            Ya tengo cuenta · <span className="text-blue-500">Ingresar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
