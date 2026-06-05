import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'ahora'
  if (min < 60) return `hace ${min} min`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `hace ${hr}h`
  return `hace ${Math.floor(hr / 24)}d`
}

export default function Mensajes() {
  const { user, users, mensajes, markRead, sendMessage } = useApp()
  const [selectedId, setSelectedId] = useState(null)
  const [reply, setReply] = useState('')

  const myMensajes = mensajes.filter(m => m.fromId === user.id || m.toId === user.id)

  const conversaciones = Object.values(
    myMensajes.reduce((acc, m) => {
      const partnerId = m.fromId === user.id ? m.toId : m.fromId
      if (!acc[partnerId]) {
        acc[partnerId] = { partnerId, msgs: [], lastMsg: m, unread: 0 }
      }
      acc[partnerId].msgs.push(m)
      if (new Date(m.createdAt) > new Date(acc[partnerId].lastMsg.createdAt)) {
        acc[partnerId].lastMsg = m
      }
      if (m.toId === user.id && !m.read) acc[partnerId].unread++
      return acc
    }, {})
  ).sort((a, b) => new Date(b.lastMsg.createdAt) - new Date(a.lastMsg.createdAt))

  const selected = conversaciones.find(c => c.partnerId === selectedId)
  const partner = users.find(u => u.id === selectedId)

  useEffect(() => {
    if (selected) {
      selected.msgs.filter(m => m.toId === user.id && !m.read).forEach(m => markRead(m.id))
    }
  }, [selectedId, mensajes])

  const threadMsgs = selected?.msgs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) || []

  function handleReply(e) {
    e.preventDefault()
    if (!reply.trim() || !selectedId) return
    sendMessage(selectedId, reply.trim())
    setReply('')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif text-2xl font-bold text-stone-800 mb-6">Mensajes</h1>

      {conversaciones.length === 0 ? (
        <div className="card p-12 text-center">
          <svg className="w-12 h-12 text-stone-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-stone-500 font-medium mb-2">No tenés mensajes aún</p>
          {user.tipo === 'empleadora' && (
            <p className="text-stone-400 text-sm">
              <Link to="/empleadas" className="text-blue-700 hover:underline">Explorá perfiles</Link> y enviá tu primer mensaje
            </p>
          )}
          {user.tipo === 'empleada' && (
            <p className="text-stone-400 text-sm">Las empleadoras podrán contactarte cuando vean tu perfil</p>
          )}
        </div>
      ) : (
        <div className="card overflow-hidden grid" style={{ gridTemplateColumns: selectedId ? '280px 1fr' : '1fr', minHeight: '500px' }}>
          {/* Lista */}
          <div className={`border-r border-stone-100 ${selectedId ? 'hidden sm:block' : ''}`}>
            {conversaciones.map(conv => {
              const p = users.find(u => u.id === conv.partnerId)
              return (
                <button
                  key={conv.partnerId}
                  onClick={() => setSelectedId(conv.partnerId)}
                  className={`w-full text-left px-4 py-4 border-b border-stone-50 hover:bg-stone-50 transition-colors flex items-start gap-3 ${selectedId === conv.partnerId ? 'bg-blue-50' : ''}`}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                    {p?.nombre?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-stone-800 text-sm truncate">{p?.nombre || 'Usuario'}</p>
                      <span className="text-xs text-stone-400 shrink-0">{timeAgo(conv.lastMsg.createdAt)}</span>
                    </div>
                    <p className="text-xs text-stone-400 truncate mt-0.5">{conv.lastMsg.text}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-blue-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                      {conv.unread}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Thread */}
          {selectedId ? (
            <div className="flex flex-col">
              <div className="px-5 py-3 border-b border-stone-100 flex items-center gap-3">
                <button onClick={() => setSelectedId(null)} className="sm:hidden text-stone-400 hover:text-stone-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                  {partner?.nombre?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-sm">{partner?.nombre}</p>
                  {partner?.tipo === 'empleada' && (
                    <Link to={`/empleadas/${partner.id}`} className="text-xs text-blue-600 hover:underline">Ver perfil</Link>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ maxHeight: '380px' }}>
                {threadMsgs.map(m => {
                  const isMine = m.fromId === user.id
                  return (
                    <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMine ? 'bg-blue-700 text-white rounded-tr-sm' : 'bg-stone-100 text-stone-700 rounded-tl-sm'}`}>
                        <p>{m.text}</p>
                        <p className={`text-xs mt-1 ${isMine ? 'text-blue-200' : 'text-stone-400'}`}>{timeAgo(m.createdAt)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <form onSubmit={handleReply} className="p-4 border-t border-stone-100 flex gap-2">
                <input
                  type="text"
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  className="input flex-1"
                  placeholder="Escribí tu respuesta..."
                />
                <button type="submit" className="btn-primary !px-4 !py-2 text-sm shrink-0">Enviar</button>
              </form>
            </div>
          ) : (
            <div className="hidden sm:flex items-center justify-center text-stone-300 text-sm">
              Seleccioná una conversación
            </div>
          )}
        </div>
      )}
    </div>
  )
}
