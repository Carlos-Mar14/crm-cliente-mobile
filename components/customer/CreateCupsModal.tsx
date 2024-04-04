import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";

export default function CreateCupsModal({ visible, onClose }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cups, setCups] = useState("");
  const [tarifa, setTarifa] = useState("");

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalTextNewCupsLuz}>Ingresa CUPS LUZ</Text>
                <Icon name="close" size={25} color="#FF0000" />
              </TouchableOpacity>
              <View style={styles.titleModalText}>
                <Text style={{ fontWeight: "bold" }}>CUPS</Text>
                <TextInput
                  style={styles.modalInput}
                  value={cups}
                  onChangeText={setCups}
                  placeholder="CUPS"
                />
              </View>
              <View style={styles.modalInputTariff}>
                <Text style={{ fontWeight: "bold", marginTop: -38 }}>
                  Tarifa
                </Text>
                <Picker
                  selectedValue={tarifa}
                  style={styles.modalInput}
                  onValueChange={(itemValue) => setTarifa(itemValue)}
                >
                  <Picker.Item label="2.0TD" value="2.0TD" />
                  <Picker.Item label="3.0TD" value="3.0TD" />
                  <Picker.Item label="6.1TD" value="6.1TD" />
                </Picker>
              </View>
            </View>
            <View style={styles.modalButtonsSave}>
              <Button
                title="Guardar"
                onPress={() => {
                  // Aquí puedes manejar la lógica para guardar los datos
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: "center",
    fontWeight: "bold",
    // borderWidth: 1,
    marginRight: 35,
    marginTop: 20,
  },
  modalTextNewCupsLuz: {
    textAlign: "center",
    fontWeight: "bold",
    // borderWidth: 1,
    marginRight: 55,
    marginBottom: 10,
  },
  titleModalText: {
    marginBottom: -20,
  },
  modalInput: {
    marginBottom: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
  },
  modalInputTariff: {
    // marginBottom: 25,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
    height: 50,
  },
  modalButtonsSave: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 230,
    marginTop: -45,
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 10,
    // marginTop: 20,
    flexDirection: "row",
    // marginBottom: 35,
  },
});
