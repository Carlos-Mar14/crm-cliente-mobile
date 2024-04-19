import { FlatList, StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DataTable, Icon, IconButton, TextInput } from 'react-native-paper'
import { api } from '../../utils/api'

interface Comment {
  id: number
  fullname: string
  owner: number
  text: string
  owner_name: string
  last_modified: string
  created: string
  card: number
}

export default function ComponentComments({ customerId }: { customerId: number }) {
  const [commentText, setComment] = useState('')
  const [commentsList, setCommentsList] = useState<Comment[]>([])

  const handleSubmit = async () => {
    if (commentText.trim() !== '') {
      try {
        const response = await api.post(`/cards/${customerId}/comments/`, { text: commentText })
        const newComment: Comment = response.data
        setCommentsList([...commentsList, newComment])
        setComment('')
      } catch (error) {
        console.error('Error al enviar el comentario:', error)
      }
    }
  }

  useEffect(() => {
    getCustomerCardComments(customerId)
  }, [customerId])

  async function getCustomerCardComments(customerId: number) {
    try {
      const response = await api.get(`/cards/${customerId}/comments/`)
      setCommentsList(response.data)
    } catch (error) {
      console.error('Error al obtener los comentarios:', error)
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          label="Escribe un comentario"
          value={commentText}
          onChangeText={setComment}
          style={{ flex: 1 }}
        />
        <IconButton
          icon="send"
          size={30}
          onPress={() => {
            console.log('Enviando comentario...')
            handleSubmit()
          }}
          accessibilityLabel="Enviar comentario"
        />
      </View>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Usuario</DataTable.Title>
            <DataTable.Title>Comentario</DataTable.Title>
            <DataTable.Title>Fecha de Modificación</DataTable.Title>
          </DataTable.Header>

          {commentsList.map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>
                {item.fullname} ({item.owner_name})
              </DataTable.Cell>
              <DataTable.Cell>{item.text}</DataTable.Cell>
              <DataTable.Cell>{item.last_modified}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 60,
    width: '90%',
  },
  commentItem: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 60,
  },
})
