import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── Key Mascot helpers ────────────────────────────────────────────────────── */

/* Shared key body (bow + shaft + teeth) */
function KeyBody() {
  return (
    <>
      {/* Shaft */}
      <rect x="103" y="108" width="34" height="100" rx="10" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2"/>
      {/* Teeth */}
      <rect x="137" y="138" width="15" height="12" rx="3.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5"/>
      <rect x="137" y="156" width="21" height="12" rx="3.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5"/>
      <rect x="137" y="174" width="15" height="12" rx="3.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5"/>
      {/* Bow (head) — drawn last so it's on top of shaft */}
      <circle cx="120" cy="68" r="46" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2"/>
      {/* Hole */}
      <circle cx="120" cy="68" r="17" fill="white" stroke="#1D4ED8" strokeWidth="2"/>
      {/* Highlight */}
      <ellipse cx="108" cy="50" rx="11" ry="7" fill="white" opacity="0.22" transform="rotate(-25 108 50)"/>
    </>
  )
}

/* Shared face */
function KeyFace({ happy = true }) {
  return (
    <>
      <circle cx="109" cy="63" r="5" fill="#1E293B"/>
      <circle cx="131" cy="63" r="5" fill="#1E293B"/>
      <circle cx="111" cy="61" r="2.2" fill="white"/>
      <circle cx="133" cy="61" r="2.2" fill="white"/>
      {happy
        ? <path d="M108 77 Q120 87 132 77" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        : <path d="M108 76 Q120 83 132 76" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      }
      <ellipse cx="104" cy="75" rx="6" ry="3.5" fill="#FCA5A5" opacity="0.55"/>
      <ellipse cx="136" cy="75" rx="6" ry="3.5" fill="#FCA5A5" opacity="0.55"/>
    </>
  )
}

/* Shared legs + shoes */
function KeyLegs() {
  return (
    <>
      <rect x="97" y="206" width="14" height="22" rx="5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5"/>
      <rect x="115" y="206" width="14" height="22" rx="5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5"/>
      <rect x="88"  y="223" width="26" height="14" rx="7" fill="white" stroke="#D1D5DB" strokeWidth="1.5"/>
      <rect x="109" y="223" width="26" height="14" rx="7" fill="white" stroke="#D1D5DB" strokeWidth="1.5"/>
    </>
  )
}

/* Arm helper: thick stroke + lighter overlay = 3-D feel */
function Arm({ d }) {
  return (
    <>
      <path d={d} stroke="#1D4ED8" strokeWidth="13" strokeLinecap="round" fill="none"/>
      <path d={d} stroke="#3B82F6" strokeWidth="9"  strokeLinecap="round" fill="none"/>
    </>
  )
}

/* ── Pose 1: waving ────────────────────────────────────────────────────────── */
function KeyWaving() {
  return (
    <svg viewBox="0 0 240 260" fill="none" className="w-full max-w-[210px] mx-auto">
      <ellipse cx="120" cy="195" rx="98" ry="58" fill="#EFF6FF"/>
      <ellipse cx="120" cy="190" rx="75" ry="44" fill="#DBEAFE"/>

      {/* Left arm — relaxed down */}
      <Arm d="M104 126 Q80 140 68 162"/>
      <circle cx="65" cy="166" r="12" fill="white" stroke="#1D4ED8" strokeWidth="1.8"/>

      {/* Right arm — waving up */}
      <Arm d="M136 120 Q162 106 172 82"/>
      <circle cx="174" cy="78" r="12" fill="white" stroke="#1D4ED8" strokeWidth="1.8"/>
      {/* Wave sparkles */}
      <path d="M180 66 Q187 58 184 70" stroke="#93C5FD" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M187 60 Q194 53 190 65" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" fill="none"/>

      <KeyBody />
      <KeyFace happy />
      <KeyLegs />
    </svg>
  )
}

/* ── Pose 2: holding magnifying glass ─────────────────────────────────────── */
function KeySearching() {
  return (
    <svg viewBox="0 0 240 260" fill="none" className="w-full max-w-[210px] mx-auto">
      <ellipse cx="120" cy="195" rx="98" ry="58" fill="#EFF6FF"/>
      <ellipse cx="120" cy="190" rx="75" ry="44" fill="#DBEAFE"/>

      {/* Left arm — holds magnifying glass */}
      <Arm d="M104 126 Q78 138 62 158"/>
      {/* Magnifying glass */}
      <circle cx="50" cy="168" r="20" fill="white" stroke="#1D4ED8" strokeWidth="2.5"/>
      <circle cx="50" cy="168" r="14" fill="#DBEAFE" opacity="0.6"/>
      <circle cx="44" cy="161" r="5"  fill="white" opacity="0.7"/>
      <line  x1="63" y1="181" x2="76" y2="196" stroke="#1D4ED8" strokeWidth="4.5" strokeLinecap="round"/>

      {/* Right arm — relaxed, hand on hip */}
      <Arm d="M136 126 Q160 138 168 158"/>
      <circle cx="170" cy="162" r="12" fill="white" stroke="#1D4ED8" strokeWidth="1.8"/>

      <KeyBody />
      <KeyFace happy />
      <KeyLegs />
    </svg>
  )
}

/* ── Pose 3: holding a little house ───────────────────────────────────────── */
function KeyHouse() {
  return (
    <svg viewBox="0 0 240 260" fill="none" className="w-full max-w-[210px] mx-auto">
      <ellipse cx="120" cy="195" rx="98" ry="58" fill="#EFF6FF"/>
      <ellipse cx="120" cy="190" rx="75" ry="44" fill="#DBEAFE"/>

      {/* Left arm — holds house */}
      <Arm d="M104 126 Q76 138 60 156"/>
      {/* Little house in hand */}
      <rect x="28" y="162" width="38" height="28" rx="5" fill="white" stroke="#1D4ED8" strokeWidth="1.8"/>
      <path d="M24 168 L47 148 L70 168" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="1.8" strokeLinejoin="round"/>
      <rect x="41" y="172" width="11" height="18" rx="3" fill="#BFDBFE"/>
      <circle cx="48" cy="181" r="1.8" fill="#2563EB"/>
      {/* Chimney */}
      <rect x="52" y="150" width="7" height="12" rx="2" fill="white" stroke="#BFDBFE" strokeWidth="1.2"/>

      {/* Right arm — thumbs up */}
      <Arm d="M136 122 Q162 108 170 86"/>
      {/* Thumb-up glove */}
      <rect x="164" y="72" width="15" height="20" rx="7" fill="white" stroke="#1D4ED8" strokeWidth="1.8"/>
      <rect x="157" y="83" width="15" height="12" rx="5" fill="white" stroke="#1D4ED8" strokeWidth="1.8"/>

      <KeyBody />
      <KeyFace happy />
      <KeyLegs />
    </svg>
  )
}

/* ── Slide data ────────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 0,
    visual: <KeyWaving />,
    eyebrow: 'Bienvenida a Kasei',
    title: 'El hogar en\nbuenas manos',
    desc: 'Conectamos empleadoras con empleadas de confianza en barrios cerrados de Buenos Aires.',
  },
  {
    id: 1,
    visual: <KeySearching />,
    eyebrow: 'Sin intermediarios',
    title: 'Perfiles verificados,\nreferencias reales',
    desc: 'Filtrá por zona, tipo de servicio y disponibilidad. Sin boca a boca, sin complicaciones.',
  },
  {
    id: 2,
    visual: <KeyHouse />,
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
        {/* Illustration */}
        <div className="w-full max-w-sm flex items-center justify-center mb-6">
          {slide.visual}
        </div>

        {/* Text */}
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

      {/* Bottom controls */}
      <div className="px-8 pb-10 pt-2 flex flex-col items-center gap-5">
        {/* Dot indicators */}
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className="transition-all duration-200">
              <div className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-6 h-2 bg-blue-600' : 'w-2 h-2 bg-zinc-200 hover:bg-zinc-300'
              }`} />
            </button>
          ))}
        </div>

        {/* CTA buttons */}
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
