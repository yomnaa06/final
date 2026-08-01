'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { type UserProfile } from './api'

type AuthState = {
  user: UserProfile | null
  token: string | null
  isLoading: boolean
  login: (token: string, user: UserProfile) => void
  logout: () => void
  updateUser: (user: UserProfile) => void
}

const AuthContext = createContext<AuthState | null>(null)

// decode jwt token sans librairie , base64url_decoder
function getTokenExpiry(token: string): number | null {
  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return typeof decoded.exp === 'number' ? decoded.exp : null
  } catch {
    return null
  }
}

function isTokenExpired(token: string): boolean {
  const exp = getTokenExpiry(token)
  if (exp === null) return true
  // 10-second buffer
  return Date.now() / 1000 >= exp - 10
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // verification que token expired
  useEffect(() => {
    try {
      const stored = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')

      if (stored && storedUser) {
        if (isTokenExpired(stored)) {
          // token is expire , clearing tt, letting user login again
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        } else {
          setToken(stored)
          setUser(JSON.parse(storedUser))
        }
      }
    } catch {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback((newToken: string, newUser: UserProfile) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }, [])

  const updateUser = useCallback((updated: UserProfile) => {
    localStorage.setItem('user', JSON.stringify(updated))
    setUser(updated)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
