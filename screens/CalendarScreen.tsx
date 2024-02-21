import React, { useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import { AuthContext } from '../components/AuthContext';
import { Calendar, LocaleConfig, WeekCalendar, CalendarProvider } from 'react-native-calendars';

export const CalendarScreen = () => {

  const [calendarMode, setCalendarMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(AuthContext);
  const onDayPress = (day: { dateString: string }) => {
    console.log('selected day', day);
    setSelectedDate(day.dateString);
  };

  //CalendarCastellano
  LocaleConfig.locales['es'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: 'Hoy',
  };
  LocaleConfig.defaultLocale = 'es';

  //SignOut
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
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <Text style={styles.title}>Agenda</Text>
        <Button
          title="Mes"
          onPress={() => setCalendarMode('month')}
        />
          <Button
            title="Semana"
            onPress={() => setCalendarMode('week')}
          />
        </View>
      <CalendarProvider date={selectedDate || Date()} onDateChanged={setSelectedDate}>
        {calendarMode === 'month' ? (
          <Calendar
            current={selectedDate || Date()}
            onDayPress={onDayPress}
            firstDay={1}
            markedDates={{[selectedDate]: {selected: true, selectedColor: 'blue'}}}
          />
        ) : (
          <WeekCalendar
            current={selectedDate || Date()}
            onDayPress={onDayPress}
            markedDates={{[selectedDate]: {selected: true, selectedColor: 'blue'}}}
          />
        )}
      </CalendarProvider>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
      flex:   1
  },
  buttonContainer: {
      flexDirection: 'row', 
      marginRight: 10,
      marginLeft: 5,
      marginTop: 25,
  },
  title: {
    marginRight: 10,
    alignSelf: 'center',
    fontSize: 18
}
})
