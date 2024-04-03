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
import { PhoneNumber } from "./PhoneNumber";
import { SupplyPointList, SupplyPointEnergy } from "./SupplyPointList";

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SupplyPoint[];
}

// Este es el que lleva SupplyPointDetails
export interface SupplyPoint {
  punto_luz?: SupplyPointEnergy;
  punto_gas?: SupplyPointEnergy;
  id: number;
  full_address: string;
  state: string;
  create_at: string;
  direction: string;
  locality: string;
  postalcode: string;
  card: string;
  create_by: string;
}

export interface SheetData {
  id?: number;
  name?: string;
  agent?: string;
  operator?: string;
  last_modified?: string;
  created_at?: string;
  status?: string;
  persona_contacto?: string;
  email?: string;
  cargo?: string;
  schedule?: string;
  cnae?: string; // CNAE
  persona_contacto_email?: string;
  client_type?: string;
  document_type?: string;
  dni?: string;
  factura_en_papel?: string;
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
  const [showPsSection, setShowPsSection] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const [idSheet, setIdSheet] = useState("");
  const [customerFile, setCustomerFile] = useState<SheetData | null>(null);

  useEffect(() => {
    getSheetItems();
  }, []);

  async function getSheetItems() {
    try {
      const response = await api.get<SheetData>("/ficha/");
      //console.log("Datos obtenidos de /ficha/:", response.data);
      setCustomerFile(response.data);
      setSelectedClientType(response.data.client_type);
      setstatusClient(response.data.status);
      if (response.data && response.data.id) {
        setIdSheet(response.data.id.toString());
      }
    } catch (error) {
      //console.error("Error al obtener los datos de /ficha/:", error);
      setCustomerFile(null);
    }
  }

  const handleButtonPress = (estado) => {
    setstatusClient(estado);
  };

  const handleCommentsButtonPress = () => {
    setShowCommentsField(true);
    setShowPsField(false);
    setShowDoc(false);
    setShowPsSection(false);
  };

  const handlePsButtonPress = () => {
    setShowPsField(true);
    setShowCommentsField(false);
    setShowDoc(false);
    setShowPsSection(true);
  };

  const handleDocButtonPress = () => {
    setShowDoc(true);
    setShowCommentsField(false);
    setShowPsField(false);
    setShowPsSection(false);
  };

  const statusColors = {
    Firmado: "rgba(0, 128, 0, 0.7)",
    "Aplazada con fecha": "rgba(255, 128, 0, 0.9)",
    "Proceso de aceptacion": "rgba(0, 82, 255, 0.9)",
    "Estudio enviado": "rgba(0, 82, 255, 0.9)",
    "Mal Contacto": "rgba(255, 0, 0, 0.8)",
    "No firmado": "rgba(255, 0, 0, 0.8)",
    "Proceso aceptacion": "rgba(0, 82, 255, 0.9)",
  };

  return (
    <View style={styles.container}>
      {idSheet && (
        <Text style={styles.fullAddressTextFicha}>Ficha: {idSheet}</Text>
      )}
      {customerFile && (
        <View style={styles.inputContainer}>
          <View style={styles.titlePhoneInputContainer}>
            <View style={styles.titleInputContainer}>
              <Text style={{ fontWeight: "bold" }}>Nombre Cliente/Titular</Text>
              <TextInput
                style={styles.inputClient}
                onChangeText={setnameClient}
                value={customerFile.name}
                placeholder="Escribe el nombre..."
              />
            </View>
            <View>
              <PhoneNumber />
            </View>
          </View>
          <View style={styles.statusClient}>
            <View
              style={{
                backgroundColor: statusColors[statusClient],
                marginTop: -3,
              }}
            >
              <Text style={styles.estadoText}>Estado:</Text>
              <Text
                style={{
                  ...styles.estadoText,
                  marginTop: -13,
                  marginBottom: -1,
                }}
              >
                {statusClient}
              </Text>
            </View>
            <Text style={{ fontWeight: "bold" }}>Nombre Agente</Text>
            <TextInput style={styles.textInput} value={customerFile.agent} />
            <Text style={{ fontWeight: "bold" }}>Operador</Text>
            <TextInput style={styles.textInput} value={customerFile.operator} />
            <Text style={{ fontWeight: "bold" }}>Ultimo Cambio</Text>
            <TextInput
              style={styles.textInput}
              value={customerFile.last_modified}
              editable={false}
            />
            <Text style={{ fontWeight: "bold" }}>Fecha Vencimiento</Text>
            <TextInput
              style={styles.textInput}
              value={customerFile.created_at}
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
      )}
      <View style={styles.horizontalLine} />
      {customerFile && (
        <View style={styles.inputRow}>
          <View style={styles.titleClientContactContainer}>
            <Text style={{ fontWeight: "bold", marginLeft: -25 }}>
              Persona de contacto
            </Text>
            <TextInput
              style={styles.namePersonContac}
              placeholder={customerFile.persona_contacto}
            />
          </View>
          <View style={styles.titleClientContactContainer}>
            <Text style={{ fontWeight: "bold" }}>Email Interlocutor</Text>
            <TextInput style={styles.input} placeholder={customerFile.email} />
          </View>
          <View style={styles.titleClientContactContainer}>
            <Text style={{ fontWeight: "bold" }}>Cargo</Text>
            <TextInput style={styles.input} placeholder={customerFile.cargo} />
          </View>
          <View style={styles.titleClientContactContainer}>
            <Text style={{ fontWeight: "bold" }}>Horario</Text>
            <TextInput
              style={styles.input}
              placeholder={customerFile.schedule}
            />
          </View>
          <View style={styles.titleClientContactContainer}>
            <Text style={{ fontWeight: "bold" }}>CNAE</Text>
            <TextInput style={styles.input} placeholder={customerFile.cnae} />
          </View>
        </View>
      )}
      <View style={styles.horizontalLine} />

      <Text style={{ fontWeight: "bold", marginBottom: -15 }}>
        Datos del Cliente
      </Text>
      {customerFile && (
        <View style={styles.inputRowClient}>
          <TextInput
            style={styles.inputDateClient}
            placeholder={customerFile.persona_contacto_email}
          />
          <View style={styles.inputPickerTypeDocument}>
            <Text style={{ fontWeight: "bold", marginTop: -22 }}>
              Tipo de Cliente
            </Text>
            <Picker
              selectedValue={selectedClientType}
              style={styles.inputDateClientPicker}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedClientType(itemValue)
              }
            >
              <Picker.Item label="Cliente J" value="J" />
              <Picker.Item label="Cliente K" value="K" />
              <Picker.Item label="Cliente M" value="M" />
            </Picker>
          </View>
          <View style={styles.inputPickerTypeDocument}>
            <Text style={{ fontWeight: "bold", marginTop: -22 }}>
              Tipo de Documento
            </Text>
            <Picker
              selectedValue={selectedDocumentType}
              style={styles.inputDateClientPicker}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDocumentType(itemValue)
              }
            >
              <Picker.Item label="DNI" value="DNI" />
              <Picker.Item label="Pasaporte" value="Pasaporte" />
              <Picker.Item
                label="Carnet de Extranjería"
                value="Carnet de Extranjería"
              />
            </Picker>
          </View>
          <View style={styles.containerNumberDocument}>
            <Text style={{ fontWeight: "bold" }}>Numero de documento</Text>
            <TextInput style={styles.input} placeholder={customerFile.dni} />
          </View>
          <View style={styles.inputPickerTypeDocument}>
            <Text style={{ fontWeight: "bold", marginTop: -22 }}>
              Factura en Papel
            </Text>
            <Picker
              selectedValue={selectedDate}
              style={styles.inputDateClientPicker}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDate(itemValue)
              }
            >
              <Picker.Item label="Si" value="Si" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
        </View>
      )}
      <View style={styles.horizontalLine} />

      <View>
        <Text style={{ fontWeight: "bold" }}>Observaciones</Text>
        <TextInput placeholder="Observaciones..."></TextInput>
      </View>
      <View style={styles.horizontalLine} />

      <View style={styles.containerFooterButton}>
        <View style={styles.buttonFooter}>
          <Button title="Comentarios" onPress={handleCommentsButtonPress} />
          <Button title="P.S" onPress={handlePsButtonPress} />
          <Button title="DOC" onPress={handleDocButtonPress} />
        </View>
      </View>

      {showPsSection && <SupplyPointList />}

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

      {showDoc && (
        <View>
          <View style={styles.docStyle}>
            <View style={styles.buttonNewFile}>
              <TouchableOpacity
                style={styles.addDocumentArchive}
                onPress={() => console.log("Cargar archivo")}
              >
                <Text style={styles.textStyleAddDoc}>
                  + AÑADIR NUEVO ARCHIVO
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.updateDocButton}
                onPress={() => console.log("Actualizar")}
              >
                <Icon name="refresh" size={30} color="#008000" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.docContainer}>
            <Text style={styles.titlePs}>Fecha</Text>
            <Text style={styles.titlePs}>Usuario</Text>
            <Text style={styles.titlePs}>Archivo</Text>
            <Text style={styles.titlePs}>Typo</Text>
            <TouchableOpacity
              style={styles.downloadFilesButton}
              onPress={() => console.log("Download")}
            >
              <Icon
                type="material"
                name="file-download"
                size={30}
                color="#9c9c9c"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Delete")}>
              <Icon name="delete" size={35} color="#FF0000" />
            </TouchableOpacity>
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
    justifyContent: "flex-start",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 250,
  },
  inputClient: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    padding: 5,
    width: 250,
    textAlign: "center",
  },
  titlePhoneInputContainer: {
    alignItems: "center",
    width: 250,
    height: 250,
    marginRight: 170,
    marginLeft: 30,
  },
  titleInputContainer: {
    flexDirection: "column",
    height: 60,
    alignItems: "center",
    width: 250,
  },
  estadoText: {
    fontSize: 16,
    marginBottom: 5,
    alignContent: "center",
    fontWeight: "bold",
  },
  statusClient: {
    marginRight: 190,
    width: 350,
  },
  textInput: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: 200,
    marginRight: 30,
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
    marginTop: 5,
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 23,
  },
  inputRowClient: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  titleClientContactContainer: {
    flex: 1,
    height: 60,
  },
  namePersonContac: {
    height: 38,
    borderColor: "gray",
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
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
  },
  inputDateClient: {
    height: 40,
    borderColor: "gray",
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
    borderColor: "#000",
    borderRadius: 2,
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
  docContainer: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonNewFile: {
    marginLeft: 960,
    width: 280,
    height: 40,
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginBottom: -8,
  },
  updateDocButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginLeft: 30,
  },
  addDocumentArchive: {
    backgroundColor: "#008000",
    borderWidth: 1,
    padding: 7,
    borderRadius: 10,
  },
  textStyleAddDoc: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  downloadFilesButton: {
    // width: 40,
    // height: 40,
    // justifyContent: "center",
    // alignItems: "center",
  },
  titlePs: {},
  docStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  fullAddressTextFicha: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: -45,
    width: 120,
  },
});
