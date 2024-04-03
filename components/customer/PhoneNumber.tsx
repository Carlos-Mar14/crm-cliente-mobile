import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { api } from "../../utils/api";
import { Icon } from "react-native-elements";

interface CustomerPhones {
  id?: number;
  value: string;
  desc: string | null; // Ajustado aquí para permitir string o null
  card_id: number;
  card_name: string;
}

export const PhoneNumber = () => {
  const [phones, setPhones] = useState<CustomerPhones[]>([]);
  const [editingPhone, setEditingPhone] = useState<CustomerPhones | null>(null);
  const [newPhone, setNewPhone] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [notePhone, setNotePhone] = useState<string>("");
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState<string>("");
  const [editNote, setEditNote] = useState<string>("");

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const response = await api.get("/ficha/");
    //console.log("Telefonos!!!", response.data);
    if (response.data && Array.isArray(response.data.phones)) {
      setPhones(response.data.phones);
    }
  }

  const handleEdit = (phoneId: number) => {
    const phoneToEdit = phones.find((phone) => phone.id === phoneId);
    if (phoneToEdit) {
      setEditingPhone(phoneToEdit);
      setEditPhone(phoneToEdit.value);
      setEditNote(phoneToEdit.desc || "");
      setEditModalVisible(true);
    } else {
      console.error(
        "No se encontró el número de teléfono para editar con el ID:",
        phoneId
      );
    }
  };

  const handleSave = (newValue: string) => {
    if (editingPhone) {
      const updatedPhones = phones.map((phone) => {
        if (phone.id === editingPhone.id) {
          return { ...phone, value: newValue };
        }
        return phone;
      });
      setPhones(updatedPhones);
      setEditingPhone(null);
    }
  };

  const handleNewPhoneChange = (text: string) => {
    setNewPhone(text);
  };
  const handleNoteChange = (text: string) => {
    setNotePhone(text);
  };

  //Modificar para que card_id y  card_name sean los valores que vengan desde el json o el api
  const handleNewPhoneSave = () => {
    if (newPhone) {
      setPhones([
        ...phones,
        {
          id: undefined,
          value: newPhone,
          desc: notePhone,
          card_id: 3113611,
          card_name: "LEE CHOONG HYOUNG",
        },
      ]);
      setNewPhone("");
      setNotePhone("");
      setModalVisible(false);
    }
  };

  const handleEditPhoneSave = () => {
    if (editingPhone) {
      const updatedPhones = phones.map((phone) => {
        if (phone.id === editingPhone.id) {
          return { ...phone, value: editPhone, desc: editNote };
        }
        return phone;
      });
      setPhones(updatedPhones);
      setEditingPhone(null);
      setEditModalVisible(false);
    }
  };
  const handleDeletePhone = (phoneId: number) => {
    Alert.alert(
      "Confirmación",
      "¿Seguro? Tienes que confirmar tu acción",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const updatedPhones = phones.filter(
              (phone) => phone.id !== phoneId
            );
            setPhones(updatedPhones);
            setEditModalVisible(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Nuevo numero de Telefono</Text>
          <Icon name="add" size={25} color="#008000" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalTextNewTel}>
                  Ingresa nuevo número de teléfono
                </Text>
                <Icon name="close" size={25} color="#FF0000" />
              </TouchableOpacity>
              <View style={styles.titleModalText}>
                <Text style={{ fontWeight: "bold" }}>Numero de teléfono</Text>
                <TextInput
                  style={styles.modalInput}
                  value={newPhone}
                  onChangeText={handleNewPhoneChange}
                  placeholder="Nuevo número de teléfono"
                />
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>Nota</Text>
                <TextInput
                  style={styles.modalInput}
                  value={notePhone}
                  onChangeText={handleNoteChange}
                  placeholder="Nota"
                />
              </View>
            </View>
            <View style={styles.modalButtonsSave}>
              <Button title="Guardar" onPress={handleNewPhoneSave} />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!editModalVisible);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalTextEditTel}>
                  Editar número de teléfono
                </Text>
                <Icon name="close" size={25} color="#FF0000" />
              </TouchableOpacity>
              <View style={styles.titleModalText}>
                <Text style={{ fontWeight: "bold" }}>Numero de teléfono</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editPhone}
                  onChangeText={handleNewPhoneChange}
                  placeholder="Nuevo número de teléfono"
                />
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>Nota</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editNote}
                  onChangeText={handleNoteChange}
                  placeholder="Nota"
                />
              </View>
            </View>
            <View style={styles.modalButtons}>
              <Button title="Guardar" onPress={handleEditPhoneSave} />
              <TouchableOpacity
                onPress={() => handleDeletePhone(editingPhone?.id)}
              >
                <Icon name="delete" size={35} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {Array.isArray(phones) &&
        phones.map((phone, index) => (
          <View style={styles.phoneContainer} key={index}>
            {editingPhone && editingPhone.id === phone.id ? (
              <TextInput
                style={styles.phoneText}
                value={phone.value}
                onChangeText={(text) => handleSave(text)}
                onBlur={() => setEditingPhone(null)}
              />
            ) : (
              <>
                <View style={styles.phoneAndNoteContainer}>
                  <Text numberOfLines={1} style={styles.noteText}>
                    {phone.desc}
                  </Text>
                  <Text style={styles.phoneText}>{phone.value}</Text>
                  <TouchableOpacity onPress={() => handleEdit(phone.id)}>
                    <Icon name="edit" size={20} color="#000000" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  buttonsContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 3,
    width: 250,
  },
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
  modalTextNewTel: {
    textAlign: "center",
    fontWeight: "bold",
    // borderWidth: 1,
    marginRight: 55,
    marginBottom: 10,
  },
  modalTextEditTel: {
    textAlign: "center",
    fontWeight: "bold",
    // borderWidth: 1,
    marginRight: 105,
  },
  titleModalText: {
    marginBottom: -20,
  },
  modalInput: {
    marginBottom: 25,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 10,
    // marginTop: 20,
    flexDirection: "row",
    // marginBottom: 35,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 200,
    marginTop: -45,
  },
  modalButtonsSave: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 230,
    marginTop: -45,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: -15,
  },
  buttonStyle: {
    flexDirection: "row",
    marginLeft: 30,
  },
  phoneContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 5,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 3,
    height: 30,
    width: 145,
    flexDirection: "row",
    marginLeft: 70,
  },
  phoneText: {
    marginEnd: 10,
  },
  phoneAndNoteContainer: {
    flexDirection: "row",
    marginRight: 15,
  },
  noteText: {
    marginRight: 40,
    fontSize: 14,
    width: 50,
    height: 20,
    textAlign: "center",
    color: "#000",
  },
});
