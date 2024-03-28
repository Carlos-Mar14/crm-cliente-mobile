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
import { PhoneNumber } from "./PhoneNumber";
import { ComponentSupplyPoint } from "./ComponentSupplyPoint";

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
  firma: string;
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

interface SheetData {
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
    //console.log("Datos obtenidos:", response.data);
    setEvents(response.data.results);
    if (response.data.results.length > 0) {
      setFullAddress(response.data.results[0].full_address);
    }
    //console.log("Datos cargados en el estado:", events);
  }

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
      "",
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
          event.punto_luz.firma,
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
          event.punto_gas.firma,
        ]);
      }
      return rows;
    });

    return (
      <Table>
        <Row
          data={tableHead.map((headItem) => (
            <Text style={styles.headText}>{headItem}</Text>
          ))}
          style={styles.head}
          widthArr={[
            190, 190, 60, 80, 30, 30, 30, 30, 30, 30, 180, 100, 130, 100,
          ]}
        />

        {tableData.map((rowData, rowIndex) => (
          <Row
            key={rowIndex}
            data={rowData.map((cellData, cellIndex) => (
              <Text style={styles.textInCell}>{cellData}</Text>
            ))}
            style={styles.row}
            widthArr={[
              190, 190, 60, 80, 30, 30, 30, 30, 30, 30, 180, 100, 130, 100,
            ]}
          />
        ))}
      </Table>
    );
  };

  return (
    <View style={styles.container}>
      {idSheet && (
        <Text style={styles.fullAddressText}>
          Datos de seguimiento Ficha: {idSheet}
        </Text>
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
      {showPsSection && (
        <View style={styles.searchAndButtonsContainer}>
          <TextInput style={styles.searchInput} placeholder="Buscar por CUPS" />
          <Icon type="material" name="search" size={33} color="#9c9c9c" />

          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => console.log("Agregar CUPS")}
          >
            <ComponentSupplyPoint />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => console.log("Actualizar")}
          >
            <Icon name="refresh" size={20} color="#008000" />
          </TouchableOpacity>
        </View>
      )}
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
          <Text style={{ fontWeight: "bold", marginBottom: -10 }}>
            Puntos de Suministros
          </Text>
          <View style={styles.psStyle}>
            <View style={styles.optionsCups}>
              <TouchableOpacity>
                <Text style={styles.buttonAddCups}>AÑADIR CUPS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCups}
                onPress={() => console.log("Actualizar")}
              >
                <Icon name="east" size={18} color="#ff8000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCupsAdd}
                onPress={() => console.log("Agregar")}
              >
                <Icon name="add" size={18} color="#007BFF" />
              </TouchableOpacity>
            </View>
          </View>
          {fullAddress && (
            <Text style={styles.fullAddressText}>
              <Icon
                type="material"
                name="location-on"
                size={15}
                color="#cb3234"
              />
              {fullAddress}
            </Text>
          )}

          <View style={styles.psContainer}>{renderSupplyPointsTable()}</View>
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
  psPadre: {
    height: 130,
  },
  psStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionsCups: {
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -5,
    marginLeft: 740,
    width: 250,
    height: 30,
  },
  buttonAddCups: {
    color: "#008000",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#008000",
    width: 110,
    height: 25,
    textAlign: "center",
    marginRight: 20,
    marginTop: 10,
    alignItems: "center",
  },
  buttonCups: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderColor: "#ff8000",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 40,
  },
  buttonCupsAdd: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderColor: "#007BFF",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchAndButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: 260,
    marginTop: -30,
    marginLeft: 980,
  },
  psContainer: {
    marginBottom: 15,
    justifyContent: "space-between",
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
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: -30,
    width: 170,
    borderRadius: 5,
    padding: 5,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#008000",
    borderWidth: 1,
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

  fullAddressText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: -20,
    width: 650,
  },
  head: {
    borderWidth: 0.4,
    borderColor: "#000",
  },
  row: {
    height: 30,
    borderWidth: 0.4,
    borderColor: "#000",

    alignItems: "center",
    justifyContent: "center",
  },
  textInCell: {
    textAlign: "center",
  },
  headText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
