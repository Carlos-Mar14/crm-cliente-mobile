import { StyleSheet, Text, View } from "react-native";



export const HomeScreen = () => {
    return (
        <View style={styles.input}>
            <Text>HOME</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

})