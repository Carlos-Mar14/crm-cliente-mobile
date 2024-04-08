import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React from "react";
import { Alert, View } from "react-native";
import { useAuth } from "../components/AuthContext";

import { Icon, ListItem } from '@rneui/themed';
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
        { text: "No", style: "cancel", onPress: () => {} },
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

  const menuItems = [
    {
      title: "Agenda",
      onPress: () => navigation.navigate("CalendarScreen"),
      icon: "calendar",
    },
    {
      title: "Perfil",
      onPress: () => navigation.navigate("ProfileScreen"),
      icon: "account",
    },
    {
      title: "Cerrar Sesión",
      onPress: onLogout,
      icon: "logout",
      iconColor: "red",
    },
  ];

  return (
    <DrawerContentScrollView>
      {menuItems.map((item, i) => (
        <ListItem key={i} bottomDivider onPress={item.onPress}>
          <Icon
            name={item.icon}
            type="material-community"
            color={item.iconColor}
          />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </DrawerContentScrollView>
  );
};
