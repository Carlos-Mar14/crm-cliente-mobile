import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, BackHandler, View } from 'react-native'
import { Calendar, CalendarProvider, DateData, LocaleConfig } from 'react-native-calendars'
import { AgendaView } from '../components/calendar/AgendaView'
import { CustomDayComponent } from '../components/calendar/CustomDayComponent'
import { ApiEvent } from '../components/calendar/types'
import { api } from '../utils/api'

const toDateString = (ds: Date | string): string =>
  (ds instanceof Date ? ds.toISOString() : ds).split('T')[0]

const apiEventsToAgendaEvents = (apiEvents: ApiEvent[]): { [dateString: string]: ApiEvent[] } => {
  return apiEvents.reduce((accumulator: { [dateString: string]: ApiEvent[] }, event) => {
    const dateString = toDateString(event.start)
    if (accumulator[dateString]) {
      accumulator[dateString].push(event)
    } else {
      accumulator[dateString] = [event]
    }
    return accumulator
  }, {})
}

export const CalendarScreen = () => {
  const [showAgenda, setShowAgenda] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState<{ [dateString: string]: ApiEvent[] }>({})

  const [month, year] = useMemo(
    () => [selectedDate.getMonth() + 1, selectedDate.getFullYear()],
    [selectedDate],
  )
  useEffect(() => {
    const fetchMonthEvents = async () => {
      try {
        const { data }: { data: ApiEvent[] } = await api.get('/agent_agenda/agenda/', {
          params: { month, year },
        })
        const agendaEvents = apiEventsToAgendaEvents(data)
        setEvents(agendaEvents)
      } catch (err) {
        Alert.alert('Error', `Error al cargar eventos`)
        console.error(err)
      }
    }
    fetchMonthEvents()
  }, [month, year])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (showAgenda) {
          setShowAgenda(false)
          return true
        }
        return false
      }
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => subscription.remove()
    }, [showAgenda]),
  )

  const onDayPress = useCallback(
    (dd: DateData) => {
      setSelectedDate(new Date(dd.dateString))
      if (!showAgenda && events[dd.dateString]) setShowAgenda(true)
    },
    [showAgenda, events],
  )

  LocaleConfig.locales['es'] = {
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: 'Hoy',
  }
  LocaleConfig.defaultLocale = 'es'

  return (
    <View style={{ flex: 1 }}>
      <CalendarProvider
        date={toDateString(selectedDate)}
        onDateChanged={(date) => setSelectedDate(new Date(date))}>
        {showAgenda ? (
          <AgendaView
            title={toDateString(selectedDate)}
            events={events[toDateString(selectedDate)]}
          />
        ) : (
          <Calendar
            onMonthChange={({ dateString }) => setSelectedDate(new Date(dateString))}
            current={toDateString(selectedDate)}
            dayComponent={({ date }) =>
              date && (
                <CustomDayComponent
                  day={date.day}
                  eventsCount={events[date.dateString]?.length || 0}
                  isSelected={date.dateString === toDateString(selectedDate)}
                  isToday={date.dateString === toDateString(new Date())}
                  onPress={() => onDayPress(date)}
                />
              )
            }
          />
        )}
      </CalendarProvider>
    </View>
  )
}
