import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { api } from "../../utils/api";

interface CustomerPhones {
  id?: number;
  value: string;
  desc: null;
  card_id: number;
  card_name: string;
}

export const PhoneNumber = () => {
  const [phones, setPhones] = useState<CustomerPhones[]>([]);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const response = await api.get("/ficha/");
    console.log("Telefonos!!!", response.data);
    if (response.data && Array.isArray(response.data.phones)) {
      setPhones(response.data.phones);
    } 
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              >
              <Text style={styles.buttonText}>Nuevo numero de Telefono</Text>
            </TouchableOpacity>  
        </View>
      {Array.isArray(phones) &&
        phones.map((phone, index) => <Text key={index}>{phone.value}</Text>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#49559595",
  },
  buttonsContainer: {
    // flexDirection: "column",
    // justifyContent: "space-between",
    // width: 200,
    // marginLeft: 100,
    // marginRight: 100,
    backgroundColor:"#4949",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonStyle:{

  }
});
