import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const ProfileScreen = () => {
  return (
    <View style={styles.input}>
      <Text>Pantalla Perfil</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})
