import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function BottomNav() {
  const { user, favorites } = useApp()
  const location = useLocation()

  const hideRoutes = ['/welcome', '/login', '/registro']
  if (!user) return null
  if (hideRoutes.some(r => location.pathname.startsWith(r))) return null

  const isHome = location.pathname === '/' || location.pathname === '/empleadas'
  const isFavs = location.pathname === '/favoritos'
  const isPerfil = location.pathname === '/mi-perfil'

  return (
    <>
      <div className="sm:hidden h-24" />

      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-zinc-100"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-end justify-around h-16 px-4">

          {/* Favoritas — izquierda */}
          <Link to="/favoritos" className="flex flex-col items-center gap-0.5 flex-1 py-2 relative">
            <div className="relative">
              <svg className="w-6 h-6 transition-colors" viewBox="0 0 24 24"
                fill={isFavs ? '#F43F5E' : 'none'}
                stroke={isFavs ? '#F43F5E' : '#A1A1AA'}
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-medium transition-colors ${isFavs ? 'text-rose-500' : 'text-zinc-400'}`}>
              Favoritas
            </span>
            {isFavs && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-rose-500 rounded-full" />}
          </Link>

          {/* Inicio — centro, elevado */}
          <Link to="/" className="flex flex-col items-center gap-1 flex-1 -mt-5 pb-1">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 ${
              isHome
                ? 'bg-blue-700 shadow-blue-300/40'
                : 'bg-blue-600 shadow-blue-200/30 hover:bg-blue-700'
            }`}>
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isHome ? 2.5 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className={`text-[10px] font-semibold transition-colors ${isHome ? 'text-blue-700' : 'text-blue-500'}`}>
              Inicio
            </span>
          </Link>

          {/* Perfil — derecha */}
          <Link to="/mi-perfil" className="flex flex-col items-center gap-0.5 flex-1 py-2 relative">
            <svg className="w-6 h-6 transition-colors" fill="none"
              stroke={isPerfil ? '#2563EB' : '#A1A1AA'}
              strokeWidth="2" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className={`text-[10px] font-medium transition-colors ${isPerfil ? 'text-blue-600' : 'text-zinc-400'}`}>
              Perfil
            </span>
            {isPerfil && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full" />}
          </Link>

        </div>
      </nav>
    </>
  )
}
