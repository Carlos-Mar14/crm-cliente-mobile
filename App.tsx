import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { AuthProvider } from './components/AuthContext';
import { DrawerNavigation } from './navigations/DrawerNavigation';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
