import { useState } from "react";
import { CustomerCard } from "./CustomerCard";
import { Button, Modal, TouchableOpacity, View } from "react-native";
import { Icon } from '@rneui/themed';

export const ModalCustomerCard = ({ isModalVisible, onClose }) => {
  return (
    <View style={{ flex: 1 }}>
      <Modal visible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={onClose}
            style={{ alignSelf: "flex-end", marginRight: 10 }}
          >
            <Icon name="close" size={30} color="#000000" />
          </TouchableOpacity>
          <CustomerCard />
        </View>
      </Modal>
    </View>
  );
};
