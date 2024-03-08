import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "../components/AuthContext";
import LoginForm from "../components/account/LoginForm";
import { CalendarScreen } from "../screens/CalendarScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
export type RootStackParams = {
  HomeScreen: undefined;
  CalendarScreen: undefined;
  ProfileScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <Text>Loading...</Text>;

  if (isLoggedIn) return (
    <View style={{ padding: 20, flex: 1 }}>
      <Stack.Navigator
        initialRouteName="CalendarScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </View>
  )

  return (
    <View style={{ maxWidth: 600, minWidth: 400, top: 100, alignSelf: "center" }}>
      <LoginForm />
    </View>
  )
};
