import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

/* Logo fiel al branding: rounded rect + house outline + dot, todo en azul */
function KaseiLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative" style={{ width: 34, height: 34 }}>
        <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 34, height: 34 }}>
          {/* Rounded-square background — cream, igual que el original */}
          <rect width="34" height="34" rx="9" fill="#EFF6FF" />
          {/* House outline — azul, solo trazo sin fill */}
          <path
            d="M17 6 L27.5 14.5 L27.5 27.5 L6.5 27.5 L6.5 14.5 Z"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Dot interior — persona dentro del hogar */}
          <circle cx="17" cy="22" r="2.6" fill="#2563EB" />
        </svg>
      </div>
      <span
        className="text-zinc-900 tracking-tight select-none"
        style={{ fontSize: '1.05rem', fontWeight: 400, letterSpacing: '-0.01em' }}
      >
        kasei
      </span>
    </div>
  )
}

export default function Navbar() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  const linkClass = (path) =>
    `text-sm font-medium transition-colors duration-150 ${
      isActive(path) ? 'text-blue-600' : 'text-zinc-500 hover:text-zinc-900'
    }`

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/"><KaseiLogo /></Link>

          {/* Desktop */}
          <div className="hidden sm:flex items-center gap-7">
            <Link to="/empleadas" className={linkClass('/empleadas')}>Ver empleadas</Link>
            {user ? (
              <>
                <Link to="/favoritos" className={linkClass('/favoritos')}>Mis favoritas</Link>
                <Link to="/mi-perfil" className={linkClass('/mi-perfil')}>Mi perfil</Link>
                <button onClick={handleLogout} className="text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-colors">
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                  Ingresar
                </Link>
                <Link to="/registro" className="btn-primary !py-2 !px-4">
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger — solo si NO está logueado (logueados usan bottom nav) */}
          {!user && (
            <button
              className="sm:hidden p-2 rounded-lg text-zinc-400 hover:bg-zinc-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen
                ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          )}
        </div>

        {menuOpen && !user && (
          <div className="sm:hidden border-t border-zinc-50 py-4 flex flex-col gap-3 pb-5">
            <Link to="/empleadas" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-zinc-700 px-1">Ver empleadas</Link>
            {user ? (
              <>
                <Link to="/mi-perfil" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-zinc-700 px-1">Mi perfil</Link>
                <button onClick={handleLogout} className="text-sm text-zinc-400 text-left px-1">Salir</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-zinc-700 px-1">Ingresar</Link>
                <Link to="/registro" onClick={() => setMenuOpen(false)} className="btn-primary mx-0 text-center mt-1">Registrarse</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
