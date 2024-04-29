import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import React from 'react'
import { Alert } from 'react-native'
import { useAuth } from '../components/AuthContext'

import { Icon, ListItem } from '@rneui/themed'
import LoginForm from '../components/account/LoginForm'
import CustomerCardScreen from '../components/customer/CustomerCardScreen'
import { CalendarScreen } from '../screens/CalendarScreen'
import { ProfileScreen } from '../screens/ProfileScreen'

export type RootDrawerParams = {
  Profile: undefined
  Calendar: undefined
  CustomerCard: undefined
}

const Drawer = createDrawerNavigator<RootDrawerParams>()

export const DrawerNavigation = () => {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) return <LoginForm />

  return (
    <Drawer.Navigator screenOptions={{ headerShown: isLoggedIn }} drawerContent={DrawerContent}>
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="CustomerCard" component={CustomerCardScreen} />
    </Drawer.Navigator>
  )
}

// TODO: move to separate file
const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const { logout } = useAuth()
  const onLogout = async () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que quieres cerrar sesión?', [
      { text: 'No', style: 'cancel', onPress: () => {} },
      {
        text: 'Sí',
        style: 'destructive',
        onPress: async () => {
          await logout()
          navigation.closeDrawer() // Cierra el Drawer
        },
      },
    ])
  }

  const menuItems = [
    {
      title: 'Agenda',
      onPress: () => navigation.navigate('Calendar'),
      icon: 'calendar',
    },
    {
      title: 'Perfil',
      onPress: () => navigation.navigate('Profile'),
      icon: 'account',
    },
    {
      title: 'Cerrar Sesión',
      onPress: onLogout,
      icon: 'logout',
      iconColor: 'red',
    },
  ]

  return (
    <DrawerContentScrollView>
      {menuItems.map((item, i) => (
        <ListItem key={i} bottomDivider onPress={item.onPress}>
          <Icon name={item.icon} type="material-community" color={item.iconColor} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </DrawerContentScrollView>
  )
}
