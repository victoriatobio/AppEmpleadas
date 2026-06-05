import React, { createContext, useContext, useState, useEffect } from 'react'
import { mockEmpleadas, mockEmpleadoras, initialMensajes } from '../data/mockData'

const AppContext = createContext(null)

const STORAGE_KEYS = {
  user: 'kasei_user',
  users: 'kasei_users',
  mensajes: 'kasei_mensajes',
}

function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => loadStorage(STORAGE_KEYS.user, null))
  const [users, setUsers] = useState(() => {
    const saved = loadStorage(STORAGE_KEYS.users, null)
    if (saved) return saved
    const all = [...mockEmpleadas, ...mockEmpleadoras]
    saveStorage(STORAGE_KEYS.users, all)
    return all
  })
  const [mensajes, setMensajes] = useState(() => loadStorage(STORAGE_KEYS.mensajes, initialMensajes))

  useEffect(() => { saveStorage(STORAGE_KEYS.user, user) }, [user])
  useEffect(() => { saveStorage(STORAGE_KEYS.users, users) }, [users])
  useEffect(() => { saveStorage(STORAGE_KEYS.mensajes, mensajes) }, [mensajes])

  function login(email, password) {
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { ok: false, error: 'Email o contraseña incorrectos' }
    setUser(found)
    return { ok: true, user: found }
  }

  function logout() {
    setUser(null)
  }

  function register(data) {
    if (users.find(u => u.email === data.email)) {
      return { ok: false, error: 'Ya existe una cuenta con ese email' }
    }
    const newUser = { ...data, id: `u_${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] }
    const updated = [...users, newUser]
    setUsers(updated)
    setUser(newUser)
    return { ok: true, user: newUser }
  }

  function loginWithGoogle({ email, nombre, foto, googleId, tipo = 'empleadora' }) {
    const found = users.find(u => u.email === email)
    if (found) {
      setUser(found)
      return { ok: true, user: found }
    }
    const newUser = {
      id: `u_${Date.now()}`,
      email,
      nombre,
      foto: foto || null,
      googleId,
      password: null,
      tipo,
      verificada: false,
      zona: '',
      barrios: [],
      servicios: [],
      modalidad: 'Por horas',
      disponibilidad: {},
      horariosDisponibles: '',
      experiencia: 0,
      pretension: 0,
      whatsapp: '',
      habilidades: [],
      referencias: [],
      descripcion: '',
      createdAt: new Date().toISOString().split('T')[0],
    }
    const updated = [...users, newUser]
    setUsers(updated)
    setUser(newUser)
    return { ok: true, user: newUser, isNew: true }
  }

  function updateProfile(updates) {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u))
  }

  function sendMessage(toId, text) {
    const msg = {
      id: `m_${Date.now()}`,
      fromId: user.id,
      fromNombre: user.nombre,
      toId,
      text,
      createdAt: new Date().toISOString(),
      read: false,
    }
    setMensajes(prev => [...prev, msg])
  }

  function markRead(msgId) {
    setMensajes(prev => prev.map(m => m.id === msgId ? { ...m, read: true } : m))
  }

  const empleadas = users.filter(u => u.tipo === 'empleada')

  const unreadCount = mensajes.filter(m => m.toId === user?.id && !m.read).length

  return (
    <AppContext.Provider value={{ user, users, empleadas, mensajes, unreadCount, login, loginWithGoogle, logout, register, updateProfile, sendMessage, markRead }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
