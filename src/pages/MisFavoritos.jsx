import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import PerfilCard from '../components/PerfilCard'

export default function MisFavoritos() {
  const { empleadas, favorites } = useApp()
  const favEmpleadas = empleadas.filter(e => favorites.includes(e.id))

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-4 h-4 text-rose-400" viewBox="0 0 24 24" fill="#F43F5E" stroke="#F43F5E" strokeWidth="0">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p className="text-xs font-semibold text-rose-400 uppercase tracking-widest">Guardadas</p>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Mis favoritas</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {favEmpleadas.length} empleada{favEmpleadas.length !== 1 ? 's' : ''} guardada{favEmpleadas.length !== 1 ? 's' : ''}
        </p>
      </div>

      {favEmpleadas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          {/* Empty state — llave con corazón */}
          <div className="mb-6">
            <svg viewBox="0 0 120 140" fill="none" className="w-28 mx-auto">
              <ellipse cx="60" cy="115" rx="48" ry="22" fill="#FFF1F2"/>
              {/* Key shaft */}
              <rect x="50" y="62" width="20" height="60" rx="6" fill="#93C5FD"/>
              {/* Teeth */}
              <rect x="70" y="80" width="10" height="7" rx="2" fill="#93C5FD"/>
              <rect x="70" y="93" width="14" height="7" rx="2" fill="#93C5FD"/>
              <rect x="70" y="106" width="10" height="7" rx="2" fill="#93C5FD"/>
              {/* Bow */}
              <circle cx="60" cy="44" r="28" fill="#93C5FD"/>
              <circle cx="60" cy="44" r="11" fill="white"/>
              {/* Heart on bow */}
              <path d="M60 38 C60 38 52 32 52 38 C52 42 60 48 60 48 C60 48 68 42 68 38 C68 32 60 38 60 38Z"
                fill="#F43F5E" />
              {/* Legs */}
              <rect x="47" y="120" width="9" height="13" rx="3" fill="#60A5FA"/>
              <rect x="59" y="120" width="9" height="13" rx="3" fill="#60A5FA"/>
              <rect x="41" y="129" width="18" height="9" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
              <rect x="58" y="129" width="18" height="9" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-zinc-700 mb-2">Todavía no guardaste ninguna</h2>
          <p className="text-sm text-zinc-400 max-w-xs mb-6 leading-relaxed">
            Tocá el <span className="text-rose-400">♥</span> en cualquier perfil para guardarla acá y encontrarla más fácil.
          </p>
          <Link
            to="/empleadas"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-2xl text-sm transition-all active:scale-[0.98]"
          >
            Explorar empleadas
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {favEmpleadas.map(e => <PerfilCard key={e.id} empleada={e} />)}
        </div>
      )}
    </div>
  )
}
