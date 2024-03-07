import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  Calendar,
  CalendarProvider,
  LocaleConfig,
} from "react-native-calendars";
import { CustomDayComponent } from "../components/calendar/CustomDayComponent";
import { api } from "../utils/api";
import { AgendaView } from "./AgendaView";

const dateFromIso = (ds: Date | string): string =>
  (ds instanceof Date ? ds.toISOString() : ds).split("T")[0];

interface ApiEvent {
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

interface AgendaEventData {
  title: string;
  hour: string;
  duration: string;
}

interface AgendaEvent {
  title: string;
  dateString: string;
  data: AgendaEventData[];
}

const filterOnlyUnique = (value: any, index: any, self: any) => {
  return self.indexOf(value) === index;
};

export const CalendarScreen = () => {
  const [calendarMode, setCalendarMode] = useState("month");
  const [selectedDate, setSelectedDate] = useState(dateFromIso(new Date()));
  const [events, setEvents] = useState<AgendaEvent[]>([]);

  useEffect(() => {
    getItems();
  }, []);

  const apiEventsToAgendaEvents = (apiEvents: ApiEvent[]): AgendaEvent[] => {
    const timestamps: number[] = apiEvents
      .map(({ start }) => new Date(dateFromIso(start)).getTime())
      .filter(filterOnlyUnique)
      .toSorted()


    return timestamps.map((timestamp) => {
      const dayEvents = apiEvents.filter(
        ({ start }) => {
          return new Date(dateFromIso(start)).getTime() === timestamp
        }
      );
      const date = new Date(timestamp)
      return {
        title: date.toLocaleTimeString(),
        dateString: dateFromIso(date),
        data: dayEvents.map((event) => {
          return {
            title: event.name,
            hour: new Date(event.start).getHours().toString(),
            duration: "1h",
          };
        }),
      };
    });
  };

  async function getItems() {
    const { data }: { data: ApiEvent[] } = await api.get(
      "/agent_agenda/agenda/"
    );
    const agendaEvents = apiEventsToAgendaEvents(data);
    setEvents(agendaEvents);
  }
  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setCalendarMode("week");
  };

  // CalendarCastellano
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

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>Agenda</Text>
        <Button color={calendarMode === "month" ? 'green' : "gray"} title="Mes" onPress={() => setCalendarMode("month")} />
        <Button color={calendarMode === "week" ? 'green' : "gray"} title="Semana" onPress={() => setCalendarMode("week")} />
        {!isToday(selectedDate) && <Button title="HOY" onPress={() => setSelectedDate(dateFromIso(new Date()))} />}
      </View>

      <CalendarProvider date={selectedDate} onDateChanged={setSelectedDate}>
        {calendarMode === "month" ? (
          <Calendar
            current={selectedDate}
            dayComponent={({ date }) => (
              <CustomDayComponent
                day={date.day}
                eventsCount={events.find((event) => event.dateString === date.dateString)?.data.length}
                isSelected={date.dateString === selectedDate}
                isToday={isToday(date.dateString)}
                onPress={() => onDayPress(date)}
              />
            )}
          />
        ) : (
          <AgendaView
            events={events.filter((event) => event.dateString === selectedDate)}
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
