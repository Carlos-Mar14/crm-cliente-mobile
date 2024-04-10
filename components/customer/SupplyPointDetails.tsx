// ps, direccion, crear nuevo luz/gas y SupplyPointEnergy
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { api } from "../../utils/api"; // Asegúrate de que esta ruta sea correcta
import { ApiResponse, SupplyPoint } from "./CustomerCard";
import { Icon, ListItem } from "react-native-elements";
import SupplyPointEnergy from "./Supply_PointEnergy";

const eventHeaders = [
  {
    label: "CUPS",
    value: "cups",
  },
  {
    label: "Comerc",
    value: "company",
  },
  {
    label: "Tarifa",
    value: "tarif",
  },
  {
    label: "Consumo",
    value: "consumo",
  },
  {
    label: "P1",
    value: "p1",
  },
  {
    label: "P2",
    value: "p2",
  },
  {
    label: "P3",
    value: "p3",
  },
  {
    label: "P4",
    value: "p4",
  },
  {
    label: "P5",
    value: "p5",
  },
  {
    label: "P6",
    value: "p6",
  },
  {
    label: "Últ. Cambio de comerc",
    value: "fecha_cambio",
  },
  {
    label: "Fecha Firma",
    value: "fecha_firma",
  },
  {
    label: "Estado",
    value: "status_text",
  },
];

type SupplyPointState = SupplyPoint[] | { [key: string]: SupplyPoint[] };

export default function SupplyPointDetails({ children, punto }) {
  const [events, setEvents] = useState<SupplyPointState>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [energyData, setEnergyData] = useState(null);

  const eventsArray = useMemo(() => {
    return Object.entries(events).map(([address, data]) => ({
      address,
      data,
    }));
  }, [events]);
  // console.log("eventsArray:", eventsArray);
  useEffect(() => {
    getItems();
  }, []);
  const handleOpenModal = () => {
    console.log("handleOpenModal called");
    setModalVisible(true);
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
    // console.log("Datos agrupados por dirección:", grouped);
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

    if (!hasLuz) {
      luzRow = luzRow.map((cell, index) => {
        if (index === 0) {
          // Asumiendo que el primer elemento es el lugar para el botón
          return (
            <TouchableOpacity
              style={buttonStyle}
              onPress={handleOpenModal} // Llama a la función handleOpenModal
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
    const puntoLuzData = item.data.find(event => event.punto_luz);

    return (
      <ListItem key={item.address} bottomDivider>
        <ListItem.Content>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              type="material"
              name="location-on"
              size={15}
              color="#cb3234"
            />
            <Text style={styles.fullAddressText}>{item.address}</Text>
          </View>
          {item.data.map((event, index) => (
            <ListItem key={index}>
              {eventHeaders.map((header) => (
                <ListItem.Subtitle key={header.label}>
                  {header.label}: {event[header.value]}
                </ListItem.Subtitle>
              ))}
            </ListItem>
          ))}
         <SupplyPointEnergy punto={puntoLuzData ? puntoLuzData.punto_luz : null} />
        </ListItem.Content>
        <TouchableOpacity onPress={handleOpenModal}>
          {/* <Text>Agregar CUPS</Text> */}
        </TouchableOpacity>
      </ListItem>
    );
  };

  return (
    <FlatList
      data={eventsArray}
      renderItem={renderItem}
      keyExtractor={(item) => item.address}
    />
  );
}

const styles = StyleSheet.create({
  fullAddressText: {
    fontSize: 12,
    fontWeight: "bold",
    width: 650,
  },
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
