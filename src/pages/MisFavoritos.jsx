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
            <img
              src="/mascot/llave-corazon.png"
              alt="Llave con corazón"
              className="w-36 mx-auto drop-shadow-sm select-none"
              draggable={false}
            />
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
