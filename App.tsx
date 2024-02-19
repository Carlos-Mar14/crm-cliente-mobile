import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './navigations/DrawerNavigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext, AuthProvider } from './components/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flex: 1 }}
        scrollEnabled={false}
      >
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      </KeyboardAwareScrollView>
    </AuthProvider>
  );
}
