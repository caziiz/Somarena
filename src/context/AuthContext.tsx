import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type User = {
  id: string
  username: string
  email: string
  role?: string
}

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, accessToken?: string, refreshToken?: string) => void
  logout: () => void
  refreshSession: () => Promise<void>
}

const STORAGE_KEYS = {
  access: 'somarena_access_token',
  refresh: 'somarena_refresh_token',
  user: 'somarena_user',
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.user)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as User)
      } catch {
        localStorage.removeItem(STORAGE_KEYS.user)
      }
    }

    setIsLoading(false)
  }, [])

  const login = (nextUser: User, accessToken?: string, refreshToken?: string) => {
    setUser(nextUser)
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(nextUser))

    if (accessToken) {
      localStorage.setItem(STORAGE_KEYS.access, accessToken)
    }

    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.refresh, refreshToken)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEYS.user)
    localStorage.removeItem(STORAGE_KEYS.access)
    localStorage.removeItem(STORAGE_KEYS.refresh)
  }

  const refreshSession = async () => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.refresh)
    if (!refreshToken) {
      logout()
      return
    }

    // Real backend refresh logic must be added here when the actual token API is confirmed.
    // We intentionally avoid inventing refresh endpoints or behavior.
    throw new Error('Refresh token rotation is not configured until the backend contract is available.')
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
      refreshSession,
    }),
    [user, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
