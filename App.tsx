import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthProvider from './components/AuthContext'
import { DrawerNavigation } from './navigations/DrawerNavigation'
import { ServicesProvider } from './utils/api'

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ServicesProvider>
          <AuthProvider>
            <DrawerNavigation />
          </AuthProvider>
        </ServicesProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
