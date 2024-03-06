import React, { useCallback } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AgendaList } from 'react-native-calendars';


const AgendaItem = (props) => {
    const {item} = props;
  
    const buttonPressed = useCallback(() => {
      Alert.alert('Show me more');
    }, []);
  
    const itemPressed = useCallback(() => {
      Alert.alert(item.title);
    }, []);
  
    if (!Object.keys(item).length) {
      return (
        <View style={styles.emptyItem}>
          <Text style={styles.emptyItemText}>No Events Planned Today</Text>
        </View>
      );
    }
  
    return (
      <TouchableOpacity onPress={itemPressed} style={styles.item} >
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Info'} onPress={buttonPressed}/>
        </View>
      </TouchableOpacity>
    );
  };
  

const items: any[] = [
    {
        title: 'test',
        data: [
          {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
          {hour: '2pm', duration: '1h', title: 'Deep Stretches'},
          {hour: '3pm', duration: '1h', title: 'Private Yoga'}
        ]
      },
]


const AgentAgenda = () => {
  const renderItem = useCallback(({item}: any) => {
    return <AgendaItem item={item}/>;
  }, []);


    return (
    <View style={{ flex: 1 }}>
      <AgendaList
        sections={items}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AgentAgenda;



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