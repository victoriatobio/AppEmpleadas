import React, { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import PerfilCard from '../components/PerfilCard'

const HABILIDADES_OPTS = [
  'Limpieza profunda', 'Plancha', 'Organización', 'Cocina casera',
  'Cuidado de niños', 'Cuidado de mascotas', 'Cuidado geriátrico',
]

export default function Empleadas() {
  const { empleadas } = useApp()
  const [habilidadesFiltro, setHabilidadesFiltro] = useState([])

  function toggleHabilidad(h) {
    setHabilidadesFiltro(prev =>
      prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h]
    )
  }

  const resultados = useMemo(() => {
    return empleadas.filter(e => {
      if (habilidadesFiltro.length > 0 && !habilidadesFiltro.some(h => e.habilidades?.includes(h))) return false
      return true
    })
  }, [empleadas, habilidadesFiltro])

  const hasFilters = habilidadesFiltro.length > 0

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <p className="section-label">Explorar</p>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Empleadas disponibles
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          {resultados.length} perfil{resultados.length !== 1 ? 'es' : ''} encontrado{resultados.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Filtro habilidades */}
      <div className="mb-6">
        <p className="text-xs text-zinc-400 mb-2 font-medium uppercase tracking-wide">Habilidades</p>
        <div className="flex flex-wrap gap-2">
          {HABILIDADES_OPTS.map(h => (
            <button
              key={h}
              onClick={() => toggleHabilidad(h)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                habilidadesFiltro.includes(h)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-blue-300'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
        {hasFilters && (
          <button
            onClick={() => setHabilidadesFiltro([])}
            className="text-xs text-zinc-400 hover:text-red-500 mt-3 transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Grid */}
      {resultados.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-medium text-zinc-600 mb-1">Sin resultados</p>
          <p className="text-sm text-zinc-400 mb-4">Probá con otros términos</p>
          <button
            onClick={() => setHabilidadesFiltro([])}
            className="text-sm text-blue-600 hover:underline"
          >
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {resultados.map(e => <PerfilCard key={e.id} empleada={e} />)}
        </div>
      )}
    </div>
  )
}
