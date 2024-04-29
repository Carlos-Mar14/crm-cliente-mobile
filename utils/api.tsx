import { API_URL_SERVER, MODE } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { createContext, useContext } from 'react'
import { Platform } from 'react-native'

export const api = axios.create({
  baseURL: API_URL_SERVER,
})

api.interceptors.request.use(
  // log all requests
  (config) => {
    console.log({ url: config.url, body: config.data, params: config.params })
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  },
)

if (MODE === 'offline') {
  api.post = (args) => {
    console.log(args)
    return new Promise((resolve) => resolve({ data: { token: 'testtoken' } }))
  }

  api.get = (url) => {
    if (url === '/agent_agenda/agenda/') {
      return new Promise((resolve) => resolve({ data: require('../agenda_events.json') }))
    }
    if (url === '/puntos/') {
      return new Promise((resolve) => resolve({ data: require('../puntos.json') }))
    }

    if (url.match(/\/cards\/\d+/)) {
      return new Promise((resolve) => resolve({ data: require('../ficha.json') }))
    }

    return new Promise((resolve) => resolve({ data: {} }))
  }
}

class ApiService {
  tokenService: TokenService
  isLoggedIn = false

  constructor(tokenService: TokenService) {
    this.tokenService = tokenService
    this.checkLogin()
  }

  async checkLogin() {
    const token = await this.tokenService.getToken()
    if (token) await this.tokenService.refreshToken(token)
    return !!token
  }

  async login({ email, password }: { email: string; password: string }) {
    const { data } = await api.post('/token-auth/', { email, password })
    await this.tokenService.saveToken(data.token)
    this.isLoggedIn = true
  }
}

class TokenService {
  private TOKEN_KEY = 'token' // key to store token in async storage

  async saveToken(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(this.TOKEN_KEY, token)
    } else {
      await SecureStore.setItemAsync(this.TOKEN_KEY, token)
    }
  }

  async getToken() {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem(this.TOKEN_KEY)
    } else {
      return await SecureStore.getItemAsync(this.TOKEN_KEY)
    }
  }

  async removeToken() {
    delete api.defaults.headers.common.Authorization

    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(this.TOKEN_KEY)
    } else {
      await SecureStore.deleteItemAsync(this.TOKEN_KEY)
    }
  }

  async refreshToken(token: string) {
    const { data } = await api.post('/token-refresh/', { token })
    await this.saveToken(data.token)
  }
}

const ServicesContext = createContext({
  tokenService: new TokenService(),
  apiService: new ApiService(new TokenService()),
})

export const ServicesProvider = ({ children }: { children: React.ReactNode }) => {
  const tokenService = new TokenService()
  const apiService = new ApiService(tokenService)

  return (
    <ServicesContext.Provider value={{ tokenService, apiService }}>
      {children}
    </ServicesContext.Provider>
  )
}

export const useServices = () => {
  return useContext(ServicesContext)
}
