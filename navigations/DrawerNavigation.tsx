import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { useAuth } from "../components/AuthContext";

import { TouchableOpacity } from "react-native-gesture-handler";
import { CalendarScreen } from "../screens/CalendarScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { StackNavigation } from "./StackNavigation";

export type RootDrawerParams = {
  Home: undefined;
  Profile: undefined;
  Calendar: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const DrawerNavigation = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: isLoggedIn }}
      drawerContent={DrawerContent}
    >
      <Drawer.Screen name="Home" component={StackNavigation} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const { logout } = useAuth();
  const onLogout = async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "No", style: "cancel", onPress: () => { } },
        {
          text: "Sí",
          style: "destructive",
          onPress: async () => {
            await logout();
            navigation.closeDrawer(); // Cierra el Drawer
          },
        },
      ]
    );
  };

  return (
    <DrawerContentScrollView style={styles.menuDrawer}>
      <View style={styles.drawerContent}>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.drawerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate("CalendarScreen")}
        >
          <Text style={styles.drawerText}>Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Text style={styles.drawerText}>Perfil</Text>
        </TouchableOpacity>
        <Button
          icon={<Icon name="exit-to-app" size={15} color="white" />}
          title=" Cerrar sesión"
          onPress={onLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  menuDrawer: {
    backgroundColor: "#00A2",
    width: 200,
  },
  drawerContent: {
    flex: 1,
    alignItems: "center",
  },
  drawerItem: {
    width: "100%",
    justifyContent: "center",
  },
  drawerText: {
    textAlign: "center",
  },
});
