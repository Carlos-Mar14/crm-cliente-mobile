import { useState } from "react";
import { CustomerCard } from "./CustomerCard";
import { Button, Modal, View } from "react-native";

export const ModalCustomerCard = ({ isModalVisible, onClose }) => {
    return (
        <View style={{ flex: 1 }}>
            <Button title="Show modal" onPress={onClose} />
            <Modal visible={isModalVisible}>
                <View style={{ flex: 1 }}>
                    <Button title="Cerrar modal" onPress={onClose} />
                    <CustomerCard />
                </View>
        </Modal>
    </View>
    );
};
