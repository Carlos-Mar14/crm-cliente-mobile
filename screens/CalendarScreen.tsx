import React, { useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Button, Alert, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../components/AuthContext';
import { Calendar, LocaleConfig, WeekCalendar, CalendarProvider } from 'react-native-calendars';
import { DayState } from 'react-native-calendars/src/types';

export const CalendarScreen = () => {
  const [calendarMode, setCalendarMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);
  const { setIsLoggedIn } = useContext(AuthContext);
  // Eventos, tareas o recordatorios
  const [events, setEvents] = useState({
    '2024-02-22': {marked: true, dotColor: 'red', title: 'Visita gas Primark', title2: 'Tecnico GestionGroup'},
    '2024-02-23': {marked: true, dotColor: 'blue', title: 'Endesa visita técnico'},
  });
  useEffect(() => {
    console.log('selectedDate actualizado:', selectedDate);
    }, [selectedDate]);
    const onDayPress = (day: { dateString: string; }) => {
      setSelectedDate(day.dateString);
      // Obtener eventos para el día seleccionado
      const eventsForSelectedDate = events[day.dateString] ? [events[day.dateString]] : [];
      setEventsForSelectedDate(eventsForSelectedDate);
    };

  // CalendarCastellano
  LocaleConfig.locales['es'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: 'Hoy',
  };
  LocaleConfig.defaultLocale = 'es';
  // SignOut
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

  // Marcar el día actual en color claro y el día seleccionado en azul
  const markedDates = {
    ...events,
    [selectedDate]: {selected: true, selectedColor: 'blue'},
  };
  // Define un tipo para las props de CustomDayComponent
  interface DateData {
    dateString: string;
  }
  interface BasicDayProps {
    date?: string;
    // Incluye aquí cualquier otra propiedad que necesites
  }
  interface DayProps extends BasicDayProps {
    date?: string & DateData;
  }
  interface CustomDayComponentProps extends DayProps {
    state: DayState;
    marking: any;
    day: number;
  }
  const CustomDayComponent: React.FC<CustomDayComponentProps> = ({ date, ...otherProps }) => {
    const event = events[date?.dateString];
    const isValidDate = (dateString: string) => {
      return !isNaN(Date.parse(dateString));
    };
    const renderButton = () => {
      if (!isValidDate(date?.dateString)) {
        return null; // No mostrar el botón si la fecha no es válida
      }
      const isSelected = selectedDate === date?.dateString;
      const formatDate = (dateString: string | number | Date, isSelected: boolean) => {
        let dateStr: string;
        if (typeof dateString === 'number' || dateString instanceof Date) {
          dateStr = dateString.toString();
        } else {
          dateStr = dateString;
        }
        if (!isValidDate(dateStr)) {
          return '';
        }
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
          return '';
        }
        return `${date.getDate()}`;
      };
      return (
        <View style={isSelected ? styles.selectedDayButton : event ? styles.eventDayButton : styles.defaultDayButton}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => onDayPress({ dateString: date?.dateString || '' })}
          >
            <Text>{formatDate(date?.dateString, isSelected)}</Text>
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <View style={styles.dayContainer}>
        {renderButton()}
        {event && <Text style={styles.eventTitle}>{event.title}</Text>}
      </View>
    );
  };
  
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
            dayComponent={CustomDayComponent}
            markedDates={markedDates}
          />
        ) : (
          <WeekCalendar
            current={selectedDate || Date()}
            onDayPress={onDayPress}
            dayComponent={CustomDayComponent}
            markedDates={markedDates}
          />
        )}
      </CalendarProvider>
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>Eventos del día {selectedDate}</Text>
        {eventsForSelectedDate.map((event, index) => (
          <Text key={index} style={styles.eventText}>
            {event.title}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex:   1
  },
  buttonContainer: {
      flexDirection: 'row',   
      marginRight:   10,
      marginLeft:   5,
      marginTop:   30,
  },
  title: {
      marginRight:   10,
      alignSelf: 'center',
      fontSize:   18
  },
  dayContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dayText: {
    fontSize:   16,
  },
  eventTitle: {
    fontSize:   12,
    color: 'black',
    fontWeight: 'bold'
  },
  // selectedDay: {
  //   backgroundColor: 'blue',
  // },
  // markedDay: {
  //   backgroundColor: '#6C8EFF',
  // },
  selectedDayButton: {
    backgroundColor: '#28BBFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding:  10,
  },
  eventDayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:  10,
  },
  defaultDayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:  10,
  },
  dateButton: {
    borderColor: 'transparent', 
    borderWidth: 0,
    color: 'transparent'
  },
eventsContainer: {
  padding: 10,
  marginTop: 20,
  borderTopWidth: 1,
  borderTopColor: '#ccc',
},
eventsTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
},
eventText: {
  fontSize: 14,
  marginBottom: 5,
},
});
