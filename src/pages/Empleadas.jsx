import React, { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import PerfilCard from '../components/PerfilCard'

export default function Empleadas() {
  const { empleadas } = useApp()
  const [busqueda, setBusqueda] = useState('')
  const [modalidadFiltro, setModalidadFiltro] = useState('') // '' | 'cama' | 'retiro'

  const resultados = useMemo(() => {
    return empleadas.filter(e => {
      if (busqueda) {
        const q = busqueda.toLowerCase()
        if (
          !e.nombre.toLowerCase().includes(q) &&
          !e.zona?.toLowerCase().includes(q) &&
          !e.barrios?.some(b => b.toLowerCase().includes(q)) &&
          !e.descripcion?.toLowerCase().includes(q)
        ) return false
      }
      if (modalidadFiltro === 'cama' && e.modalidad !== 'Cama adentro') return false
      if (modalidadFiltro === 'retiro' && e.modalidad === 'Cama adentro') return false
      return true
    })
  }, [empleadas, busqueda, modalidadFiltro])

  const PILLS = [
    { val: '', label: 'Todas' },
    { val: 'cama', label: 'Con cama' },
    { val: 'retiro', label: 'Con retiro' },
  ]

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

      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="input pl-10"
          placeholder="Nombre, zona o barrio..."
        />
      </div>

      {/* Filtro modalidad */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {PILLS.map(({ val, label }) => (
          <button
            key={val}
            onClick={() => setModalidadFiltro(val)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              modalidadFiltro === val
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-zinc-600 border-zinc-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {label}
          </button>
        ))}
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
            onClick={() => { setBusqueda(''); setModalidadFiltro('') }}
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
