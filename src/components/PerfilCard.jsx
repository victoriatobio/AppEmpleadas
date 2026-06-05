import React from 'react'
import { Link } from 'react-router-dom'

const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
const DIAS_LABEL = { lunes: 'L', martes: 'M', miercoles: 'X', jueves: 'J', viernes: 'V', sabado: 'S', domingo: 'D' }

export default function PerfilCard({ empleada }) {
  return (
    <Link
      to={`/empleadas/${empleada.id}`}
      className="group block bg-white rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:shadow-sm transition-all duration-200 p-5"
    >
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
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <h3 className="font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors text-sm leading-snug">
                {empleada.nombre}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">{empleada.zona} · {empleada.modalidad}</p>
            </div>
            {empleada.verificada && (
              <span className="shrink-0 inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-100">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verificada
              </span>
            )}
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
          <div className="flex items-center justify-between">
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
            <span className="text-xs font-semibold text-zinc-700">
              ${empleada.pretension?.toLocaleString()}<span className="font-normal text-zinc-400">/mes</span>
            </span>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-xs text-zinc-400 mt-4 line-clamp-2 leading-relaxed border-t border-zinc-50 pt-3">
        {empleada.descripcion}
      </p>
    </Link>
  )
}
