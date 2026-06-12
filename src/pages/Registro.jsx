import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import GoogleBtn from '../components/GoogleBtn'

const SERVICIOS_OPTS = ['Limpieza', 'Plancha', 'Cocina', 'Cuidado de niños', 'Cuidado de adultos mayores', 'Jardinería', 'Compras/mandados']

const GOOGLE_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_EMPLEADAS || 'https://forms.gle/TuFormulario'

function ToggleMulti({ options, selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const active = selected.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(active ? selected.filter(s => s !== opt) : [...selected, opt])}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-zinc-600 border-zinc-200 hover:border-blue-400'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

// ── Pantalla para empleadas: redirige a Google Form + login con Google ────────
function EmpleadaGoogleForm() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-12 bg-zinc-50">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight mb-2">Registrate como empleada</h1>
        <p className="text-zinc-500 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
          Completá el formulario con tu CV y luego ingresá con Google para ver tu perfil.
        </p>

        {/* Steps */}
        <div className="bg-white rounded-2xl border border-zinc-100 p-6 mb-6 text-left space-y-4">
          {[
            { n: '1', t: 'Completá el formulario', d: 'Datos personales, experiencia, servicios y referencias.' },
            { n: '2', t: 'Ingresá con Google', d: 'Creá tu cuenta usando tu Gmail para acceder a tu perfil.' },
            { n: '3', t: 'Tu perfil aparece online', d: 'Las empleadoras ya pueden encontrarte y contactarte.' },
          ].map(({ n, t, d }) => (
            <div key={n} className="flex gap-4 items-start">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0">{n}</div>
              <div>
                <p className="text-sm font-semibold text-zinc-800">{t}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Paso 1: Landing empleada */}
        <Link
          to="/empleada-landing"
          className="btn-primary w-full text-base py-3 mb-4 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Paso 1 — Completar formulario CV
        </Link>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-zinc-200" />
          <span className="text-xs text-zinc-400">luego</span>
          <div className="flex-1 h-px bg-zinc-200" />
        </div>

        {/* Paso 2: Google login como empleada */}
        <div className="bg-white rounded-2xl border border-zinc-100 p-4 mb-4">
          <p className="text-xs text-zinc-500 mb-3">Paso 2 — Ingresá con Google para crear tu cuenta</p>
          <GoogleBtn label="Registrarme con Google" tipo="empleada" redirectTo="/mi-perfil" />
        </div>

        <p className="text-xs text-zinc-400">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Ingresá</Link>
        </p>
      </div>
    </div>
  )
}

// ── Formulario para empleadoras ───────────────────────────────────────────────
export default function Registro() {
  const { register, user } = useApp()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const rolParam = searchParams.get('rol')

  const [step, setStep] = useState(rolParam ? 2 : 1)
  const [rol, setRol] = useState(rolParam || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [base, setBase] = useState({ nombre: '', email: '', password: '', password2: '' })
  const [showPass, setShowPass] = useState(false)
  const [empl, setEmpl] = useState({
    zona: '',
    barrio: '',
    serviciosBuscados: [],
    horariosRequeridos: '',
    modalidadBuscada: 'Por horas',
    descripcionHogar: '',
  })

  // Si el rol es empleada, mostrar siempre esta pantalla aunque esté logueada
  if (rol === 'empleada') return <EmpleadaGoogleForm />

  if (user) return <Navigate to="/empleadas" replace />

  function handleBase(e) { setBase(f => ({ ...f, [e.target.name]: e.target.value })); setError('') }
  function handleEmpl(e) { setEmpl(f => ({ ...f, [e.target.name]: e.target.value })); setError('') }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (base.password !== base.password2) return setError('Las contraseñas no coinciden')
    if (base.password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres')
    setLoading(true)

    const data = {
      tipo: 'empleadora',
      nombre: base.nombre.trim(),
      email: base.email.trim().toLowerCase(),
      password: base.password,
      foto: null,
      verificada: false,
      zona: empl.zona,
      barrio: empl.barrio,
      serviciosBuscados: empl.serviciosBuscados,
      horariosRequeridos: empl.horariosRequeridos,
      modalidadBuscada: empl.modalidadBuscada,
      descripcionHogar: empl.descripcionHogar,
    }

    const result = register(data)
    setLoading(false)
    if (!result.ok) return setError(result.error)
    navigate('/empleadas', { replace: true })
  }

  // Step 1 — elegir rol
  if (step === 1) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-12 bg-zinc-50">
        <div className="w-full max-w-lg">
          <Link to="/empleadas" className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-700 mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </Link>
          <h1 className="text-2xl font-bold text-center text-zinc-900 tracking-tight mb-1">¿Cómo querés registrarte?</h1>
          <p className="text-zinc-500 text-sm text-center mb-8">Elegí el tipo de cuenta que mejor se adapta a vos</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { val: 'empleadora', title: 'Empleadora', desc: 'Quiero contratar una empleada de hogar para mi familia', img: '/mascot/llave-empleadora.png' },
              { val: 'empleada', title: 'Empleada', desc: 'Busco trabajo en hogares y quiero crear mi perfil', img: '/mascot/llave-domestica.png' },
            ].map(({ val, title, desc, img }) => (
              <button
                key={val}
                onClick={() => { setRol(val); setStep(2) }}
                className="bg-white rounded-2xl border border-zinc-100 hover:border-blue-300 hover:shadow-sm p-6 text-left transition-all"
              >
                <img src={img} alt={title} className="w-28 h-28 object-contain mb-3 mx-auto" draggable={false} />
                <h3 className="font-semibold text-zinc-800 mb-1">{title}</h3>
                <p className="text-sm text-zinc-500">{desc}</p>
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-zinc-500 mt-4">
            ¿Ya tenés cuenta?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">Ingresá</Link>
          </p>
        </div>
      </div>
    )
  }

  // Step 2 — formulario empleadora
  return (
    <div className="min-h-[calc(100vh-56px)] bg-zinc-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-700 mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Volver
        </button>

        <div className="bg-white rounded-2xl border border-zinc-100 p-8">
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight mb-1">Registrate como empleadora</h1>
          <p className="text-zinc-400 text-sm mb-6">Completá tus datos para empezar a buscar empleadas</p>

          {/* Google signup */}
          <GoogleBtn label="Registrarse con Google" tipo="empleadora" redirectTo="/empleadas" />

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-zinc-100" />
            <span className="text-xs text-zinc-400">o con email</span>
            <div className="flex-1 h-px bg-zinc-100" />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos básicos */}
            <div className="space-y-4">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Datos personales</p>
              <div>
                <label className="label">Nombre completo *</label>
                <input name="nombre" value={base.nombre} onChange={handleBase} className="input" placeholder="Ej: Sofía Herrera" required />
              </div>
              <div>
                <label className="label">Email *</label>
                <input type="email" name="email" value={base.email} onChange={handleBase} className="input" placeholder="tu@email.com" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Contraseña *</label>
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} name="password" value={base.password} onChange={handleBase} className="input pr-10" placeholder="Mín. 6 caracteres" required />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                      {showPass
                        ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      }
                    </button>
                  </div>
                </div>
                <div>
                  <label className="label">Repetir *</label>
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} name="password2" value={base.password2} onChange={handleBase} className="input pr-10" placeholder="••••••" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Datos hogar */}
            <div className="space-y-4">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest pt-2 border-t border-zinc-50">Tu hogar</p>
              <div>
                <label className="label">Zona / Barrio cerrado *</label>
                <input name="zona" value={empl.zona} onChange={handleEmpl} className="input" placeholder="Ej: Nordelta" required />
              </div>
              <div>
                <label className="label">Barrio específico</label>
                <input name="barrio" value={empl.barrio} onChange={handleEmpl} className="input" placeholder="Ej: Los Castores" />
              </div>
              <div>
                <label className="label">¿Qué servicios necesitás?</label>
                <ToggleMulti options={SERVICIOS_OPTS} selected={empl.serviciosBuscados} onChange={s => setEmpl(f => ({ ...f, serviciosBuscados: s }))} />
              </div>
              <div>
                <label className="label">Modalidad buscada</label>
                <select name="modalidadBuscada" value={empl.modalidadBuscada} onChange={handleEmpl} className="input">
                  <option>Por horas</option>
                  <option>Cama adentro</option>
                  <option>Cama afuera</option>
                </select>
              </div>
              <div>
                <label className="label">Descripción del hogar</label>
                <textarea name="descripcionHogar" value={empl.descripcionHogar} onChange={handleEmpl} className="input resize-none" placeholder="Ej: Casa de 3 ambientes, 2 adultos y 1 niño..." rows={3} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Creando cuenta...' : 'Crear mi cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-6">
            ¿Ya tenés cuenta?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">Ingresá</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
