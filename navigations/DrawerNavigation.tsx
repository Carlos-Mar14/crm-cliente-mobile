import React, { useContext } from 'react';
import { View, Text, Alert } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../components/AuthContext';
import { Icon, Button } from 'react-native-elements';


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

  const logout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: "No", style: 'cancel', onPress: () => {} },
        {
          text: 'Sí',
          style: 'destructive',
          onPress: () => setIsLoggedIn(false),
        },
      ]
    );
  };

    return(
        <DrawerContentScrollView
            style={{backgroundColor: '#00A294'}}
        >
            <View>
                <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('CalendarScreen')}>
                    <Text>Agenda</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('ProfileScreen')}>
                    <Text>Perfil</Text>
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