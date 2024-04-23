import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, DataTable, IconButton, Modal, Text } from 'react-native-paper'
import { api } from '../../utils/api'
import { Picker } from '@react-native-picker/picker'

interface DocumentData {
  id: number
  created_at: string
  created_by_persistent: string
  file: string
  file_type: number
  created_by: number
  card: number
}

export default function ComponentDocuments({ customerId }: { customerId: number }) {
  const [documents, setDocuments] = useState<DocumentData[]>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [fileType, setFileType] = useState(0)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    getCustomerCardDocuments(customerId)
  }, [customerId])

  async function getCustomerCardDocuments(customerId: number) {
    try {
      const response = await api.get(`/cards/${customerId}/files/`)
      setDocuments(response.data)
    } catch (error) {
      console.error('Error al obtener los documentos:', error)
    }
  }

  const getFileTypeText = (fileType: number) => {
    switch (fileType) {
      case 1:
        return 'PDF'
      case 2:
        return 'Imagen'
      default:
        return '-----'
    }
  }
  const getShortFileName = (url: string) => {
    const segments = url.split('/')
    if (segments.length >= 5) {
      const shortUrl = segments.slice(4).join('/')
      return shortUrl
    }
    return url
  }

  const handleAddDocument = () => {
    try {
      const response = api.post(`/cards/${customerId}/files/`, {
        file: fileName,
        file_type: fileType,
      })
    } catch (error) {
      console.error('Error al obtener los documentos:', error)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          icon="plus"
          buttonColor="#008000"
          mode="contained"
          onPress={() => setModalVisible(true)}>
          AÑADIR NUEVO ARCHIVO
        </Button>
        <IconButton
          icon="refresh"
          iconColor="#008000"
          size={25}
          onPress={() => getCustomerCardDocuments(customerId)}
        />
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Fecha</DataTable.Title>
          <DataTable.Title>Usuario</DataTable.Title>
          <DataTable.Title>Archivo</DataTable.Title>
          <DataTable.Title>Tipo</DataTable.Title>
        </DataTable.Header>
        {documents.map((document) => (
          <DataTable.Row key={document.id}>
            <DataTable.Cell>{document.created_at}</DataTable.Cell>
            <DataTable.Cell>{document.created_by_persistent}</DataTable.Cell>
            <DataTable.Cell>{getShortFileName(document.file)}</DataTable.Cell>
            <DataTable.Cell>{getFileTypeText(document.file_type)}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Modal
        visible={modalVisible}
        contentContainerStyle={styles.modalContent}
        style={styles.modal}
        onDismiss={() => setModalVisible(false)}>
        <View style={styles.modalInner}>
          <Text style={styles.modalTitle}>AÑADIR NUEVO ARCHIVO</Text>
          <IconButton
            icon="close"
            style={styles.closeButton}
            iconColor="#FF0000"
            size={30}
            onPress={() => setModalVisible(false)}
          />
          <Text style={styles.modalTextTypeDoc}>Tipo de archivo</Text>
          <Picker
            selectedValue={fileType}
            onValueChange={(itemValue) => setFileType(itemValue)}
            style={styles.picker}>
            <Picker.Item label="-----" value={0} />
            <Picker.Item label="DNI" value={1} />
            <Picker.Item label="CIF" value={2} />
            <Picker.Item label="DNI Representante Legal" value={3} />
            <Picker.Item label="Otros" value={4} />
          </Picker>
          <Button
            mode="contained"
            buttonColor="#a9a9a9"
            accessibilityLabel="Seleccionar archivo"
            //   onPress={pickDocument}
            style={styles.buttonAddDocument}>
            SELECCIONAR ARCHIVO
          </Button>
          <Button
            mode="contained"
            buttonColor="#008000"
            accessibilityLabel="Añadir archivo"
            onPress={handleAddDocument}
            style={styles.buttonAddDcoc}>
            AÑADIR
          </Button>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 30,
    width: '95%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '35%',
    height: '45%',
  },
  modalInner: {
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    right: '19%',
  },
  closeButton: {
    left: '50%',
    bottom: 35,
  },
  modalTextTypeDoc: {
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 190,
    marginTop: -30,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  picker: {
    width: '80%',
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: '#ededed',
  },
  buttonAddDocument: {
    marginRight: 70,
    // width: '100%',
    // marginTop: 10,
  },
  buttonAddDcoc: {
    width: '30%',
    marginTop: 10,
    marginLeft: 280,
  },
})
