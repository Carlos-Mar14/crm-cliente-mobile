import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Button } from "react-native";
import { Icon } from "react-native-elements";
import { Table, Row, Cell } from "react-native-table-component";
import { api } from "../../utils/api";
import { ComponentSupplyPoint } from "./ComponentSupplyPoint";
import { StyleSheet } from "react-native";
import { SupplyPoint, ApiResponse, SheetData } from "./CustomerCard";

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


export const SupplyPointList = () => {
  const [events, setEvents] = useState<SupplyPoint[]>([]);
  const [fullAddress, setFullAddress] = useState("");
  

  useEffect(() => {
    getItems();
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
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  searchAndButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: 260,
    marginTop: -30,
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
    marginTop: -10,
    width: 650,
  },
  psContainer: {
    marginBottom: 15,
    justifyContent: "space-between",
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
