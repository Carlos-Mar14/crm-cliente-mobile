import React, { useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../components/AuthContext';

export const CalendarScreen = () => {
  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    return navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      Alert.alert(
        'Cerrar sesión',
        '¿Estás seguro de que quieres cerrar sesión?',
        [
          { text: "No", style: 'cancel', onPress: () => {} },
          {
            text: 'Sí',
            style: 'destructive',
            onPress: () => {
              navigation.dispatch(e.data.action);
              setIsLoggedIn(false);
            },
          },
        ]
      );
    });
  }, [navigation, setIsLoggedIn]);

  return (
    <View style={styles.input}>
      <Text>Pantalla Agenda</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
  },
})
