import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export const CustomerCard = () => {
  const [nombreCliente, setNombreCliente] = useState("");
  const [estadoCliente, setEstadoCliente] = useState("");
  const [selectedClientType, setSelectedClientType] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleButtonPress = (estado) => {
    setEstadoCliente(estado);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputClient}
          onChangeText={setNombreCliente}
          value={nombreCliente}
          placeholder="Nombre Cliente/Titular"
        />
        <View style={styles.statusClient}>
          <Text style={styles.estadoText}>Estado: {estadoCliente}</Text>
          <TextInput style={styles.textInput} editable={false} value="Agente" />
          <TextInput
            style={styles.textInput}
            editable={false}
            value="Operador"
          />
          <TextInput
            style={styles.textInput}
            editable={false}
            value="Fecha ultimo cambio"
          />
          <TextInput
            style={styles.textInput}
            editable={false}
            value="Fecha de vencimiento"
          />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonStyile}>
            <Button
              title="Firmado"
              onPress={() => handleButtonPress("Firmado")}
            />
          </View>
          <View style={styles.buttonStyile}>
            <Button
              title="Aplazada con fecha"
              onPress={() => handleButtonPress("Aplazada con fecha")}
            />
          </View>
          <View style={styles.buttonStyile}>
            <Button
              title="Proceso de aceptacion"
              onPress={() => handleButtonPress("Proceso de aceptacion")}
            />
          </View>
          <View style={styles.buttonStyile}>
            <Button
              title="Estudio enviado"
              onPress={() => handleButtonPress("Estudio enviado")}
            />
          </View>
          <View style={styles.buttonStyile}>
            <Button
              title="Mal Contacto"
              onPress={() => handleButtonPress("Mal Contacto")}
            />
          </View>
          <View style={styles.buttonStyile}>
            <Button
              title="No firmado"
              onPress={() => handleButtonPress("No firmado")}
            />
          </View>
        </View>
      </View>
      <View style={styles.horizontalLine} />

      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Persona de contacto" />
        <TextInput style={styles.input} placeholder="Email Interlocutor" />
        <TextInput style={styles.input} placeholder="Cargo" />
        <TextInput style={styles.input} placeholder="Horario" />
        <TextInput style={styles.input} placeholder="CNAE" />
      </View>
      <View style={styles.horizontalLine} />

      <Text>Datos del Cliente</Text>
      <View style={styles.inputRow}>
        <TextInput style={styles.inputDateClient} placeholder="Email cliente" />

        
        <Picker
          selectedValue={selectedClientType}
          style={styles.inputDateClientPicker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedClientType(itemValue)
          }
        >
          <Picker.Item label="Tipo de cliente" value="" />
          <Picker.Item label="Cliente A" value="A" />
          <Picker.Item label="Cliente B" value="B" />
          <Picker.Item label="Cliente C" value="C" />
        </Picker>

        <Picker
          selectedValue={selectedDocumentType}
          style={styles.inputDateClientPicker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedDocumentType(itemValue)
          }
        >
          <Picker.Item label="Tipo de documento" value="" />
          <Picker.Item label="DNI" value="DNI" />
          <Picker.Item label="Pasaporte" value="Pasaporte" />
          <Picker.Item
            label="Carnet de Extranjería"
            value="Carnet de Extranjería"
          />

        </Picker>
        <TextInput style={styles.input} placeholder="Numero de documento" />
        <Picker
          selectedValue={selectedDate}
          style={styles.inputDateClientPicker}
          onValueChange={(itemValue, itemIndex) => setSelectedDate(itemValue)}
        >
          <Picker.Item label="Fecha pap..." value="" />
          <Picker.Item label="01/01/2023" value="01/01/2023" />
          <Picker.Item label="02/02/2023" value="02/02/2023" />
          <Picker.Item label="03/03/2023" value="03/03/2023" />
        </Picker>

      </View>

      <View style={styles.horizontalLine} />

      <Text>Comentarios</Text>
      <View style={styles.horizontalLine} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputClient: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 20,
    padding: 10,
  },
  statusClient: {
    marginRight: 50,
    marginLeft: 20,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: 200,
  },
  buttonStyile: {
    marginBottom: 5,
  },
  estadoText: {
    fontSize: 16,
    marginTop: 10,
  },
  horizontalLine: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    flex: 1,
    padding: 10,
  },
  inputDateClient: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    flex: 1,
    padding: 10,
  },
  inputDateClientPicker: {
    height: 40,
    borderColor: "#000",
    borderWidth: 0,
    marginRight: 10,
    flex: 1,
  },
});
