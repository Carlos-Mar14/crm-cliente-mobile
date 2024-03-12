import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, BackHandler  } from "react-native";
import {
  Calendar,
  CalendarProvider,
  LocaleConfig,
} from "react-native-calendars";
import { CustomDayComponent } from "../components/calendar/CustomDayComponent";
import Toolbar from "../components/common/Toolbar";
import { api } from "../utils/api";
import { AgendaView } from "./AgendaView";
import { subDays, addDays, format} from "date-fns"
const dateFromIso = (ds: Date | string): string =>
  (ds instanceof Date ? ds.toISOString() : ds).split("T")[0];

export interface ApiEvent {
  name: string;
  start: string;
  end: string;
  type: string;
  card_id: string;
  status: string;
  color: string;
  human_type: string;
  comment?: string;
  event_id?: number;
  contract_id?: number;
}


export const CalendarScreen = () => {
  const [showAgenda, setShowAgenda] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dateFromIso(new Date()));
  const [events, setEvents] = useState<{ [dateString: string]: ApiEvent[] }>({});

  useEffect(() => {
    getItems();
  }, []);

  const apiEventsToAgendaEvents = (apiEvents: ApiEvent[]): { [dateString: string]: ApiEvent[] } => {
    return apiEvents.reduce((accumulator, event) => {
      const dateString = dateFromIso(event.start);
      if (accumulator[dateString]) {
        accumulator[dateString].push(event)
      } else {
        accumulator[dateString] = [event]
      }
      return accumulator
    }, {})
  };

  async function getItems() {
    const { data }: { data: ApiEvent[] } = await api.get("/agent_agenda/agenda/");
    const agendaEvents = apiEventsToAgendaEvents(data);
    setEvents(agendaEvents);
  }
  const onDayPress = useCallback((dateString) => {
    setSelectedDate(dateString);
    if (!showAgenda && events[dateString]) setShowAgenda(true);
   }, [showAgenda, events]);
   

  LocaleConfig.locales["es"] = {
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    today: "Hoy",
  };
  LocaleConfig.defaultLocale = "es";

  const isToday = (dateString: string) => dateString === dateFromIso(new Date());

  useEffect(() => {
    const returnMonth = () => {
      if(showAgenda){
        setShowAgenda(false)
        return true
      }
      return false
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      returnMonth
    )
    return () => backHandler.remove()
  }), [showAgenda]


  return (
    <View style={styles.container}>
      <Toolbar
        title="Agenda"
        rightButtons={[
          // TODO: add icons for buttons
          {
            title: "Día anterior",
            style: {
              backgroundColor: 'lightblue',
            },
            onPress: () => {
              const currentDate = new Date(selectedDate)
              const dayBefore = subDays(currentDate, 1)
              const dayBeforeString =  format(dayBefore, "yyyy-MM-dd")
              setSelectedDate(dayBeforeString)
            }
          },
          {
            title: "Hoy",
            style: {
              backgroundColor: 'lightblue',
            },
            onPress: () => {
              const currentDate = new Date()
              const today= (currentDate)
              const todayString = format(today, "yyyy-MM-dd")
              setSelectedDate(todayString)
            }
          },
          {
            title: "Día siguiente",
            style: {
              backgroundColor: 'lightblue',
            },
            onPress: () => {
              const currentDate = new Date(selectedDate)
              // const dyaAfter = addDays(currentDate, 1)
              // const dayAfterString = format(dyaAfter, "yyyy-MM-dd")
              // setSelectedDate(dayAfterString)

              setSelectedDate(format(addDays(currentDate,1), "yyyy-MM-dd"))
            }
          }
        ]}
      />

      <CalendarProvider date={selectedDate} onDateChanged={setSelectedDate}>
        {showAgenda ? (<AgendaView title={selectedDate} events={events[selectedDate]} />
        ) : (
          <Calendar
            current={selectedDate}
            dayComponent={({ date }) => (
              <CustomDayComponent
                day={date.day}
                eventsCount={events[date.dateString]?.length || 0}
                isSelected={date.dateString === selectedDate}
                isToday={isToday(date.dateString)}
                onPress={() => onDayPress(date.dateString)}
              />
            )}
          />
        )}
      </CalendarProvider>

    </View>
  );
};

// TODO: limpiar
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  dayContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: 60,
  },
  dateContainer: {
    flexDirection: "row",
    //alignItems: 'center',
    height: 20,
  },
  dateButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
  },
  dayText: {
    fontSize: 13,
    lineHeight: 23,
    textAlign: "center",
  },
  eventTitle: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0,
  },
  eventContainer: {
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  todayText: {
    fontWeight: "bold",
    color: "red",
  },
  selectedDay: {
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
    height: 50,
  },
  eventDay: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#f0f0f0",
    height: 50,
  },
  defaultDay: {
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    height: 20,
  },
  eventsContainer: {
    padding: 30,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventText: {
    fontSize: 14,
    marginBottom: 5,
  },
});
