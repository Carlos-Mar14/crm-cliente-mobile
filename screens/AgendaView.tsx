import React, { useCallback } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AgendaList } from 'react-native-calendars';
import { ApiEvent } from './CalendarScreen';

const _AgendaItem = ({ event }: { event: ApiEvent }) => {
  const { name, start } = event
  const hour = start.slice(11, 16)

  const eventPressed = () => {
    Alert.alert(event.name, JSON.stringify(event))
  }

  return (
    <TouchableOpacity onPress={eventPressed} style={styles.item} >
      <View >
        <Text style={styles.itemHourText}>{hour}</Text>
      </View>
      <Text style={styles.itemTitleText}>{name}</Text>
    </TouchableOpacity>
  );
};

const AgendaItem = React.memo(_AgendaItem);

export const AgendaView = ({ title, events }: { title: string, events: ApiEvent[] }) => {
  const renderItem = useCallback(({ item }) => <AgendaItem event={item} />, []);

  return (
    <AgendaList
      sections={[{ title, data: events }]}
      renderItem={renderItem}
    />
  );
};


const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
});