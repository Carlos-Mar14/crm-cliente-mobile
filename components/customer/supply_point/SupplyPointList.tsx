import { IconButton, TextInput } from 'react-native-paper';

import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { api } from "../../../utils/api";
import { SupplyPointDetails } from './SupplyPointDetails';
import { ApiResponse, SupplyPoint } from './types';

type SupplyPointState = SupplyPoint[];

export const SupplyPointList = ({ customerId }: { customerId: number }) => {
  const [points, setPoints] = useState<SupplyPointState>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    setLoading(true);
    const response = await api.get<ApiResponse>("/puntos/");
    setPoints(response.data.results);
    setLoading(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>
          Puntos de Suministros
        </Text>

        <TextInput
          style={styles.searchInput}
          label='Buscar'
          dense={true}
          right={<TextInput.Icon icon="magnify" />}
        >
        </TextInput>

        <IconButton
          icon="plus"
          iconColor='green'
          onPress={() => console.log("Agregar CUPS")}
        />

        <IconButton
          icon="refresh"
          iconColor='green'
          loading={loading}
          onPress={getItems}
        />
      </View>

      <ScrollView style={{ flex: 1 }}>
        {points.map((point) => (
          <SupplyPointDetails key={point.id} point={point} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginTop: 5,
    height: 70,
  },
  toolbarTitle: {
    fontWeight: "bold",
    flexGrow: 2,
  },
  toolbarButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  searchInput: {
    flexGrow: 1,
  }
});
