import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const DIAS_LABEL = { lunes: 'Lun', martes: 'Mar', miercoles: 'Mié', jueves: 'Jue', viernes: 'Vie', sabado: 'Sáb', domingo: 'Dom' }
const SERVICIOS_OPTS = ['Limpieza', 'Plancha', 'Cocina', 'Cuidado de niños', 'Cuidado de adultos mayores', 'Jardinería', 'Compras/mandados']

export default function MiPerfil() {
  const { user, updateProfile, logout } = useApp()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    descripcion: user?.descripcion || '',
    habilidades: user?.habilidades?.join(', ') || '',
    pretension: user?.pretension || '',
    horariosDisponibles: user?.horariosDisponibles || '',
    servicios: user?.servicios || [],
    disponibilidad: user?.disponibilidad || {},
    zona: user?.zona || '',
    barrios: user?.barrios?.join(', ') || '',
    modalidad: user?.modalidad || 'Por horas',
    ref1nombre: user?.referencias?.[0]?.nombre || '',
    ref1wp: user?.referencias?.[0]?.whatsapp || '',
    ref1rel: user?.referencias?.[0]?.relacion || '',
    ref2nombre: user?.referencias?.[1]?.nombre || '',
    ref2wp: user?.referencias?.[1]?.whatsapp || '',
    ref2rel: user?.referencias?.[1]?.relacion || '',
    descripcionHogar: user?.descripcionHogar || '',
    horariosRequeridos: user?.horariosRequeridos || '',
    barrio: user?.barrio || '',
    serviciosBuscados: user?.serviciosBuscados || [],
    modalidadBuscada: user?.modalidadBuscada || 'Por horas',
  })

  if (!user) return null

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function toggleServicio(s, field) {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(s) ? f[field].filter(x => x !== s) : [...f[field], s],
    }))
  }

  function toggleDia(dia) {
    setForm(f => ({ ...f, disponibilidad: { ...f.disponibilidad, [dia]: !f.disponibilidad[dia] } }))
  }

  function handleSave(e) {
    e.preventDefault()
    const updates = { descripcion: form.descripcion, zona: form.zona }
    if (user.tipo === 'empleada') {
      updates.habilidades = form.habilidades.split(',').map(s => s.trim()).filter(Boolean)
      updates.pretension = Number(form.pretension) || 0
      updates.horariosDisponibles = form.horariosDisponibles
      updates.servicios = form.servicios
      updates.disponibilidad = form.disponibilidad
      updates.barrios = form.barrios.split(',').map(s => s.trim()).filter(Boolean)
      updates.modalidad = form.modalidad
      updates.referencias = [
        form.ref1nombre && { nombre: form.ref1nombre, whatsapp: form.ref1wp, relacion: form.ref1rel },
        form.ref2nombre && { nombre: form.ref2nombre, whatsapp: form.ref2wp, relacion: form.ref2rel },
      ].filter(Boolean)
    } else {
      updates.descripcionHogar = form.descripcionHogar
      updates.horariosRequeridos = form.horariosRequeridos
      updates.barrio = form.barrio
      updates.serviciosBuscados = form.serviciosBuscados
      updates.modalidadBuscada = form.modalidadBuscada
    }
    updateProfile(updates)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-stone-800">Mi perfil</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-blue-700 font-medium">✓ Guardado</span>}
          {!editing ? (
            <button onClick={() => setEditing(true)} className="btn-secondary text-sm !py-2">Editar</button>
          ) : (
            <button onClick={() => setEditing(false)} className="text-sm text-stone-400 hover:text-stone-600">Cancelar</button>
          )}
        </div>
      </div>

      {/* Header card */}
      <div className="card p-6 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-bold shrink-0">
            {user.nombre.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-stone-800">{user.nombre}</h2>
            <p className="text-stone-500 text-sm capitalize">{user.tipo === 'empleada' ? 'Empleada' : 'Empleadora'}</p>
            <p className="text-stone-400 text-xs mt-0.5">{user.email}</p>
          </div>
        </div>
        {user.tipo === 'empleada' && (
          <div className="mt-4 pt-4 border-t border-stone-100">
            <Link to={`/empleadas/${user.id}`} className="text-sm text-blue-700 font-medium hover:underline">
              Ver mi perfil público →
            </Link>
          </div>
        )}
      </div>

      <form onSubmit={handleSave}>
        {user.tipo === 'empleada' && (
          <>
            <div className="card p-5 mb-4">
              <h3 className="font-semibold text-stone-700 text-sm uppercase tracking-wide mb-4">Ubicación</h3>
              <div className="space-y-3">
                <div>
                  <label className="label">Zona principal</label>
                  {editing ? <input name="zona" value={form.zona} onChange={handleChange} className="input" /> : <p className="text-stone-700 text-sm">{user.zona || '—'}</p>}
                </div>
                <div>
                  <label className="label">Barrios donde trabajás</label>
                  {editing ? <input name="barrios" value={form.barrios} onChange={handleChange} className="input" placeholder="Separados por coma" /> : <p className="text-stone-700 text-sm">{user.barrios?.join(', ') || '—'}</p>}
                </div>
              </div>
            </div>

            <div className="card p-5 mb-4">
              <h3 className="font-semibold text-stone-700 text-sm uppercase tracking-wide mb-4">Disponibilidad</h3>
              <div className="space-y-3">
                {editing ? (
                  <>
                    <div>
                      <label className="label mb-2">Días disponibles</label>
                      <div className="flex gap-2 flex-wrap">
                        {Object.keys(DIAS_LABEL).map(dia => (
                          <button key={dia} type="button" onClick={() => toggleDia(dia)}
                            className={`w-10 h-10 rounded-full text-xs font-semibold border transition-colors ${form.disponibilidad[dia] ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-stone-500 border-stone-200'}`}>
                            {DIAS_LABEL[dia]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="label">Horario</label>
                      <input name="horariosDisponibles" value={form.horariosDisponibles} onChange={handleChange} className="input" placeholder="Ej: 8:00 – 18:00" />
                    </div>
                    <div>
                      <label className="label">Modalidad</label>
                      <select name="modalidad" value={form.modalidad} onChange={handleChange} className="input">
                        <option>Por horas</option><option>Cama adentro</option><option>Cama afuera</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2 flex-wrap">
                      {Object.entries(DIAS_LABEL).map(([dia, label]) => (
                        <span key={dia} className={`w-10 h-10 rounded-full text-xs flex items-center justify-center font-semibold ${user.disponibilidad?.[dia] ? 'bg-blue-100 text-blue-700' : 'bg-stone-100 text-stone-300'}`}>{label}</span>
                      ))}
                    </div>
                    <p className="text-sm text-stone-600">{user.horariosDisponibles || '—'} · {user.modalidad}</p>
                  </>
                )}
              </div>
            </div>

            <div className="card p-5 mb-4">
              <h3 className="font-semibold text-stone-700 text-sm uppercase tracking-wide mb-4">Servicios y CV</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Servicios</label>
                  {editing ? (
                    <div className="flex flex-wrap gap-2">
                      {SERVICIOS_OPTS.map(s => (
                        <button key={s} type="button" onClick={() => toggleServicio(s, 'servicios')}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${form.servicios.includes(s) ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-stone-600 border-stone-200'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {user.servicios?.map(s => <span key={s} className="badge bg-stone-100 text-stone-600">{s}</span>)}
                    </div>
                  )}
                </div>
                <div>
                  <label className="label">Descripción</label>
                  {editing ? <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="input resize-y" rows={4} /> : <p className="text-stone-600 text-sm leading-relaxed">{user.descripcion || '—'}</p>}
                </div>
                <div>
                  <label className="label">Habilidades (separadas por coma)</label>
                  {editing ? <input name="habilidades" value={form.habilidades} onChange={handleChange} className="input" /> : (
                    <div className="flex flex-wrap gap-1.5">
                      {user.habilidades?.map(h => <span key={h} className="badge bg-stone-100 text-stone-600">{h}</span>)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card p-5 mb-4">
              <h3 className="font-semibold text-stone-700 text-sm uppercase tracking-wide mb-4">Referencias</h3>
              {editing ? (
                <div className="space-y-4">
                  {[{ p: 'ref1', l: 'Referencia 1' }, { p: 'ref2', l: 'Referencia 2' }].map(({ p, l }) => (
                    <div key={p} className="bg-stone-50 rounded-lg p-4 space-y-2">
                      <p className="text-xs font-semibold text-stone-500 uppercase">{l}</p>
                      <input name={`${p}nombre`} value={form[`${p}nombre`]} onChange={handleChange} className="input" placeholder="Nombre" />
                      <input name={`${p}wp`} value={form[`${p}wp`]} onChange={handleChange} className="input" placeholder="WhatsApp" />
                      <input name={`${p}rel`} value={form[`${p}rel`]} onChange={handleChange} className="input" placeholder="Relación" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {user.referencias?.length > 0 ? user.referencias.map((ref, i) => (
                    <div key={i} className="bg-stone-50 rounded-lg p-3">
                      <p className="font-medium text-stone-700 text-sm">{ref.nombre}</p>
                      <p className="text-xs text-stone-400">{ref.relacion} · {ref.whatsapp}</p>
                    </div>
                  )) : <p className="text-stone-400 text-sm">Sin referencias cargadas aún</p>}
                </div>
              )}
            </div>
          </>
        )}

        {user.tipo === 'empleadora' && (
          <div className="card p-5 mb-4">
            <h3 className="font-semibold text-stone-700 text-sm uppercase tracking-wide mb-4">Tu hogar</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Zona</label>
                {editing ? <input name="zona" value={form.zona} onChange={handleChange} className="input" /> : <p className="text-stone-700 text-sm">{user.zona || '—'}</p>}
              </div>
              <div>
                <label className="label">Barrio</label>
                {editing ? <input name="barrio" value={form.barrio} onChange={handleChange} className="input" /> : <p className="text-stone-700 text-sm">{user.barrio || '—'}</p>}
              </div>
              <div>
                <label className="label">Servicios que buscás</label>
                {editing ? (
                  <div className="flex flex-wrap gap-2">
                    {SERVICIOS_OPTS.map(s => (
                      <button key={s} type="button" onClick={() => toggleServicio(s, 'serviciosBuscados')}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${form.serviciosBuscados.includes(s) ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-stone-600 border-stone-200'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {user.serviciosBuscados?.map(s => <span key={s} className="badge bg-stone-100 text-stone-600">{s}</span>)}
                  </div>
                )}
              </div>
              <div>
                <label className="label">Descripción del hogar</label>
                {editing ? <textarea name="descripcionHogar" value={form.descripcionHogar} onChange={handleChange} className="input resize-y" rows={3} /> : <p className="text-stone-600 text-sm leading-relaxed">{user.descripcionHogar || '—'}</p>}
              </div>
            </div>
          </div>
        )}

        {editing && <button type="submit" className="btn-primary w-full">Guardar cambios</button>}
      </form>

      {/* Logout — siempre visible al fondo */}
      <div className="mt-8 pt-6 border-t border-zinc-100">
        <button
          onClick={() => { logout(); navigate('/') }}
          className="w-full flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-red-500 transition-colors py-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar sesión
        </button>
      </div>

      {/* Espaciado extra en mobile para el bottom nav */}
      <div className="sm:hidden h-4" />
    </div>
  )
}
