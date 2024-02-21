import React, { useContext } from 'react';
import { Modal, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AuthContext } from '../components/AuthContext';
import LoginForm from '../components/account/LoginForm';

export type RootStackParams = {
  HomeScreen: undefined;
  CalendarScreen: undefined;
  ProfileScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    isLoggedIn ? (
      <Stack.Navigator
        initialRouteName='HomeScreen'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='CalendarScreen' component={CalendarScreen} />
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      </Stack.Navigator>
    ) : (
      <Modal
        animationType="slide"
        transparent={true}
        visible={!isLoggedIn}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LoginForm />
        </View>
      </Modal>
    )
  );
};