import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { Modal, Text, View } from "react-native";
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
    return <Text>Loading...</Text>;
  }

  if (isLoggedIn) {
    return (
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
