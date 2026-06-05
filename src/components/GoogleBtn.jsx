import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const IS_DEMO = !import.meta.env.VITE_GOOGLE_CLIENT_ID

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.705 17.64 9.2z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  )
}

export default function GoogleBtn({ tipo = 'empleadora', label = 'Continuar con Google', redirectTo }) {
  const { loginWithGoogle } = useApp()
  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`)
        const info = await res.json()
        const result = loginWithGoogle({
          email: info.email,
          nombre: info.name,
          foto: info.picture,
          googleId: info.sub,
          tipo,
        })
        if (result.ok) {
          navigate(redirectTo || (result.user.tipo === 'empleada' ? '/mi-perfil' : '/empleadas'))
        }
      } catch {
        console.error('Error fetching Google user info')
      }
    },
    onError: () => console.error('Google login error'),
  })

  function handleClick() {
    if (IS_DEMO) {
      // Modo demo sin Client ID configurado
      const result = loginWithGoogle({
        email: `google.demo@gmail.com`,
        nombre: 'Demo Google User',
        foto: null,
        googleId: 'demo_google_123',
        tipo,
      })
      if (result.ok) {
        navigate(redirectTo || (result.user.tipo === 'empleada' ? '/mi-perfil' : '/empleadas'))
      }
      return
    }
    googleLogin()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-3 border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-medium text-sm px-4 py-2.5 rounded-xl transition-all active:scale-[0.98]"
    >
      <GoogleLogo />
      {label}
      {IS_DEMO && <span className="text-[10px] text-zinc-400">(demo)</span>}
    </button>
  )
}
