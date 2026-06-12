import React, { createContext, useContext, useState, useEffect } from 'react'
import { mockEmpleadas, mockEmpleadoras, initialMensajes } from '../data/mockData'

const AppContext = createContext(null)

const STORAGE_KEYS = {
  user: 'kasei_user',
  users: 'kasei_users',
  mensajes: 'kasei_mensajes',
  favorites: 'kasei_favorites',
  emailCreds: 'kasei_email_creds',
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

const SHEETS_API = import.meta.env.VITE_SHEETS_API

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => loadStorage(STORAGE_KEYS.user, null))
  const [users, setUsers] = useState(() => {
    const saved = loadStorage(STORAGE_KEYS.users, null)
    const allMock = [...mockEmpleadas, ...mockEmpleadoras]
    if (!saved) {
      saveStorage(STORAGE_KEYS.users, allMock)
      return allMock
    }
    // Merge: agrega nuevos mocks y actualiza la foto de los existentes
    const merged = saved.map(u => {
      const mock = allMock.find(m => m.id === u.id)
      return mock ? { ...u, foto: mock.foto } : u
    })
    for (const mock of allMock) {
      if (!merged.some(u => u.id === mock.id)) merged.push(mock)
    }
    saveStorage(STORAGE_KEYS.users, merged)
    return merged
  })
  const [sheetEmpleadas, setSheetEmpleadas] = useState([])
  const [mensajes, setMensajes] = useState(() => loadStorage(STORAGE_KEYS.mensajes, initialMensajes))
  const [favorites, setFavorites] = useState(() => loadStorage(STORAGE_KEYS.favorites, []))

  useEffect(() => {
    if (!SHEETS_API) return
    fetch(SHEETS_API)
      .then(r => r.json())
      .then(data => setSheetEmpleadas(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  useEffect(() => { saveStorage(STORAGE_KEYS.user, user) }, [user])
  useEffect(() => { saveStorage(STORAGE_KEYS.users, users) }, [users])
  useEffect(() => { saveStorage(STORAGE_KEYS.mensajes, mensajes) }, [mensajes])
  useEffect(() => { saveStorage(STORAGE_KEYS.favorites, favorites) }, [favorites])

  function toggleFavorite(id) {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

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

  function loginEmpleadaEmail(email, password, sheetData) {
    const creds = loadStorage(STORAGE_KEYS.emailCreds, {})
    const emailLow = email.toLowerCase()
    const perfil = sheetData.find(e => e.email?.toLowerCase() === emailLow)
    if (!perfil) return { ok: false, error: 'No encontramos tu perfil. ¿Completaste el formulario?' }
    if (!creds[emailLow]) return { ok: false, needsRegister: true }
    if (creds[emailLow] !== password) return { ok: false, error: 'Contraseña incorrecta' }
    const existingUser = users.find(u => u.email?.toLowerCase() === emailLow)
    if (existingUser) { setUser(existingUser); return { ok: true, user: existingUser } }
    const newUser = { id: `u_${Date.now()}`, email, nombre: perfil.nombre, foto: perfil.foto || null, tipo: 'empleada', password: null, verificada: false, createdAt: new Date().toISOString().split('T')[0] }
    setUsers(prev => [...prev, newUser])
    setUser(newUser)
    return { ok: true, user: newUser }
  }

  function registerEmpleadaPassword(email, password, sheetData) {
    const emailLow = email.toLowerCase()
    const perfil = sheetData.find(e => e.email?.toLowerCase() === emailLow)
    if (!perfil) return { ok: false, error: 'No encontramos tu perfil. ¿Completaste el formulario?' }
    const creds = loadStorage(STORAGE_KEYS.emailCreds, {})
    creds[emailLow] = password
    saveStorage(STORAGE_KEYS.emailCreds, creds)
    const existingUser = users.find(u => u.email?.toLowerCase() === emailLow)
    if (existingUser) { setUser(existingUser); return { ok: true, user: existingUser } }
    const newUser = { id: `u_${Date.now()}`, email, nombre: perfil.nombre, foto: perfil.foto || null, tipo: 'empleada', password: null, verificada: false, createdAt: new Date().toISOString().split('T')[0] }
    setUsers(prev => [...prev, newUser])
    setUser(newUser)
    return { ok: true, user: newUser }
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

  const empleadas = [
    ...users.filter(u => u.tipo === 'empleada'),
    ...sheetEmpleadas.filter(s => !users.some(u => u.id === s.id)),
  ]

  const unreadCount = mensajes.filter(m => m.toId === user?.id && !m.read).length

  return (
    <AppContext.Provider value={{ user, users, empleadas, sheetEmpleadas, mensajes, unreadCount, favorites, login, loginWithGoogle, loginEmpleadaEmail, registerEmpleadaPassword, logout, register, updateProfile, sendMessage, markRead, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
