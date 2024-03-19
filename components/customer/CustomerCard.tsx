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
import { Table, Row, Cell } from "react-native-table-component";
import { api } from "../../utils/api";

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SupplyPoint[];
}

interface SupplyPointEnergy {
  id: number;
  files: string;
  cups: string;
  company: string;
  tarif: string;
  consumo: number;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  p5: number;
  p6: number;
  fecha_cambio: string;
  fecha_firma: string;
  status_text: string;
  status: string;
}

interface SupplyPoint {
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

interface CustomerPhones {
  id?: number;
  value: string;
  desc: null;
  card_id: number;
  card_name: string;
}

interface SheetData {
  id?: number;
  name?: string;
  agent?: string;
  operator?: string;
  phone?: CustomerPhones;
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
  const [showDoc, setShowDoc] = useState(false);
  const [events, setEvents] = useState<SupplyPoint[]>([]);
  const [fullAddress, setFullAddress] = useState("");
  const [idSheet, setIdSheet] = useState("");
  const [customerFile, setCustomerFile] = useState<SheetData | null>(null);

  useEffect(() => {
    getItems();
    getSheetItems();
  }, []);

  async function getItems() {
    const response = await api.get<ApiResponse>("/puntos/");
    console.log("Datos obtenidos:", response.data);
    setEvents(response.data.results);
    if (response.data.results.length > 0) {
      setFullAddress(response.data.results[0].full_address);
      setIdSheet(response.data[0].id)
    }
    console.log("Datos cargados en el estado:", events);
  }

  async function getSheetItems() {
    try {
      const response = await api.get<SheetData>("/ficha/");
      console.log("Datos obtenidos de /ficha/:", response.data);
      setCustomerFile(response.data);
      setSelectedClientType(response.data.client_type);
      setstatusClient(response.data.status);
      setIdSheet(response.data.id[0]);
    } catch (error) {
      console.error("Error al obtener los datos de /ficha/:", error);
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

  const statusColors = {
    Firmado: "rgba(0, 128, 0, 0.7)",
    "Aplazada con fecha": "rgba(255, 128, 0, 0.9)",
    "Proceso de aceptacion": "rgba(0, 82, 255, 0.9)",
    "Estudio enviado": "rgba(0, 82, 255, 0.9)",
    "Mal Contacto": "rgba(255, 0, 0, 0.8)",
    "No firmado": "rgba(255, 0, 0, 0.8)",
    "Proceso aceptacion": "rgba(0, 82, 255, 0.9)",
  };

  const renderSupplyPointsTable = () => {
    if (!Array.isArray(events)) {
      return null;
    }

    const tableHead = [
      "CUPS",
      "Comerc",
      "Tarifa",
      "Consumo",
      "P1",
      "P2",
      "P3",
      "P4",
      "P5",
      "P6",
      "Ult. Cambio de comerc",
      "Fecha Firma",
      "Estado",
    ];

    const tableData = events.flatMap((event) => {
      const rows = [];
      if (event.punto_luz) {
        rows.push([
          event.punto_luz.cups,
          event.punto_luz.company,
          event.punto_luz.tarif,
          event.punto_luz.consumo,
          event.punto_luz.p1,
          event.punto_luz.p2,
          event.punto_luz.p3,
          event.punto_luz.p4,
          event.punto_luz.p5,
          event.punto_luz.p6,
          event.punto_luz.fecha_cambio,
          event.punto_luz.fecha_firma,
          event.punto_luz.status_text,
        ]);
      }
      if (event.punto_gas) {
        rows.push([
          event.punto_gas.cups,
          event.punto_gas.company,
          event.punto_gas.tarif,
          event.punto_gas.consumo,
          event.punto_gas.p1,
          event.punto_gas.p2,
          event.punto_gas.p3,
          event.punto_gas.p4,
          event.punto_gas.p5,
          event.punto_gas.p6,
          event.punto_gas.fecha_cambio,
          event.punto_gas.fecha_firma,
          event.punto_gas.status_text,
        ]);
      }
      return rows;
    });

    return (
      <Table>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {tableData.map((rowData, rowIndex) => (
          <Row
            key={rowIndex}
            data={rowData}
            style={{
              ...styles.row,
              backgroundColor: rowIndex % 2 ? "#F7F6E7" : "transparent",
            }}
            textStyle={styles.text}
          />
        ))}
      </Table>
    );
  };

  return (
    <View style={styles.container}>
      {idSheet && (
            <Text style={styles.fullAddressText}>{idSheet}</Text>
          )}
      {customerFile && (
        <View style={styles.inputContainer}>
          <View style={styles.titleInputContainer}>
            <Text style={{ fontWeight: "bold" }}>Nombre Cliente/Titular</Text>
            <TextInput
              style={styles.inputClient}
              onChangeText={setnameClient}
              value={customerFile.name}
              placeholder="Escribe el nombre..."
            />
          </View>
          <View style={styles.statusClient}>
            <Text style={styles.estadoText}>Estado:</Text>
            <Text
              style={[
                styles.estadoText,
                { backgroundColor: statusColors[statusClient] },
              ]}
            >
              {statusClient}
            </Text>
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
            <Text style={{ fontWeight: "bold" }}>Persona de contacto</Text>
            <TextInput
              style={styles.input}
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

      <Text style={{ fontWeight: "bold" }}>Datos del Cliente</Text>

      {customerFile && (
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputDateClient}
            placeholder={customerFile.persona_contacto_email}
          />
          <Picker
            selectedValue={selectedClientType}
            style={styles.inputDateClientPicker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedClientType(itemValue)
            }
          >
            <Picker.Item label="Tipo de cliente" value="" />
            <Picker.Item label="Cliente J" value="J" />
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
          <View style={styles.titleClientContactContainer}>
            <Text style={{ fontWeight: "bold" }}>Numero de documento</Text>
            <TextInput style={styles.input} placeholder={customerFile.dni} />
          </View>
          <Picker
            selectedValue={selectedDate}
            style={styles.inputDateClientPicker}
            onValueChange={(itemValue, itemIndex) => setSelectedDate(itemValue)}
          >
            <Picker.Item
              label="Factura pap..."
              value={customerFile.factura_en_papel}
            />
            <Picker.Item label="Si" value="Si" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      )}
      <View style={styles.horizontalLine} />

      <Text style={{ fontWeight: "bold" }}>Observaciones</Text>

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
        <View style={styles.psPadre}>
          <View style={styles.psStyle}>
            <Text style={{ fontWeight: "bold" }}>Puntos de Suministros</Text>
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
          {fullAddress && (
            <Text style={styles.fullAddressText}>{fullAddress}</Text>
          )}
          <View style={styles.psContainer}>{renderSupplyPointsTable()}</View>
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
    marginBottom: 5,
    flex: 1,
    marginRight: 10,
  },
  inputClient: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 20,
    padding: 10,
    flex: 1,
  },
  titleInputContainer: {
    flexDirection: "column",
    height: 60,
    //marginRight: 30,
    alignItems: "center",
    flex: 1,
  },
  estadoText: {
    fontSize: 16,
    marginBottom: 10,
    alignContent: "center",
    fontWeight: "bold",
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
    marginTop: 5,
    marginBottom: 5
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleClientContactContainer: {
    flex: 1,
    height: 60,
    //marginRight: 30,
    //alignItems: "center",
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
  psPadre: {
    marginTop: -20,
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
    // borderWidth: 1,
    // borderColor: "#000",
    // padding: 8,
    //marginBottom: 16,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
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
    marginRight: 5,
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
  fullAddressText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: -20,
  },
  head: {
    height: 20,
    backgroundColor: "#f1f8",
  },
  text: {
    fontSize: 12,
    flex: 1,
    textAlign: "center",
  },
  row: {
    height: 40,
    //width: 100,
    backgroundColor: "#E7E6",
    flexDirection: "row",
  },
  cell: {
    flex: 1,
  },
});
