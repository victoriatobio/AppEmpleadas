import React, { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import PerfilCard from '../components/PerfilCard'

const SERVICIOS_OPTS = ['Limpieza', 'Plancha', 'Cocina', 'Cuidado de niños', 'Cuidado de adultos mayores', 'Jardinería']
const MODALIDADES = ['Por horas', 'Cama adentro', 'Cama afuera']
const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
const DIAS_LABEL = { lunes: 'L', martes: 'M', miercoles: 'X', jueves: 'J', viernes: 'V', sabado: 'S', domingo: 'D' }

export default function Empleadas() {
  const { empleadas } = useApp()
  const [busqueda, setBusqueda] = useState('')
  const [servicioFiltro, setServicioFiltro] = useState([])
  const [modalidadFiltro, setModalidadFiltro] = useState('')
  const [diasFiltro, setDiasFiltro] = useState([])
  const [soloVerificadas, setSoloVerificadas] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const resultados = useMemo(() => {
    return empleadas.filter(e => {
      if (busqueda) {
        const q = busqueda.toLowerCase()
        if (
          !e.nombre.toLowerCase().includes(q) &&
          !e.zona.toLowerCase().includes(q) &&
          !e.barrios?.some(b => b.toLowerCase().includes(q)) &&
          !e.descripcion?.toLowerCase().includes(q)
        ) return false
      }
      if (servicioFiltro.length > 0 && !servicioFiltro.some(s => e.servicios.includes(s))) return false
      if (modalidadFiltro && e.modalidad !== modalidadFiltro) return false
      if (diasFiltro.length > 0 && !diasFiltro.every(dia => e.disponibilidad?.[dia])) return false
      if (soloVerificadas && !e.verificada) return false
      return true
    })
  }, [empleadas, busqueda, servicioFiltro, modalidadFiltro, diasFiltro, soloVerificadas])

  const hasFilters = busqueda || servicioFiltro.length > 0 || modalidadFiltro || diasFiltro.length > 0 || soloVerificadas

  function toggleServicio(s) {
    setServicioFiltro(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])
  }

  function toggleDia(dia) {
    setDiasFiltro(p => p.includes(dia) ? p.filter(d => d !== dia) : [...p, dia])
  }

  function clearFilters() {
    setBusqueda(''); setServicioFiltro([]); setModalidadFiltro(''); setDiasFiltro([]); setSoloVerificadas(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="section-label">Explorar</p>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Empleadas disponibles
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          {resultados.length} perfil{resultados.length !== 1 ? 'es' : ''} encontrado{resultados.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Search + filter */}
      <div className="flex gap-2.5 mb-6">
        <div className="relative flex-1">
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
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
            filtersOpen || hasFilters
              ? 'border-blue-300 text-blue-600 bg-blue-50'
              : 'border-zinc-200 text-zinc-600 bg-white hover:bg-zinc-50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros
          {hasFilters && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
        </button>
      </div>

      {/* Filters */}
      {filtersOpen && (
        <div className="bg-zinc-50 rounded-2xl border border-zinc-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Filtros</span>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs text-zinc-400 hover:text-red-500 transition-colors">
                Limpiar
              </button>
            )}
          </div>
          <div className="space-y-4">
            {/* Días disponibles */}
            <div>
              <p className="text-xs text-zinc-400 mb-2">Días disponibles</p>
              <div className="flex gap-1.5 flex-wrap">
                {DIAS.map(dia => (
                  <button
                    key={dia}
                    onClick={() => toggleDia(dia)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold border transition-all ${
                      diasFiltro.includes(dia)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-zinc-500 border-zinc-200 hover:border-blue-300'
                    }`}
                  >
                    {DIAS_LABEL[dia]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-zinc-400 mb-2">Servicios</p>
              <div className="flex flex-wrap gap-2">
                {SERVICIOS_OPTS.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleServicio(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      servicioFiltro.includes(s)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-zinc-600 border-zinc-200 hover:border-blue-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 pt-1">
              <div>
                <p className="text-xs text-zinc-400 mb-2">Modalidad</p>
                <select value={modalidadFiltro} onChange={e => setModalidadFiltro(e.target.value)} className="input">
                  <option value="">Todas</option>
                  {MODALIDADES.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    onClick={() => setSoloVerificadas(!soloVerificadas)}
                    className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative ${soloVerificadas ? 'bg-blue-600' : 'bg-zinc-200'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${soloVerificadas ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-sm text-zinc-700">Solo verificadas</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {resultados.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-medium text-zinc-600 mb-1">Sin resultados</p>
          <p className="text-sm text-zinc-400 mb-4">Probá con otros filtros</p>
          <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">Limpiar filtros</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {resultados.map(e => <PerfilCard key={e.id} empleada={e} />)}
        </div>
      )}
    </div>
  )
}
