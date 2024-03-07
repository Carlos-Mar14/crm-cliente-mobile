import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RightButton {
    title: string;
    style: any; // todo: replace any with smth meaningful
    onPress: () => void;
}

interface ToolbarProps {
    title: string;
    rightButtons?: RightButton[];
}

const Toolbar = ({ title, rightButtons }: ToolbarProps) => {
    return (
        <View style={styles.toolbar}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.buttonContainer}>

                {rightButtons?.map((button) => (
                    <Text
                        key={button.title}
                        style={[styles.button, button.style]}
                        onPress={button.onPress}
                    >
                        {button.title}
                    </Text>
                ))}

            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        elevation: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        padding: 5,
        marginLeft: 10,
    },
    buttonText: {
        fontSize: 16,
    },
});

export default Toolbar;
