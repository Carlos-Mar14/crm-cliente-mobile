import React, { createContext, useContext, useEffect, useState } from 'react'
import { useServices } from '../utils/api'

interface LoginData {
  email: string
  password: string
}

const AuthContext = createContext({
  isLoggedIn: false,
  loading: true,
  login: (data: LoginData) => {},
  logout: () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { apiService, tokenService } = useServices()

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true)
      const isLoggedIn = await apiService.checkLogin()
      setIsLoggedIn(isLoggedIn)
      setLoading(false)
    }
    checkAuth()
  }, [apiService]) // todo: check if this is needed

  const login = async (loginData: LoginData) => {
    setLoading(true)
    try {
      await apiService.login(loginData)
      setIsLoggedIn(true)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await tokenService.removeToken()
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ loading, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
  return useContext(AuthContext)
}
