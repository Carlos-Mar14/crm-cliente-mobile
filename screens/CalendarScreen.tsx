import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, CalendarProvider, LocaleConfig } from 'react-native-calendars';
import { DayState } from 'react-native-calendars/src/types';
import { api } from '../utils/api';
import AgentAgenda from './AgendaView';

interface ApiEvent {
  name: string,
  start: string,
  end: string,
  type: string,
  card_id: string,
  status: string,
  color: string,
  human_type: string,
  comment?: string,
  event_id?: number,
  contract_id?: number,
}

interface AgendaEventData {
  title: string,
  hour: string,
  duration: string
}

interface AgendaEvent { 
  title: string,
  data: AgendaEventData[]
}

const filterOnlyUnique = (value: any, index: any, self: any) => {
  return self.indexOf(value) === index;
}

export const CalendarScreen = () => {
  const [calendarMode, setCalendarMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [events, setEvents] = useState<AgendaEvent[]>([]);

  useEffect(() => {
    getItems();
  }, []);

  const apiEventsToAgendaEvents = (apiEvents: ApiEvent[]): AgendaEvent[] => {
    const days = apiEvents.map(({ start }) =>  start.split('T')[0] ).toSorted().filter(filterOnlyUnique)

    return days.map((day) => {
      const dayEvents = apiEvents.filter(({ start }) => start.split('T')[0] === day)
      return {
        title: day.toLocaleString(),
        data: dayEvents.map((event) => {
          return {
            title: event.name,
            hour: new Date(event.start).getTime().toString(),
            duration: '1h'
          }          
        })
      }
    })
  }

  async function getItems() {
    const { data }: { data: ApiEvent[] } = await api.get('/agent_agenda/agenda/')
    const agendaEvents = apiEventsToAgendaEvents(data)
    setEvents(agendaEvents)
  }  
  const onDayPress = (day: { dateString: string; }) => {
    setSelectedDate(day.dateString);
  };

  const goToToday = () => {
    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
    setSelectedDate(today);
    if (calendarMode !== 'week') {
      setCalendarMode('week');
    }
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
    viewMode: 'month' | 'week';
    calendarMode: string;
  }
  const CustomDayComponent: React.FC<CustomDayComponentProps & { calendarMode: string }> = ({ date, viewMode, calendarMode, ...otherProps }) => {
    const isSelected = selectedDate === date?.dateString;
    const isValidDate = (dateString: string) => {
      return !isNaN(Date.parse(dateString));
    };
    const renderButton = () => {
      if (!isValidDate(date?.dateString)) {
        return null; // No mostrar el botón si la fecha no es válida
      }
      const isToday = (dateString: string) => {
        const today = new Date();
        const dateToCompare = new Date(dateString);
        return (
          dateToCompare.getDate() === today.getDate() &&
          dateToCompare.getMonth() === today.getMonth() &&
          dateToCompare.getFullYear() === today.getFullYear()
        );
      };
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
      const buttonStyle = isToday(date?.dateString) ? styles.todayText : styles.dayText;

      return (
        <View style={isSelected ? styles.selectedDayButton : event ? styles.eventDayButton : styles.defaultDayButton}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => onDayPress({ dateString: date?.dateString || '' })}
          >
            <Text style={buttonStyle}>{formatDate(date?.dateString, isSelected)}</Text>
            {event && calendarMode === 'month' && (
              <>
                <Text style={styles.eventTitle}>{event.title}</Text>
                {event.title2 && <Text style={styles.eventTitle}>{event.title2}</Text>}
              </>
            )}
          </TouchableOpacity>
        </View>
      );
    };

      return (
        <View style={styles.dayContainer}>
          <View style={styles.dateContainer}>
            {renderButton()}
          </View>
          {viewMode === 'month' && event && (
            <View style={styles.eventContainer}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              {event.title2 && <Text style={styles.eventTitle}>{event.title2}</Text>}
            </View>
          )}
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
        <Button
          title="HOY"
          onPress={goToToday}
        />
      </View>
      <CalendarProvider date={selectedDate} onDateChanged={setSelectedDate}>
        {calendarMode === 'month' ? (
          <Calendar
          current={selectedDate || Date()}
          onDayPress={onDayPress}
          firstDay={1}
          dayComponent={(props) => <CustomDayComponent {...props as CustomDayComponentProps} calendarMode={calendarMode} />}
          style={styles.monthCalendarContainer}
          />
        ) : (
          <AgentAgenda events={events.filter((event) => event.title === selectedDate)} />

        )}
      </CalendarProvider>
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>Eventos del día {selectedDate}</Text>
        {events.map((event, index) => (
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
    flex:  1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal:  10,
    marginTop:  30,
  },
  title: {
    fontSize:  18,
    fontWeight: 'bold',
    marginRight:  10, 
  },
  dayContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    height: 60, 
  },
  dateContainer: {
    flexDirection: 'row',
    //alignItems: 'center',
    height: 20,
  },
  dateButton: {
    borderRadius: 5,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 1, 
    
  },
  dayText: {
    fontSize: 13,
    lineHeight: 23,
    textAlign: 'center',
  },
  eventTitle: {
    fontSize: 13, 
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
  },
  eventContainer: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  todayText: {
    fontWeight: 'bold',
    color: 'red', 
  },
  selectedDayButton: {
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius:  5,
    height: 50
  },
  eventDayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:  15,
    backgroundColor: '#f0f0f0',
    height: 50
  },
  defaultDayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:  0,
    height: 20
  },
  eventsContainer: {
    padding:  30,
    marginTop:  460,
    borderTopWidth:  1,
    borderTopColor: '#ccc',
  },
  eventsTitle: {
    fontSize:  16,
    fontWeight: 'bold',
    marginBottom:  10,
  },
  eventText: {
    fontSize:  14,
    marginBottom:  5,
  },
  weekCalendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    width: '100%',
    flex: 1,
  },
  monthCalendarContainer:{

  }
});
