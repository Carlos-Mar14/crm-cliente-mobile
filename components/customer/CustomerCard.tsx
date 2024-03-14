import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Icon } from "react-native-elements";
import { api } from "../../utils/api";

interface SupplyPointEnergy {
  id: number;
  files: string;
  cups: string;
  company: string;
  tarif: string;
  consumption: number;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  p5: number;
  p6: number;
  change_date: string;
  signature_date: string;
  status_text: string;
  status: string;
}

interface SupplyPoint {
  point_luz?: SupplyPointEnergy;
  point_gas?: SupplyPointEnergy;
  state: string;
  create_at: string;
  direction: string;
  locality: string;
  postalcode: string;
  card: string;
  create_by: string;
}

export const CustomerCard = () => {
  const [nameClient, setnameClient] = useState("");
  const [statusClient, setstatusClient] = useState("");
  const [selectedClientType, setSelectedClientType] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showCommentsField, setShowCommentsField] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showPsField, setShowPsField] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const [events, setEvents] = useState<SupplyPoint[]>([]);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const { data }: { data: SupplyPoint[] } = await api.get("/puntos/");
    setEvents(data);
  }

  const handleButtonPress = (estado) => {
    setstatusClient(estado);
  };

  const handleCommentsButtonPress = () => {
    setShowCommentsField(true);
    setShowPsField(false);
    setShowDoc(false);
  };

  const handlePsButtonPress = () => {
    setShowPsField(true);
    setShowCommentsField(false);
    setShowDoc(false);
  };

  const handleDocButtonPress = () => {
    setShowDoc(true);
    setShowCommentsField(false);
    setShowPsField(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputClient}
          onChangeText={setnameClient}
          value={nameClient}
          placeholder="Nombre Cliente/Titular"
        />
        <View style={styles.statusClient}>
          <Text style={styles.estadoText}>Estado:</Text>
          <Text style={styles.estadoText}>{statusClient}</Text>
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
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              { backgroundColor: "rgba(0, 128, 0, 0.7)" },
            ]}
            onPress={() => handleButtonPress("Firmado")}
          >
            <Text style={styles.buttonText}>Firmado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              { backgroundColor: "rgba(255, 128, 0, 0.9)" },
            ]}
            onPress={() => handleButtonPress("Aplazada con fecha")}
          >
            <Text style={styles.buttonText}>Aplazada con fecha</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              { backgroundColor: "rgba(0, 82, 255, 0.9))" },
            ]}
            onPress={() => handleButtonPress("Proceso de aceptacion")}
          >
            <Text style={styles.buttonText}>Proceso de aceptacion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              { backgroundColor: "rgba(0, 82, 255, 0.9)" },
            ]}
            onPress={() => handleButtonPress("Estudio enviado")}
          >
            <Text style={styles.buttonText}>Estudio enviado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              { backgroundColor: "rgba(255, 0, 0, 0.8)" },
            ]}
            onPress={() => handleButtonPress("Mal Contacto")}
          >
            <Text style={styles.buttonText}>Mal Contacto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              { backgroundColor: "rgba(255, 0, 0, 0.8)" },
            ]}
            onPress={() => handleButtonPress("No firmado")}
          >
            <Text style={styles.buttonText}>No firmado</Text>
          </TouchableOpacity>
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
          <Picker.Item label="Factura pap..." value="" />
          <Picker.Item label="Si" value="Si" />
          <Picker.Item label="No" value="No" />
        </Picker>
      </View>

      <View style={styles.horizontalLine} />

      <Text>Observaciones</Text>

      <View style={styles.horizontalLine} />

      <View style={styles.containerFooterButton}>
        <View style={styles.buttonFooter}>
          <Button title="Comentarios" onPress={handleCommentsButtonPress} />
          <Button title="P.S" onPress={handlePsButtonPress} />
          <Button title="DOC" onPress={handleDocButtonPress} />
        </View>
      </View>

      {showCommentsField && (
        <View style={styles.commentsContainer}>
          <TextInput
            style={styles.commentsInput}
            onChangeText={setCommentText}
            value={commentText}
            placeholder="Nuevo comentario..."
          />
          <Button
            title="Enviar"
            onPress={() => console.log("Comentario enviado:", commentText)}
          />
        </View>
      )}

      {showPsField && (
        <View>
          <View style={styles.psStyle}>
            <Text>Puntos de Suministros</Text>
            <View style={styles.searchAndButtonsContainer}>
              <TextInput
                style={styles.searchInput}
                // onChangeText={} // UseState = set
                // value={} //UseSate
                placeholder="Buscar por CUPS"
              />
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => console.log("Agregar")}
              >
                <Text> + </Text>
                {/* <Icon name="plus" size={20} color="#FFF" /> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => console.log("Actualizar")}
              >
                <Icon name="refresh" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.psContainer}>
            <Text style={styles.titlePs}>CUPS</Text>
            <Text style={styles.titlePs}>Comerc</Text>
            <Text style={styles.titlePs}>Tarifa</Text>
            <Text style={styles.titlePs}>Consumo</Text>
            <Text style={styles.titlePs}>P1</Text>
            <Text style={styles.titlePs}>P2</Text>
            <Text style={styles.titlePs}>P3</Text>
            <Text style={styles.titlePs}>P4</Text>
            <Text style={styles.titlePs}>P5</Text>
            <Text style={styles.titlePs}>P6</Text>
            <Text style={styles.titlePs}>Ult. Cambio de comerc</Text>
            <Text style={styles.titlePs}>Fecha Firma</Text>
            <Text style={styles.titlePs}>Estado</Text>
          </View>
        </View>
      )}

      {showDoc && (
        <View>
          <View style={styles.docStyle}>
            <View style={styles.buttonNewFile}>
              <Button title="+ AÑADIR NUEVO ARCHIVO" />
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => console.log("Actualizar")}
              >
                <Icon name="refresh" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.docContainer}>
            <Text style={styles.titlePs}>Fecha</Text>
            <Text style={styles.titlePs}>Usuario</Text>
            <Text style={styles.titlePs}>Archivo</Text>
            <Text style={styles.titlePs}>Typo</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flex: 1,
    marginRight: 10,
  },
  inputClient: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 20,
    padding: 10,
    flex: 1,
  },
  estadoText: {
    fontSize: 16,
    marginBottom: 10,
    alignContent: "center",
  },
  statusClient: {
    marginRight: 100,
    marginLeft: 20,
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: 200,
    marginLeft: 100,
    marginRight: 100,
  },
  buttonStyle: {
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
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
    marginRight: 10,
    flex: 1,
  },
  containerFooterButton: {
    alignItems: "center",
  },
  buttonFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginTop: 5,
  },
  commentsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  commentsInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    flex: 1,
    padding: 10,
  },
  psStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchAndButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 40,
    flex: 1,
    justifyContent: "flex-end",
  },
  psContainer: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  docContainer: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 8,
    width: 150,
    borderRadius: 5,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  titlePs: {},
  docStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonNewFile: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
});
