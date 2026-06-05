import React, { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import SplashScreen from './components/SplashScreen'
import ProtectedRoute from './components/ProtectedRoute'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Empleadas from './pages/Empleadas'
import PerfilEmpleada from './pages/PerfilEmpleada'
import MiPerfil from './pages/MiPerfil'
import MisFavoritos from './pages/MisFavoritos'

/* Redirige a /welcome si no hizo el onboarding todavía */
function OnboardingGate({ children }) {
  if (!localStorage.getItem('kasei_onboarded')) {
    return <Navigate to="/welcome" replace />
  }
  return children
}

function AppShell() {
  const location = useLocation()
  const isOnboarding = location.pathname === '/welcome'
  const [splashDone, setSplashDone] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      {!isOnboarding && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Onboarding — full screen, sin navbar */}
          <Route path="/welcome" element={<Onboarding />} />

          {/* Home = listado de empleadas (post-onboarding) */}
          <Route path="/" element={<OnboardingGate><Empleadas /></OnboardingGate>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/empleadas" element={<Empleadas />} />
          <Route path="/empleadas/:id" element={<PerfilEmpleada />} />
          <Route path="/mi-perfil" element={<ProtectedRoute><MiPerfil /></ProtectedRoute>} />
          <Route path="/favoritos" element={<MisFavoritos />} />

          <Route path="*" element={
            <div className="flex items-center justify-center min-h-[60vh] text-zinc-400">
              <div className="text-center">
                <p className="text-5xl font-bold mb-4">404</p>
                <p>Página no encontrada</p>
              </div>
            </div>
          } />
        </Routes>
      </main>
      {/* Bottom nav: solo mobile, solo usuarios logueados */}
      {!isOnboarding && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
