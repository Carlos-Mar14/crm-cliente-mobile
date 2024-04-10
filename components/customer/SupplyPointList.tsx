import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { Icon, ListItem } from "@rneui/themed";
import { Table, Row } from "react-native-table-component";
import { api } from "../../utils/api";
import { ComponentSupplyPoint } from "./ComponentSupplyPoint";
import { SupplyPoint, ApiResponse } from "./CustomerCard";
import CreateCupsModal from "./CreateCupsModal";
import SupplyPointDetails from "./SupplyPointDetails";
import SupplyPointEnergy from "./Supply_PointEnergy";

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

  const eventsArray = useMemo(() => {
    return Object.entries(events).map(([address, data]) => ({
      address,
      data,
    }));
  }, [events]);

  useEffect(() => {
    getItems();
  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  function groupAddress(data) {
    const grouped = {};
    data.forEach((item) => {
      const address = item.full_address;
      if (!grouped[address]) {
        grouped[address] = [];
      }
      grouped[address].push(item);
    });
    return grouped;
  }

  async function getItems() {
    const response = await api.get<ApiResponse>("/puntos/");
    const groupedData = groupAddress(response.data.results);
    // console.log("Datos obtenidos:", response.data);
    setEvents(groupedData);
    //console.log("Datos cargados en el estado:", events);
  }

  const renderItem = ({ item }) => {
    return item.data.map((punto, index) => (
      <SupplyPointDetails key={index} punto={punto} children={undefined}>
        {/* <SupplyPointEnergy data={luzRow} />
        <SupplyPointEnergy data={gasRow} /> */}
      </SupplyPointDetails>
    ));
  };

  return (
    <View>
      <View style={styles.searchAndButtonsContainer}>
        <Text style={styles.titlePs}>Puntos de Suministros</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por CUPS"
            placeholderTextColor="#9c9c9c"
          />
          <Icon name="search" type="material" size={33} color="#9c9c9c" />
        </View>
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

//TODO: limpiar estilos!
const styles = StyleSheet.create({
  searchAndButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: 310,
    height: 40,
    marginTop: 5,
    marginLeft: 930,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9c9c9c",
    borderRadius: 5,
  },
  searchInput: {
    fontSize: 16,
    color: "#000",
    paddingRight: 20, // Asegúrate de que el texto no se superponga con el ícono
  },
  titlePs: {
    fontWeight: "bold",
    marginRight: 780,
    width: 170,
    height: 20,
  },
  psPadre: {
    marginTop: -200, //TODO: Estilo temporal
    height: 300,
    borderWidth: 1,
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
