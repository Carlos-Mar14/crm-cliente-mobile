import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Icon } from "react-native-elements";
import { Table, Row } from "react-native-table-component";
import { api } from "../../utils/api";
import { ComponentSupplyPoint } from "./ComponentSupplyPoint";
import { SupplyPoint, ApiResponse } from "./CustomerCard";
import CreateCupsModal from "./CreateCupsModal";

//Este es el que lleva SupplyPointList
export interface SupplyPointEnergy {
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

type SupplyPointState = SupplyPoint[] | { [key: string]: SupplyPoint[] };

export const SupplyPointList = () => {
  const [events, setEvents] = useState<SupplyPointState>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const eventsArray = Object.entries(events).map(([address, data]) => ({
    address,
    data,
  }));

  useEffect(() => {
    getItems();
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  function groupAddress(data) {
    const grouped = {};
    data.forEach((item) => {
      const address = item.full_address;
      if (!groupAddress[address]) {
        grouped[address] = [];
      }
      grouped[address].push(item);
    });
    return grouped;
  }

  async function getItems() {
    const response = await api.get<ApiResponse>("/puntos/");
    const groupedData = groupAddress(response.data.results);
    //console.log("Datos obtenidos:", response.data);
    setEvents(groupedData);
    //console.log("Datos cargados en el estado:", events);
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

  const renderItem = ({ item }) => {
    let luzRow = Array(14).fill("");
    let gasRow = Array(14).fill("");

    const hasLuz = item.data.some((event) => event.punto_luz);
    const hasGas = item.data.some((event) => event.punto_gas);

    let buttonStyle;
    let buttonText = "Agregar CUPS";
    if (hasLuz) {
      buttonStyle = styles.buttonAddGas;
      buttonText = "AÑADIR CUPS GAS";
    } else if (hasGas) {
      buttonStyle = styles.buttonAddLuz;
      buttonText = "AÑADIR CUPS LUZ";
    } else {
      buttonStyle = styles.buttonAddLuz;
    }

    item.data.forEach((event) => {
      if (event.punto_luz) {
        luzRow = [
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
        ];
      }
      if (event.punto_gas) {
        gasRow = [
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
        ];
      }
    });

    if (!hasLuz) {
      luzRow = luzRow.map((cell, index) => {
        if (index === 0) {
          // Asumiendo que el primer elemento es el lugar para el botón
          return (
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonAddCupsText}>{buttonText}</Text>
            </TouchableOpacity>
          );
        }
        return cell;
      });
    }

    if (!hasGas) {
      gasRow = gasRow.map((cell, index) => {
        if (index === 0) {
          // Asumiendo que el primer elemento es el lugar para el botón
          return (
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => console.log("Agregarrrr CUPS")}
            >
              <Text style={styles.buttonAddCupsText}>{buttonText}</Text>
            </TouchableOpacity>
          );
        }
        return cell;
      });
    }

    return (
      <View key={item.address}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon type="material" name="location-on" size={15} color="#cb3234" />
          <Text style={styles.fullAddressText}>{item.address}</Text>
        </View>
        <Table>
          <Row
            data={tableHead.map((headItem) => (
              <Text style={styles.headText}>{headItem}</Text>
            ))}
            style={styles.head}
            widthArr={[
              190, 190, 60, 80, 35, 35, 35, 35, 35, 35, 180, 100, 130, 100,
            ]}
          />
          <Row
            data={luzRow.map((cellData) => (
              <Text style={styles.textInCell}>{cellData}</Text>
            ))}
            style={styles.row}
            widthArr={[
              190, 190, 60, 80, 35, 35, 35, 35, 35, 35, 180, 100, 130, 100,
            ]}
          />
          <Row
            data={gasRow.map((cellData) => (
              <Text style={styles.textInCell}>{cellData}</Text>
            ))}
            style={styles.row}
            widthArr={[
              190, 190, 60, 80, 35, 35, 35, 35, 35, 35, 180, 100, 130, 100,
            ]}
          />
        </Table>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.searchAndButtonsContainer}>
        <Text
          style={{
            fontWeight: "bold",
            width: 170,
            marginRight: 800,
          }}
        >
          Puntos de Suministros
        </Text>
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
      {/* TODO: mover este modal a nuevo archivo "CreateCupsModal" */}
      <CreateCupsModal visible={modalVisible} onClose={handleCloseModal} />

      <View style={styles.psPadre}>
        <FlatList
          data={eventsArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.address}
          style={styles.flatList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchAndButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: 260,
    marginLeft: 980,
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
  psPadre: {
    height: 170,
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
  fullAddressText: {
    fontSize: 12,
    fontWeight: "bold",
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
  flatListStyle: {
    flexDirection: "row",
    alignItems: "center",
    height: 25,
  },
  flatList: {},
  buttonAddLuz: {
    color: "#008000",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#008000",
    width: 150,
    height: 25,
    textAlign: "center",
    marginTop: 5,
    marginBottom: -20,
    alignItems: "center",
    marginLeft: 700,
  },
  buttonAddGas: {
    color: "#008000",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#008000",
    width: 150,
    height: 25,
    textAlign: "center",
    marginTop: 5,
    marginBottom: -20,
    alignItems: "center",
    marginLeft: 700,
  },
  buttonAddCupsText: {
    color: "#008000",
    fontWeight: "bold",
  },
});
