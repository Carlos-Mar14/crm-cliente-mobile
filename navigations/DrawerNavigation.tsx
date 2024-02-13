import { View, Text } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';

import { CalendarScreen } from '../screens/CalendarScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigation } from './StackNavigation';
import { ProfileScreen } from '../screens/ProfileScreen';

export type RootDrawerParams= {
    Home: undefined;
    Profile: undefined;
    
}

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const DrawerNavigation= () => {
  return (
    <Drawer.Navigator 
        screenOptions={{headerShown: false}}
        drawerContent={DrawerContent}>
        
      <Drawer.Screen name="Home" component={StackNavigation} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
    return(
        <DrawerContentScrollView
            style={{backgroundColor: '#00A294'}}
        >
            <View>
                <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Calendar')}>
                    <Text>Agenda</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
}