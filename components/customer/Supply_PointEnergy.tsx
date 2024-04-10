import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { api } from "../../utils/api";

export default function SupplyPointEnergy({ punto }) {
  const [puntoLuzData, setPuntoLuzData] = useState(null);
  const [puntoGasData, setPuntoGasData] = useState(null);

  useEffect(() => {
    if (!punto || typeof punto !== "object") {
      return;
    }

    if (punto && punto.punto_luz && punto.punto_luz.id) {
      getPuntoLuzData(punto.punto_luz.id);
    }

    if (punto && punto.punto_gas && punto.punto_gas.id) {
      getPuntoGasData(punto.punto_gas.id);
    }
  }, [punto]);

  const getPuntoLuzData = async (id) => {
    try {
      const response = await api.get(`/puntos/`);
      const puntoLuz = response.data.results.find((punto) => punto.id === id);
      setPuntoLuzData(puntoLuz); // Actualizar el estado con los datos obtenidos
    } catch (error) {
      console.error("Error al obtener los datos de punto_luz:", error);
    }
  };

  const getPuntoGasData = async (id) => {
    try {
      const response = await api.get(`/puntos/`);
      const puntoGas = response.data.results.find((punto) => punto.id === id);
      setPuntoGasData(puntoGas); // Actualizar el estado con los datos obtenidos
    } catch (error) {
      console.error("Error al obtener los datos de punto_gas:", error);
    }
  };

  if (!punto || typeof punto !== "object") {
    return (
      <Text>
        No hay datos de punto_luz disponibles para este punto de suministro.
      </Text>
    );
  }

  return (
    <View>
      <View style={styles.listParametersTable}>
        <Text>{punto.cups}</Text>
        <Text>{punto.company}</Text>
        <Text>{punto.tarif}</Text>
        <Text>{punto.consumo}</Text>
        <Text>{punto.p1}</Text>
        <Text>{punto.p2}</Text>
        <Text>{punto.p3}</Text>
        <Text>{punto.p4}</Text>
        <Text>{punto.p5}</Text>
        <Text>{punto.p6}</Text>
        <Text>{punto.status}</Text>
        <Text>{punto.status_text}</Text>
      </View>
      
      {puntoGasData && (
        <View style={styles.listParametersTable}>
          <Text>{punto.cups}</Text>
          <Text>{punto.company}</Text>
          <Text>{punto.tarif}</Text>
          <Text>{punto.consumo}</Text>
          <Text>{punto.p1}</Text>
          <Text>{punto.p2}</Text>
          <Text>{punto.p3}</Text>
          <Text>{punto.p4}</Text>
          <Text>{punto.p5}</Text>
          <Text>{punto.p6}</Text>
          <Text>{punto.status}</Text>
          <Text>{punto.status_text}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listParametersTable: {
    flexDirection: "row",
    marginBottom: 10, // Añade un margen para separar las filas
  },
});
