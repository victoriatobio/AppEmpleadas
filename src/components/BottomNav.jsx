import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function NavIcon({ path, icon, label }) {
  const location = useLocation()
  const active = location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <Link to={path} className="flex flex-col items-center gap-0.5 flex-1 py-2 relative">
      <div className={`relative transition-colors ${active ? 'text-blue-600' : 'text-zinc-400'}`}>
        {icon}
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
  const { user } = useApp()
  const location = useLocation()

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
