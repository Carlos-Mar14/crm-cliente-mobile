import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthProvider from './components/AuthContext';
import { DrawerNavigation } from './navigations/DrawerNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PaperProvider>
          <SafeAreaView style={styles.container}>
            <DrawerNavigation />
          </SafeAreaView>
        </PaperProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})