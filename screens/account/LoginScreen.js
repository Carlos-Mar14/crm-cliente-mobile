import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import LoginForm from "../../components/account/LoginForm";

export default function LoginScreen() {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <LoginForm />
      </View>
      <Divider style={styles.divider} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    marginHorizontal: 50,
  },
  
});
