import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function Check() {
  return (
    <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

const STATS = [
  { num: '50+', label: 'Empleadas activas' },
  { num: '100%', label: 'Con referencias' },
  { num: 'Gratis', label: 'Para empleadas' },
]

const STEPS = [
  { n: '1', t: 'Creás tu perfil', d: 'Completá tu CV digital: experiencia, habilidades y referencias de empleadoras anteriores.' },
  { n: '2', t: 'Te encontramos', d: 'Las empleadoras filtran por zona, servicio y disponibilidad.' },
  { n: '3', t: 'Se conectan', d: 'Un mensaje dentro de la app, coordinan y listo. Sin vueltas.' },
]

export default function Landing() {
  const { user } = useApp()

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Soft blue blob — evoca el branding */}
        <div
          className="pointer-events-none absolute -top-40 right-0 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute top-20 right-40 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)' }}
        />

        <div className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center relative z-10">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 border border-blue-100 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Buenos Aires · Barrios cerrados
          </div>

          {/* Headline — grande, apretado, editorial */}
          <h1
            className="text-zinc-900 mb-6 leading-[1.02] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 700 }}
          >
            El hogar en<br />
            <span className="text-blue-600">buenas manos</span>
          </h1>

          <p className="text-zinc-500 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Conectamos empleadoras con empleadas de confianza.
            Perfiles verificados, referencias reales. Sin boca a boca.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {user ? (
              <Link to="/empleadas" className="btn-primary">
                Ver empleadas disponibles →
              </Link>
            ) : (
              <>
                <Link to="/registro?rol=empleadora" className="btn-primary">
                  Busco empleada →
                </Link>
                <Link to="/registro?rol=empleada" className="btn-secondary">
                  Busco trabajo
                </Link>
              </>
            )}
          </div>

          {/* Stats inline */}
          <div className="flex items-center justify-center gap-8 mt-14 pt-8 border-t border-zinc-100">
            {STATS.map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-xl font-bold text-zinc-900">{num}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TWO COLUMNS ──────────────────────────── */}
      <section className="bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="section-label text-center mb-12">¿Quién sos?</p>
          <div className="grid md:grid-cols-2 gap-5">

            {/* Empleadora */}
            <div className="bg-white rounded-2xl border border-zinc-100 p-8 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Soy empleadora</h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                Buscás alguien de confianza para tu hogar. Filtrá por zona, disponibilidad y servicio. Referencias reales, proceso claro.
              </p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {['Perfiles verificados con referencias', 'Filtros por zona y servicio', 'Contacto directo vía mensajes'].map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-zinc-600"><Check />{t}</li>
                ))}
              </ul>
              <Link
                to={user ? '/empleadas' : '/registro?rol=empleadora'}
                className="btn-primary w-full"
              >
                {user ? 'Ver empleadas' : 'Comenzar →'}
              </Link>
            </div>

            {/* Empleada */}
            <div className="bg-blue-600 rounded-2xl p-8 flex flex-col text-white">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Soy empleada</h3>
              <p className="text-sm text-blue-100 leading-relaxed mb-6">
                Buscás trabajo en barrios cerrados. Creá tu perfil, mostrá tu experiencia y que las familias te encuentren a vos.
              </p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {['Tu CV digital con experiencia', 'Referencias verificables', 'Completamente gratuito'].map(t => (
                  <li key={t} className="flex items-start gap-2 text-sm text-blue-100">
                    <svg className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                to={user ? '/mi-perfil' : '/registro?rol=empleada'}
                className="bg-white text-blue-600 font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-center block active:scale-[0.98]"
              >
                {user ? 'Ver mi perfil' : 'Crear perfil gratis →'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="section-label text-center mb-12">Cómo funciona</p>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map(({ n, t, d }) => (
            <div key={n} className="flex flex-col items-start">
              <div
                className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold mb-4"
              >
                {n}
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">{t}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────── */}
      <section className="border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="section-label mb-4">Empezá hoy</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4 tracking-tight leading-tight">
            Tu próxima empleada<br />está en Kasei
          </h2>
          <p className="text-zinc-500 text-sm mb-8 max-w-xs mx-auto">
            Registrate en minutos, sin tarjeta de crédito.
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/registro?rol=empleadora" className="btn-primary">Soy empleadora →</Link>
              <Link to="/registro?rol=empleada" className="btn-secondary">Soy empleada</Link>
            </div>
          ) : (
            <Link to="/empleadas" className="btn-primary">Ver empleadas disponibles →</Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-6 text-center text-xs text-zinc-400">
        © 2025 Kasei · Universidad de San Andrés
      </footer>
    </div>
  )
}
