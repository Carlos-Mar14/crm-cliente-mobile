import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export const CalendarScreen = () => {
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