import { StyleSheet, Text, View } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigations/StackNavigation";

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
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