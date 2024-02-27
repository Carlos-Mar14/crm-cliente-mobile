import React, { useContext } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../components/AuthContext';
import { Icon, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

import { StackNavigation } from './StackNavigation';
import { CalendarScreen } from '../screens/CalendarScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProfileScreen } from '../screens/ProfileScreen';

export type RootDrawerParams= {
    Home: undefined;
    Profile: undefined;
    Calendar: undefined;
    
}

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const DrawerNavigation= () => {
  return (
    <Drawer.Navigator 
        screenOptions={{headerShown: false}}
        drawerContent={DrawerContent}>
        
      <Drawer.Screen name="Home" component={StackNavigation} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
    </Drawer.Navigator>
  );
}

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
    const { setIsLoggedIn } = useContext(AuthContext);
    const logout = async () => {
      Alert.alert(
        'Cerrar sesión',
        '¿Estás seguro de que quieres cerrar sesión?',
        [
          { text: "No", style: 'cancel', onPress: () => {} },
          {
            text: 'Sí',
            style: 'destructive',
            onPress: async () => {
              await SecureStore.deleteItemAsync("token"); // Borra el token de autenticación
              setIsLoggedIn(false);
              navigation.closeDrawer(); // Cierra el Drawer
            },
          },
        ]
      );
  };
  
  
      

      return(
        <DrawerContentScrollView style={styles.menuDrawer}>
            <View style={styles.drawerContent}>
                <TouchableOpacity style={styles.drawerItem} onPress={()=> navigation.navigate('Home')}>
                    <Text style={styles.drawerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={()=> navigation.navigate('CalendarScreen')}>
                    <Text style={styles.drawerText}>Agenda</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={()=> navigation.navigate('ProfileScreen')}>
                    <Text style={styles.drawerText}>Perfil</Text>
                </TouchableOpacity>
                <Button
                    icon={
                    <Icon
                        name="exit-to-app"
                        size={15}
                        color="white"
                    />
                    }
                    title=" Cerrar sesión"
                    onPress={logout}
                />
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    menuDrawer:{
      backgroundColor: '#00A2',
      width: 200,
    },
    drawerContent: {
      flex: 1,
      alignItems: 'center',
    },
    drawerItem: {
      width: '100%', 
      justifyContent: 'center', 
    },
    drawerText: {
      textAlign: 'center', 
    },
})