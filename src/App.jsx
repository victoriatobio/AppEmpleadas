import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Empleadas from './pages/Empleadas'
import PerfilEmpleada from './pages/PerfilEmpleada'
import MiPerfil from './pages/MiPerfil'
import Mensajes from './pages/Mensajes'

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/empleadas" element={<Empleadas />} />
            <Route path="/empleadas/:id" element={<PerfilEmpleada />} />
            <Route path="/mi-perfil" element={<ProtectedRoute><MiPerfil /></ProtectedRoute>} />
            <Route path="/mensajes" element={<ProtectedRoute><Mensajes /></ProtectedRoute>} />
            <Route path="*" element={
              <div className="flex items-center justify-center min-h-[60vh] text-stone-400">
                <div className="text-center">
                  <p className="text-5xl font-bold mb-4">404</p>
                  <p>Página no encontrada</p>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </AppProvider>
  )
}
