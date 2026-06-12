import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const DIAS_LABEL = { lunes: 'Lun', martes: 'Mar', miercoles: 'Mié', jueves: 'Jue', viernes: 'Vie', sabado: 'Sáb', domingo: 'Dom' }

function BackLink() {
  return (
    <Link to="/empleadas" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors mb-8">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      Volver
    </Link>
  )
}

export default function PerfilEmpleada() {
  const { id } = useParams()
  const { empleadas, user, favorites, toggleFavorite } = useApp()
  const navigate = useNavigate()
  const [showRefs, setShowRefs] = useState(false)

  const emp = empleadas.find(u => u.id === id)

  if (!emp) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-zinc-400 mb-4">Perfil no encontrado.</p>
        <Link to="/empleadas" className="text-sm text-blue-600 hover:underline">← Ver empleadas</Link>
      </div>
    )
  }

  const isOwn = user?.id === emp.id
  const isFav = !!user && favorites.includes(emp.id)

  function handleFav() {
    if (!user) { navigate('/login'); return }
    toggleFavorite(emp.id)
  }

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
      <BackLink />

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-6 mb-5">
        <div className="flex gap-5 items-start">
          {emp.foto ? (
            <img src={emp.foto} alt={emp.nombre} className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-sm" />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl font-bold shrink-0">
              {emp.nombre.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h1 className="text-xl font-bold text-zinc-900 tracking-tight">{emp.nombre}</h1>
                <p className="text-sm text-zinc-400 mt-0.5">{emp.zona} · {emp.modalidad}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {!isOwn && (
                  <button
                    onClick={handleFav}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 bg-white hover:scale-110 active:scale-95 transition-all shadow-sm"
                    aria-label={isFav ? 'Quitar de favoritas' : 'Guardar como favorita'}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill={isFav ? '#F43F5E' : 'none'} stroke={isFav ? '#F43F5E' : '#A1A1AA'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {emp.servicios.map(s => (
                <span key={s} className="text-xs bg-zinc-100 text-zinc-500 px-2.5 py-0.5 rounded-full">{s}</span>
              ))}
            </div>
          </div>
        </div>
        {emp.descripcion && (
          <p className="text-sm text-zinc-600 leading-relaxed mt-5 pt-5 border-t border-zinc-50">{emp.descripcion}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {/* Info columns */}
        <div className="sm:col-span-2 space-y-4">

          {/* Disponibilidad */}
          <div className="bg-white rounded-2xl border border-zinc-100 p-5">
            <p className="section-label">Disponibilidad</p>
            <div className="flex gap-1.5 flex-wrap mb-3">
              {Object.entries(DIAS_LABEL).map(([dia, label]) => (
                <span key={dia} className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${emp.disponibilidad?.[dia] ? 'bg-blue-100 text-blue-700' : 'bg-zinc-50 text-zinc-300'}`}>
                  {label}
                </span>
              ))}
            </div>
            <div className="space-y-1 text-sm text-zinc-600">
              {emp.horariosDisponibles && <p><span className="text-zinc-400">Horario: </span>{emp.horariosDisponibles}</p>}
              <p><span className="text-zinc-400">Modalidad: </span>{emp.modalidad}</p>
              {emp.barrios?.length > 0 && <p><span className="text-zinc-400">Zonas: </span>{emp.barrios.join(', ')}</p>}
            </div>
          </div>

          {/* Experiencia */}
          <div className="bg-white rounded-2xl border border-zinc-100 p-5">
            <p className="section-label">Experiencia y habilidades</p>
            {emp.experiencia > 0 ? (
              <p className="text-sm text-zinc-700 mb-3">
                <span className="font-semibold text-zinc-900">{emp.experiencia} año{emp.experiencia !== 1 ? 's' : ''}</span> de experiencia
              </p>
            ) : (
              <p className="text-sm text-zinc-400 mb-3">Sin experiencia previa registrada</p>
            )}
            {emp.habilidades?.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {emp.habilidades.map(h => (
                  <span key={h} className="text-xs bg-zinc-100 text-zinc-500 px-2.5 py-1 rounded-full">{h}</span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-400">Sin habilidades cargadas</p>
            )}
          </div>

          {/* Referencias */}
          {emp.referencias?.length > 0 && (
            <div className="bg-white rounded-2xl border border-zinc-100 p-5">
              <p className="section-label">Referencias</p>
              {!user ? (
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <p className="text-sm text-amber-800 font-medium mb-1">Necesitás cuenta para ver las referencias</p>
                  <Link to="/login" className="text-sm text-blue-600 font-medium hover:underline">Ingresar →</Link>
                </div>
              ) : !showRefs ? (
                <button onClick={() => setShowRefs(true)} className="btn-secondary text-sm">
                  Ver referencias ({emp.referencias.length})
                </button>
              ) : (
                <div className="space-y-3">
                  {emp.referencias.map((ref, i) => (
                    <div key={i} className="bg-zinc-50 rounded-xl p-4">
                      <p className="font-medium text-zinc-900 text-sm">{ref.nombre}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{ref.relacion}</p>
                      <a
                        href={`https://wa.me/${ref.whatsapp?.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-sm text-blue-600 font-medium hover:underline"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                          <path d="M11.923 0C5.344 0 0 5.344 0 11.923c0 2.097.547 4.064 1.504 5.771L0 24l6.455-1.695A11.875 11.875 0 0011.923 23.846C18.502 23.846 24 18.502 24 11.923 24 5.344 18.502 0 11.923 0zm0 21.77a9.84 9.84 0 01-5.018-1.372l-.359-.214-3.724.978 1-3.636-.236-.375A9.847 9.847 0 012.077 11.923c0-5.43 4.416-9.846 9.846-9.846 5.43 0 9.846 4.416 9.846 9.846 0 5.43-4.416 9.847-9.846 9.847z"/>
                        </svg>
                        {ref.whatsapp}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Contact box */}
          {isOwn ? (
            <div className="bg-white rounded-2xl border border-zinc-100 p-5 text-center">
              <p className="text-sm text-zinc-400 mb-3">Este es tu perfil</p>
              <Link to="/mi-perfil" className="btn-primary w-full">Editar perfil</Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-zinc-100 p-5">
              <p className="font-semibold text-zinc-900 text-sm mb-3">
                Contactar a {emp.nombre.split(' ')[0]}
              </p>
              {!user ? (
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-medium text-sm px-4 py-3 rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M11.923 0C5.344 0 0 5.344 0 11.923c0 2.097.547 4.064 1.504 5.771L0 24l6.455-1.695A11.875 11.875 0 0011.923 23.846C18.502 23.846 24 18.502 24 11.923 24 5.344 18.502 0 11.923 0zm0 21.77a9.84 9.84 0 01-5.018-1.372l-.359-.214-3.724.978 1-3.636-.236-.375A9.847 9.847 0 012.077 11.923c0-5.43 4.416-9.846 9.846-9.846 5.43 0 9.846 4.416 9.846 9.846 0 5.43-4.416 9.847-9.846 9.847z"/>
                  </svg>
                  Iniciá sesión para contactar
                </button>
              ) : emp.whatsapp ? (
                <a
                  href={`https://wa.me/${emp.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-medium text-sm px-4 py-3 rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M11.923 0C5.344 0 0 5.344 0 11.923c0 2.097.547 4.064 1.504 5.771L0 24l6.455-1.695A11.875 11.875 0 0011.923 23.846C18.502 23.846 24 18.502 24 11.923 24 5.344 18.502 0 11.923 0zm0 21.77a9.84 9.84 0 01-5.018-1.372l-.359-.214-3.724.978 1-3.636-.236-.375A9.847 9.847 0 012.077 11.923c0-5.43 4.416-9.846 9.846-9.846 5.43 0 9.846 4.416 9.846 9.846 0 5.43-4.416 9.847-9.846 9.847z"/>
                  </svg>
                  Escribir por WhatsApp
                </a>
              ) : (
                <p className="text-xs text-zinc-400">Esta empleada aún no cargó su WhatsApp.</p>
              )}
            </div>
          )}

          {/* Quick stats */}
          <div className="bg-white rounded-2xl border border-zinc-100 p-5">
            {[
              { label: 'Experiencia', val: emp.experiencia > 0 ? `${emp.experiencia} año${emp.experiencia !== 1 ? 's' : ''}` : 'Sin experiencia previa' },
              { label: 'Modalidad', val: emp.modalidad },
              { label: 'Referencias', val: emp.referencias?.length > 0 ? emp.referencias.length : 'Sin referencias' },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-zinc-50 last:border-0">
                <span className="text-xs text-zinc-400">{label}</span>
                <span className="text-xs font-semibold text-zinc-700">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
