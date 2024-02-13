import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";

import LoginForm from "../components/account/LoginForm"
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigations/StackNavigation";

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
    return (
    <View style={styles.input}>
        <Text><LoginForm/></Text>
        <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
        <Text>Ir a Calendar</Text>
      </TouchableOpacity>
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