import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import { Input, Button, Overlay, Icon } from '@rneui/themed';
import { api } from "../../utils/api";

interface CustomerPhones {
  id?: number;
  value: string;
  desc: string | null;
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
  const [cardId, setCardId] = useState<number | null>(null);
  const [cardName, setCardName] = useState<string | null>(null);
 

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const response = await api.get("/ficha/");
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
    if (newPhone && cardId !== null && cardName !== null) {
      setPhones([
        ...phones,
        {
          id: undefined,
          value: newPhone,
          desc: notePhone,
          card_id: cardId,
          card_name: cardName, 
        },
      ]);
      setNewPhone("");
      setNotePhone("");
      setModalVisible(false);
    } else {
      console.error("Faltan datos para guardar el nuevo número de teléfono.");
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
      <Button
        titleStyle={{
          color: "#000000",
        }}
        title="Nuevo numero de Telefono"
        onPress={() => setModalVisible(true)}
        buttonStyle={styles.buttonAddPhone}
        icon={<Icon name="add" size={25} color="#008000" />}
      />
      <Overlay isVisible={modalVisible}>
        <View style={styles.overlay}>
          <Text style={styles.titleNewPhone}>Nuevo Número de Télefono</Text>
          <Input
            placeholder="Nuevo número de teléfono"
            value={newPhone}
            onChangeText={handleNewPhoneChange}
          />
          <Input
            placeholder="Nota"
            value={notePhone}
            onChangeText={handleNoteChange}
          />
          <View style={styles.buttonEditPhone}>
            <Button
              title="Guardar"
              onPress={() => {
                handleNewPhoneSave();
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Overlay>
      <Overlay isVisible={editModalVisible}>
        <View style={styles.overlay}>
          <Text style={styles.titleEditPhone}>Editar Teléfono</Text>
          <Input
            placeholder="Nuevo número de teléfono"
            value={editPhone}
            onChangeText={handleNewPhoneChange}
          />
          <Input
            placeholder="Nota"
            value={editNote}
            onChangeText={handleNoteChange}
          />
          <View style={styles.buttonEditPhone}>
            <Button
              title="Guardar"
              onPress={() => {
                handleEditPhoneSave();
                setEditModalVisible(false);
              }}
            />
            <Icon
              name="delete"
              size={35}
              color="#FF0000"
              onPress={() => {
                handleDeletePhone(editingPhone?.id);
                setEditModalVisible(false);
              }}
            />
          </View>
        </View>
      </Overlay>
      {Array.isArray(phones) &&
        phones.map((phone, index) => (
          <View style={styles.phoneContainer} key={index}>
            {editingPhone && editingPhone.id === phone.id ? (
              <Input
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
                  <Icon
                    name="edit"
                    size={20}
                    color="#000000"
                    onPress={() => handleEdit(phone.id)}
                  />
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
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: 300,
    height: 200,
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
  buttonAddPhone: {
    backgroundColor: "#FFFFFF",
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
  buttonEditPhone: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 200,
  },
  titleEditPhone: {
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 160,
    width: 120,
    marginTop: -30,
  },
  titleNewPhone: {
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 60,
    width: 220,
    marginTop: -30,
  },
});
