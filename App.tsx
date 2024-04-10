import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './components/AuthContext';
import { DrawerNavigation } from './navigations/DrawerNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaProvider >
          <DrawerNavigation />
        </SafeAreaProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}