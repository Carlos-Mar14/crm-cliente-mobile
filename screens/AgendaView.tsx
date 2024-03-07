import React, { useCallback } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AgendaList } from 'react-native-calendars';

const AgendaItem = ({ item: section }) => {
  const item = section.item

  const buttonPressed = useCallback(() => {
    Alert.alert('Show me more');
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, []);

  if (!Object.keys(item).length) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No hay eventos</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item} >
      <View >
        <Text style={styles.itemHourText}>{item.hour}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      <View style={styles.itemButtonContainer}>
        <Button color={'grey'} title={'Info'} onPress={buttonPressed} />
      </View>
    </TouchableOpacity>
  );
};



export const AgendaView = ({ events }: { events: any[] }) => {
  const renderItem = (item) => <AgendaItem item={item} />;

  return (
    <AgendaList
      sections={events}
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
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14
  }
});