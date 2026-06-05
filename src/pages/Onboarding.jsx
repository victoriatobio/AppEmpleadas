import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── SVG Illustrations ─────────────────────────────────────────────────────── */

function IlluHouse() {
  return (
    <svg viewBox="0 0 280 240" fill="none" className="w-full max-w-xs mx-auto">
      {/* Background blob */}
      <ellipse cx="140" cy="160" rx="110" ry="80" fill="#EFF6FF" />
      <ellipse cx="140" cy="155" rx="85" ry="62" fill="#DBEAFE" />
      {/* House body */}
      <rect x="72" y="115" width="136" height="90" rx="8" fill="white" stroke="#BFDBFE" strokeWidth="2"/>
      {/* Roof */}
      <path d="M58 120 L140 58 L222 120" stroke="#2563EB" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
      {/* Door */}
      <rect x="116" y="155" width="28" height="50" rx="6" fill="#BFDBFE"/>
      <circle cx="139" cy="181" r="2.5" fill="#2563EB"/>
      {/* Windows */}
      <rect x="82" y="132" width="30" height="26" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5"/>
      <line x1="97" y1="132" x2="97" y2="158" stroke="#BFDBFE" strokeWidth="1.5"/>
      <line x1="82" y1="145" x2="112" y2="145" stroke="#BFDBFE" strokeWidth="1.5"/>
      <rect x="168" y="132" width="30" height="26" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5"/>
      <line x1="183" y1="132" x2="183" y2="158" stroke="#BFDBFE" strokeWidth="1.5"/>
      <line x1="168" y1="145" x2="198" y2="145" stroke="#BFDBFE" strokeWidth="1.5"/>
      {/* Chimney */}
      <rect x="165" y="70" width="14" height="32" rx="3" fill="white" stroke="#BFDBFE" strokeWidth="1.5"/>
      {/* Smoke dots */}
      <circle cx="172" cy="60" r="5" fill="#DBEAFE" opacity="0.7"/>
      <circle cx="179" cy="50" r="3.5" fill="#BFDBFE" opacity="0.5"/>
      <circle cx="168" cy="44" r="2.5" fill="#EFF6FF" opacity="0.4"/>
      {/* Verified badge */}
      <circle cx="200" cy="85" r="18" fill="#2563EB"/>
      <path d="M192 85 l5 5 9-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Small stars */}
      <circle cx="72" cy="92" r="3" fill="#BFDBFE"/>
      <circle cx="215" cy="128" r="2" fill="#93C5FD"/>
      <circle cx="88" cy="200" r="4" fill="#DBEAFE"/>
    </svg>
  )
}

function IlluSearch() {
  return (
    <svg viewBox="0 0 280 240" fill="none" className="w-full max-w-xs mx-auto">
      <ellipse cx="140" cy="160" rx="110" ry="75" fill="#EFF6FF"/>
      {/* Cards grid */}
      {/* Card 1 */}
      <rect x="48" y="80" width="80" height="100" rx="12" fill="white" stroke="#DBEAFE" strokeWidth="1.5"/>
      <circle cx="88" cy="108" r="18" fill="#DBEAFE"/>
      <circle cx="88" cy="104" r="8" fill="#93C5FD"/>
      <ellipse cx="88" cy="118" rx="11" ry="6" fill="#93C5FD"/>
      <rect x="62" y="132" width="52" height="6" rx="3" fill="#EFF6FF"/>
      <rect x="68" y="144" width="40" height="4" rx="2" fill="#DBEAFE"/>
      <rect x="62" y="154" width="52" height="4" rx="2" fill="#EFF6FF"/>
      {/* Verified on card 1 */}
      <circle cx="108" cy="87" r="9" fill="#2563EB"/>
      <path d="M104 87 l2.5 2.5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Card 2 — center, taller, highlighted */}
      <rect x="140" y="65" width="92" height="115" rx="12" fill="white" stroke="#2563EB" strokeWidth="2"/>
      <circle cx="186" cy="96" r="22" fill="#DBEAFE"/>
      <circle cx="186" cy="91" r="10" fill="#2563EB" opacity="0.6"/>
      <ellipse cx="186" cy="107" rx="14" ry="7" fill="#2563EB" opacity="0.6"/>
      <rect x="155" y="126" width="62" height="6" rx="3" fill="#DBEAFE"/>
      <rect x="160" y="138" width="52" height="4" rx="2" fill="#EFF6FF"/>
      <rect x="155" y="148" width="62" height="4" rx="2" fill="#EFF6FF"/>
      {/* Stars */}
      <text x="158" y="165" fontSize="11" fill="#FBBF24">★★★★★</text>
      {/* Verified on card 2 */}
      <circle cx="216" cy="73" r="10" fill="#2563EB"/>
      <path d="M211 73 l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Filter bar */}
      <rect x="48" y="52" width="184" height="20" rx="10" fill="white" stroke="#DBEAFE" strokeWidth="1.5"/>
      <circle cx="62" cy="62" r="5" fill="#DBEAFE"/>
      <rect x="72" y="58" width="60" height="8" rx="4" fill="#EFF6FF"/>
      <rect x="196" y="57" width="26" height="10" rx="5" fill="#DBEAFE"/>
    </svg>
  )
}

function IlluConnect() {
  return (
    <svg viewBox="0 0 280 240" fill="none" className="w-full max-w-xs mx-auto">
      <ellipse cx="140" cy="165" rx="105" ry="72" fill="#EFF6FF"/>
      {/* Left avatar */}
      <circle cx="74" cy="125" r="28" fill="#DBEAFE"/>
      <circle cx="74" cy="118" r="12" fill="#2563EB" opacity="0.5"/>
      <ellipse cx="74" cy="134" rx="16" ry="8" fill="#2563EB" opacity="0.5"/>
      {/* Right avatar */}
      <circle cx="206" cy="145" r="28" fill="#BFDBFE"/>
      <circle cx="206" cy="138" r="12" fill="#2563EB" opacity="0.7"/>
      <ellipse cx="206" cy="154" rx="16" ry="8" fill="#2563EB" opacity="0.7"/>
      {/* Chat bubble left */}
      <rect x="52" y="72" width="110" height="40" rx="14" fill="white" stroke="#DBEAFE" strokeWidth="1.5"/>
      <path d="M70 112 L62 122 L82 112" fill="white" stroke="#DBEAFE" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="64" y="85" width="70" height="8" rx="4" fill="#DBEAFE"/>
      <rect x="64" y="97" width="50" height="6" rx="3" fill="#EFF6FF"/>
      {/* Chat bubble right */}
      <rect x="118" y="100" width="110" height="40" rx="14" fill="#2563EB"/>
      <path d="M210 140 L218 152 L198 140" fill="#2563EB"/>
      <rect x="130" y="113" width="68" height="8" rx="4" fill="white" opacity="0.8"/>
      <rect x="130" y="125" width="48" height="6" rx="3" fill="white" opacity="0.5"/>
      {/* Connection dots */}
      <circle cx="115" cy="155" r="5" fill="#93C5FD"/>
      <circle cx="130" cy="162" r="4" fill="#BFDBFE"/>
      <circle cx="145" cy="155" r="5" fill="#93C5FD"/>
      {/* Checkmark badge */}
      <circle cx="168" cy="88" r="14" fill="#10B981"/>
      <path d="M162 88 l4 4 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ── Slide data ────────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 0,
    visual: <IlluHouse />,
    eyebrow: 'Bienvenida a Kasei',
    title: 'El hogar en\nbuenas manos',
    desc: 'Conectamos empleadoras con empleadas de confianza en barrios cerrados de Buenos Aires.',
  },
  {
    id: 1,
    visual: <IlluSearch />,
    eyebrow: 'Sin intermediarios',
    title: 'Perfiles verificados,\nreferencias reales',
    desc: 'Filtrá por zona, tipo de servicio y disponibilidad. Sin boca a boca, sin complicaciones.',
  },
  {
    id: 2,
    visual: <IlluConnect />,
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
        className="flex-1 flex flex-col items-center justify-center px-8 pb-4 transition-all duration-180"
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
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-200"
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-2 bg-blue-600'
                    : 'w-2 h-2 bg-zinc-200 hover:bg-zinc-300'
                }`}
              />
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

          {!isLast && (
            <button
              onClick={skip}
              className="w-full text-zinc-400 hover:text-zinc-600 font-medium py-2 text-sm transition-colors"
            >
              Ya tengo cuenta · <span className="text-blue-500">Ingresar</span>
            </button>
          )}

          {isLast && (
            <button
              onClick={() => finish('/login')}
              className="w-full text-zinc-400 hover:text-zinc-600 font-medium py-2 text-sm transition-colors"
            >
              Ya tengo cuenta · <span className="text-blue-500">Ingresar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
