import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
const DIAS_LABEL = { lunes: 'L', martes: 'M', miercoles: 'X', jueves: 'J', viernes: 'V', sabado: 'S', domingo: 'D' }

export default function PerfilCard({ empleada }) {
  const { favorites, toggleFavorite, user } = useApp()
  const navigate = useNavigate()
  const isFav = !!user && favorites.includes(empleada.id)

  function handleFav(e) {
    e.preventDefault()
    e.stopPropagation()
    if (!user) { navigate('/login'); return }
    toggleFavorite(empleada.id)
  }

  return (
    <div className="group relative bg-white rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:shadow-sm transition-all duration-200">
      {/* Heart button */}
      <button
        onClick={handleFav}
        className="absolute top-3.5 right-3.5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-zinc-100 transition-all hover:scale-110 active:scale-95 shadow-sm"
        aria-label={isFav ? 'Quitar de favoritas' : 'Guardar como favorita'}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill={isFav ? '#F43F5E' : 'none'} stroke={isFav ? '#F43F5E' : '#A1A1AA'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <Link to={`/empleadas/${empleada.id}`} className="block p-5">
        <div className="flex gap-4 items-start">
          {/* Avatar */}
          {empleada.foto ? (
            <img
              src={empleada.foto}
              alt={empleada.nombre}
              className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-white shadow-sm"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg font-semibold shrink-0">
              {empleada.nombre.charAt(0)}
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <h3 className="font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors text-sm leading-snug">
                  {empleada.nombre}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">{empleada.zona} · {empleada.modalidad}</p>
              </div>
            </div>

            {/* Servicios */}
            <div className="flex flex-wrap gap-1 mb-3">
              {empleada.servicios.slice(0, 3).map(s => (
                <span key={s} className="text-[10px] font-medium bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full">{s}</span>
              ))}
              {empleada.servicios.length > 3 && (
                <span className="text-[10px] font-medium bg-zinc-100 text-zinc-400 px-2 py-0.5 rounded-full">+{empleada.servicios.length - 3}</span>
              )}
            </div>

            {/* Días */}
            <div className="flex gap-0.5">
              {DIAS.map(dia => (
                <span
                  key={dia}
                  className={`w-5 h-5 rounded text-[9px] flex items-center justify-center font-semibold ${
                    empleada.disponibilidad?.[dia]
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-zinc-50 text-zinc-300'
                  }`}
                >
                  {DIAS_LABEL[dia]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-xs text-zinc-400 mt-4 line-clamp-2 leading-relaxed border-t border-zinc-50 pt-3">
          {empleada.descripcion}
        </p>
      </Link>
    </div>
  )
}
