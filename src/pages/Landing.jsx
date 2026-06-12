import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, FileText, HeartHandshake, Sparkles, LogOut } from 'lucide-react'
import { useApp } from '../context/AppContext'
import GoogleBtn from '../components/GoogleBtn'

const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScSZOapTbmUl48kHyJIYQMIH2tPmb4ml0RoFVmvlpYSL7vGqw/viewform'

function LoginForm() {
  const { loginEmpleadaEmail, registerEmpleadaPassword, sheetEmpleadas } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modo, setModo] = useState('login') // 'login' | 'register'
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (modo === 'login') {
      const res = loginEmpleadaEmail(email, password, sheetEmpleadas)
      if (res.needsRegister) { setModo('register'); setError('Primera vez que ingresás. Creá una contraseña.'); return }
      if (!res.ok) { setError(res.error); return }
    } else {
      if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return }
      const res = registerEmpleadaPassword(email, password, sheetEmpleadas)
      if (!res.ok) { setError(res.error); return }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-xs">
      <input
        type="email" required placeholder="Tu email"
        value={email} onChange={e => setEmail(e.target.value)}
        className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password" required placeholder={modo === 'register' ? 'Creá una contraseña' : 'Contraseña'}
        value={password} onChange={e => setPassword(e.target.value)}
        className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button type="submit"
        className="w-full rounded-xl bg-[#1E3A5F] py-2.5 text-sm font-semibold text-white transition hover:bg-[#152D4A]">
        {modo === 'login' ? 'Iniciar sesión' : 'Crear contraseña'}
      </button>
      <button type="button" onClick={() => { setModo(m => m === 'login' ? 'register' : 'login'); setError('') }}
        className="text-xs text-slate-400 hover:text-slate-600 transition">
        {modo === 'login' ? '¿Primera vez? Creá tu contraseña' : 'Ya tengo contraseña'}
      </button>
    </form>
  )
}

function App() {
  const { user, sheetEmpleadas, logout } = useApp()

  const perfilEmpleada = user
    ? sheetEmpleadas.find(e => e.email?.toLowerCase() === user.email?.toLowerCase())
    : null

  return (
    <main className="min-h-screen bg-white text-[#1E3A5F]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-[#3B82F6] text-lg font-black text-white">
            K
          </span>
          <span className="text-xl font-bold tracking-tight">Kasei</span>
        </a>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-[#1E3A5F] sm:block">{user.nombre}</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-full border border-[#1E3A5F]/20 px-4 py-2 text-sm font-medium text-[#1E3A5F] transition hover:bg-[#EAF3FF]"
            >
              <LogOut size={15} />
              Salir
            </button>
          </div>
        ) : (
          <a href="#login" className="rounded-full bg-[#1E3A5F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#152D4A]">
            Iniciar sesión
          </a>
        )}
      </header>

      <section id="inicio" className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:pb-28 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#EAF3FF] px-4 py-2 text-sm font-semibold text-[#3B82F6]">
            <Sparkles size={16} />
            Propuesta de valor de Kasei
          </div>

          <h1 className="text-5xl font-semibold leading-[1.04] tracking-normal text-[#1E3A5F] sm:text-6xl lg:text-7xl">
            Tu próximo trabajo está más cerca de lo que pensás.
          </h1>

          <p className="mt-7 max-w-xl text-xl font-medium leading-8 text-slate-600 sm:text-2xl">
            Kasei te ayuda a transformar tu experiencia, habilidades y referencias en un CV claro, confiable y fácil de compartir.
          </p>

          <div className="mb-8 mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={formUrl}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#3B82F6] px-10 text-base font-semibold text-white shadow-[0_18px_38px_rgba(59,130,246,0.24)] transition hover:-translate-y-0.5 hover:bg-[#256FE6] sm:w-auto"
            >
              Creá tu CV en Kasei
              <ArrowRight size={19} strokeWidth={2.4} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[36px] bg-[#EAF3FF] p-3 shadow-[0_30px_90px_rgba(30,58,95,0.16)]">
            <img
              src="/mascot/llave-saluda.png"
              alt="Mascota de Kasei"
              className="h-[280px] w-full rounded-[28px] object-contain sm:h-[360px]"
            />
          </div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(30,58,95,0.14)] sm:left-8 sm:right-8">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#3B82F6]">
                <HeartHandshake size={23} />
              </div>
              <div>
                <p className="font-semibold">Un perfil que habla por vos</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Mostrá quién sos, cómo trabajás y qué experiencia tenés.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-[#EAF3FF] bg-[#F8FBFF] px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {[
            ['Ordená tu experiencia', FileText],
            ['Mostrá tus referencias', Check],
            ['Accedé a más oportunidades', HeartHandshake],
          ].map(([text, Icon]) => (
            <div key={text} className="flex items-center gap-3 rounded-3xl bg-white p-5 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#3B82F6]">
                <Icon size={20} />
              </span>
              <span className="font-semibold">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {!user && (
        <section id="login" className="px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-sm rounded-[28px] border border-[#EAF3FF] bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1E3A5F] mb-6 text-center">Ingresá a tu perfil</h2>
            <GoogleBtn tipo="empleada" label="Continuar con Google" redirectTo="/empleada-landing" />
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-zinc-100" />
              <span className="text-xs text-zinc-400">o con email</span>
              <div className="flex-1 h-px bg-zinc-100" />
            </div>
            <LoginForm />
          </div>
        </section>
      )}

      {user && (
        <section className="px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-2xl rounded-[28px] border border-[#EAF3FF] bg-white p-8 shadow-sm">
            {perfilEmpleada ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  {perfilEmpleada.foto ? (
                    <img src={perfilEmpleada.foto} alt={perfilEmpleada.nombre} className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#EAF3FF] flex items-center justify-center text-[#3B82F6] text-2xl font-bold">
                      {perfilEmpleada.nombre.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-[#1E3A5F]">{perfilEmpleada.nombre}</h2>
                    <p className="text-sm text-slate-500">{perfilEmpleada.zona} · {perfilEmpleada.modalidad}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {perfilEmpleada.habilidades.map(h => (
                    <span key={h} className="text-xs font-medium bg-[#EAF3FF] text-[#3B82F6] px-3 py-1 rounded-full">{h}</span>
                  ))}
                </div>
                {perfilEmpleada.descripcion && (
                  <p className="text-sm text-slate-600 leading-relaxed">{perfilEmpleada.descripcion}</p>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <p className="font-semibold text-[#1E3A5F]">Hola, {user.nombre}</p>
                <p className="text-sm text-slate-500 mt-2">Todavía no completaste el formulario. ¡Creá tu CV para aparecer en Kasei!</p>
                <a href={formUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#256FE6]">
                  Completar formulario <ArrowRight size={16} />
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {(!user || !perfilEmpleada) && <section id="form-placeholder" className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-[36px] bg-[#1E3A5F] p-10 text-center text-white shadow-[0_30px_90px_rgba(30,58,95,0.2)] sm:p-14 lg:p-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#BBD7FF]">Formulario</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Creá tu CV en Kasei</h2>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-blue-50">
            Completá tus datos para que podamos generar tu perfil laboral.
          </p>
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#3B82F6] px-10 text-base font-semibold text-white shadow-[0_18px_38px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 hover:bg-[#256FE6]"
          >
            Completar formulario
            <ArrowRight size={19} strokeWidth={2.4} />
          </a>
        </div>
      </section>}
    </main>
  )
}

export default App
