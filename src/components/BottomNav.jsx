import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function NavIcon({ path, icon, label, badge }) {
  const location = useLocation()
  const active = location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <Link to={path} className="flex flex-col items-center gap-0.5 flex-1 py-2 relative">
      <div className={`relative transition-colors ${active ? 'text-blue-600' : 'text-zinc-400'}`}>
        {icon}
        {badge > 0 && (
          <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </div>
      <span className={`text-[10px] font-medium transition-colors ${active ? 'text-blue-600' : 'text-zinc-400'}`}>
        {label}
      </span>
      {active && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full" />
      )}
    </Link>
  )
}

export default function BottomNav() {
  const { user, unreadCount } = useApp()
  const location = useLocation()

  // Solo en mobile, solo para usuarios logueados, ocultamos en ciertas rutas
  const hideRoutes = ['/welcome', '/login', '/registro']
  if (!user) return null
  if (hideRoutes.some(r => location.pathname.startsWith(r))) return null

  return (
    <>
      {/* Spacer para que el contenido no quede tapado */}
      <div className="sm:hidden h-16" />

      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-zinc-100">
        <div className="flex items-stretch" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <NavIcon
            path="/empleadas"
            label="Buscar"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          <NavIcon
            path="/mensajes"
            label="Mensajes"
            badge={unreadCount}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            }
          />
          <NavIcon
            path="/mi-perfil"
            label="Perfil"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
        </div>
      </nav>
    </>
  )
}
