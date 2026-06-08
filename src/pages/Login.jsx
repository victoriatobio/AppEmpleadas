import React, { useState } from 'react'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import GoogleBtn from '../components/GoogleBtn'

export default function Login() {
  const { login, user } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/empleadas'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to={from} replace />

  function handleChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError('') }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const result = login(form.email.trim().toLowerCase(), form.password)
    setLoading(false)
    if (!result.ok) return setError(result.error)
    navigate(result.user.tipo === 'empleada' ? '/mi-perfil' : '/empleadas', { replace: true })
  }

  function fillDemo(email) { setForm({ email, password: '123456' }); setError('') }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-12 bg-zinc-50">
      <div className="w-full max-w-sm">
        {/* Back */}
        <Link to="/empleadas" className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-700 mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Bienvenida</h1>
          <p className="text-zinc-500 text-sm mt-1">Ingresá a tu cuenta Kasei</p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-100 p-6">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}

          {/* Google login */}
          <GoogleBtn label="Continuar con Google" tipo="empleadora" />

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-zinc-100" />
            <span className="text-xs text-zinc-400">o ingresá con email</span>
            <div className="flex-1 h-px bg-zinc-100" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="input" placeholder="tu@email.com" required />
            </div>
            <div>
              <label className="label">Contraseña</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="input" placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-5">
            ¿No tenés cuenta?{' '}
            <Link to="/registro" className="text-blue-600 font-medium hover:underline">Registrate gratis</Link>
          </p>
        </div>

        {/* Demo */}
        <div className="mt-4 bg-white rounded-2xl border border-zinc-100 p-4">
          <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mb-3">Cuentas demo</p>
          <div className="space-y-1">
            {[
              { label: 'Empleadora · Sofía', email: 'sofia@demo.com' },
              { label: 'Empleada · María', email: 'maria@demo.com' },
              { label: 'Empleada · Ana', email: 'ana@demo.com' },
            ].map(({ label, email }) => (
              <button
                key={email}
                onClick={() => fillDemo(email)}
                className="w-full text-left text-xs text-zinc-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors flex justify-between items-center"
              >
                <span>{label}</span>
                <span className="text-zinc-400 font-mono text-[10px]">{email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
