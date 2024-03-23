import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";

export const ComponentSupplyPoint = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSave = () => {
    // Aquí va la lógica para guardar el CUPS
    console.log("Guardar CUPS:");
    closeModal();
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <Icon name="add" size={20} color="#FFF" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitleText}>Nuevo P.S.</Text>
            <Text style={styles.modalText}>CUPS Luz</Text>
            <TextInput style={styles.modalInput} placeholder="CUPS Luzz" />
            <Text style={styles.modalText}>CUPS Gas</Text>
            <TextInput style={styles.modalInput} placeholder="CUPS Gas" />
            <Text style={styles.modalText}>Localidad</Text>
            <TextInput style={styles.modalInput} placeholder="Localidad" />
            <Text style={styles.modalText}>Dirección</Text>
            <TextInput style={styles.modalInput} placeholder="Dirección" />
            <Text style={styles.modalText}>Código Postal</Text>
            <TextInput style={styles.modalInput} placeholder="Código Postal" />
            <View style={styles.modalButtons}>
              <Button title="Crear" onPress={handleSave} />
              <Button title="Cancelar" onPress={closeModal} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  modalTitleText: {
    marginRight: 270,
    fontWeight: "bold",
  },
  modalText: {
    // marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalInput: {
    width: 350,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontWeight: "bold",
  },
  modalButtons: {
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
});
