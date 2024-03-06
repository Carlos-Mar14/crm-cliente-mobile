import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { Modal, View } from "react-native";
import { AuthContext } from "../components/AuthContext";
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
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return <>Loading...</>;
  }

  if (isLoggedIn) {
    return (
      <Stack.Navigator
        initialRouteName="CalendarScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoginForm />
      </View>
    </Modal>
  );
};
