import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ProgressLoading } from '../ProgressLoading'
import { PhoneNumber } from './PhoneNumber'
import { useCustomer } from './hooks/customer'

export const CustomerCard = ({ customerId }) => {
  const { customer } = useCustomer(customerId)
  const statusColors = {
    Firmado: 'rgba(0, 128, 0, 0.7)',
    'Aplazada con fecha': 'rgba(255, 128, 0, 0.9)',
    'Proceso de aceptacion': 'rgba(0, 82, 255, 0.9)',
    'Estudio enviado': 'rgba(0, 82, 255, 0.9)',
    'Mal Contacto': 'rgba(255, 0, 0, 0.8)',
    'No firmado': 'rgba(255, 0, 0, 0.8)',
    'Proceso aceptacion': 'rgba(0, 82, 255, 0.9)',
  }

  if (!customer) {
    return <ProgressLoading />
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.inputContainer}>
        <View style={styles.titlePhoneInputContainer}>
          <View style={styles.titleInputContainer}>
            <Text style={{ fontWeight: 'bold' }}>Nombre Cliente/Titular</Text>
            <TextInput
              style={styles.inputClient}
              value={customer.name}
              placeholder="Escribe el nombre..."
            />
          </View>
          <View>
            <PhoneNumber customerId={customerId} />
          </View>
        </View>
        <View style={styles.statusClient}>
          <View
            style={{
              backgroundColor: statusColors[customer.status],
              marginTop: -3,
            }}>
            <Text style={styles.estadoText}>Estado:</Text>
            <Text
              style={{
                ...styles.estadoText,
                marginTop: -13,
                marginBottom: -1,
              }}>
              {customer.status}
            </Text>
          </View>
          <Text style={{ fontWeight: 'bold' }}>Nombre Agente</Text>
          <TextInput style={styles.textInput} value={customer.agent} />
          <Text style={{ fontWeight: 'bold' }}>Operador</Text>
          <TextInput style={styles.textInput} value={customer.operator} />
          <Text style={{ fontWeight: 'bold' }}>Fecha Vencimiento</Text>
          <TextInput style={styles.textInput} value={customer.created_at} />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.buttonStyle, { backgroundColor: 'rgba(0, 128, 0, 0.7)' }]}>
            <Text style={styles.buttonText}>Firmado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, { backgroundColor: 'rgba(255, 128, 0, 0.9)' }]}>
            <Text style={styles.buttonText}>Aplazada con fecha</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, { backgroundColor: 'rgba(0, 82, 255, 0.9))' }]}>
            <Text style={styles.buttonText}>Proceso de aceptacion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, { backgroundColor: 'rgba(0, 82, 255, 0.9)' }]}>
            <Text style={styles.buttonText}>Estudio enviado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, { backgroundColor: 'rgba(255, 0, 0, 0.8)' }]}>
            <Text style={styles.buttonText}>Mal Contacto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, { backgroundColor: 'rgba(255, 0, 0, 0.8)' }]}>
            <Text style={styles.buttonText}>No firmado</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      {customer && (
        <View style={styles.inputRow}>
          <View style={styles.titleClientContactContainer}>
            <Text style={{ fontWeight: 'bold', marginLeft: -25 }}>Persona de contacto</Text>
            <TextInput style={styles.namePersonContac} placeholder={customer.persona_contacto} />
          </View>
          <View style={styles.titleClientContactContainer}>
            <Text style={{ fontWeight: 'bold' }}>Email Interlocutor</Text>
            <TextInput style={styles.input} placeholder={customer.email} />
          </View>
          <View style={styles.titleClientContactContainer}>
            <Text style={{ fontWeight: 'bold' }}>Cargo</Text>
            <TextInput style={styles.input} placeholder={customer.cargo} />
          </View>
          <View style={styles.titleClientContactContainer}>
            <Text style={{ fontWeight: 'bold' }}>Horario</Text>
            <TextInput style={styles.input} placeholder={customer.schedule} />
          </View>
          <View style={styles.titleClientContactContainer}>
            <Text style={{ fontWeight: 'bold' }}>CNAE</Text>
            <TextInput style={styles.input} placeholder={customer.cnae} />
          </View>
        </View>
      )}
      <View style={styles.horizontalLine} />

      <Text style={{ fontWeight: 'bold', marginBottom: -15 }}>Datos del Cliente</Text>
      {customer && (
        <View style={styles.inputRowClient}>
          <TextInput style={styles.inputDateClient} placeholder={customer.persona_contacto_email} />
          <View style={styles.inputPickerTypeDocument}>
            <Text style={{ fontWeight: 'bold', marginTop: -22 }}>Tipo de Cliente</Text>
            <Picker selectedValue={customer.client_type} style={styles.inputDateClientPicker} />
          </View>
          <View style={styles.inputPickerTypeDocument}>
            <Text style={{ fontWeight: 'bold', marginTop: -22 }}>Tipo de Documento</Text>
            <Picker style={styles.inputDateClientPicker}>
              <Picker.Item label="DNI" value="DNI" />
              <Picker.Item label="Pasaporte" value="Pasaporte" />
            </Picker>
          </View>
          <View style={styles.containerNumberDocument}>
            <Text style={{ fontWeight: 'bold' }}>Numero de documento</Text>
            <TextInput style={styles.input} placeholder={customer.dni} />
          </View>
          <View style={styles.inputPickerTypeDocument}>
            <Text style={{ fontWeight: 'bold', marginTop: -22 }}>Factura en Papel</Text>
            <Picker selectedValue={customer.factura_en_papel} style={styles.inputDateClientPicker}>
              <Picker.Item label="Si" value="Si" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
        </View>
      )}
      <View style={styles.horizontalLine} />

      <View>
        <Text style={{ fontWeight: 'bold' }}>Observaciones</Text>
        <TextInput placeholder="Observaciones..." />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 250,
  },
  inputClient: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    padding: 5,
    width: 250,
    textAlign: 'center',
  },
  titlePhoneInputContainer: {
    alignItems: 'center',
    width: 250,
    height: 250,
    marginRight: 170,
    marginLeft: 30,
  },
  titleInputContainer: {
    flexDirection: 'column',
    height: 60,
    alignItems: 'center',
    width: 250,
  },
  estadoText: {
    fontSize: 16,
    marginBottom: 5,
    alignContent: 'center',
    fontWeight: 'bold',
  },
  statusClient: {
    marginRight: 190,
    width: 350,
  },
  textInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 200,
    marginRight: 30,
  },
  buttonStyle: {
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  horizontalLine: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginVertical: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 23,
  },
  inputRowClient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  titleClientContactContainer: {
    flex: 1,
    height: 60,
  },
  namePersonContac: {
    height: 38,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 15,
    padding: 10,
    marginHorizontal: -25,
  },
  containerNumberDocument: {
    flex: 1,
    height: 60,
    marginTop: -10,
  },
  input: {
    height: 38,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
  },
  inputDateClient: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  inputDateClientPicker: {
    marginRight: 10,
    flex: 1,
    marginTop: -10,
  },
  inputPickerTypeDocument: {
    marginRight: 10,
    flex: 1,
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
  },
})
