import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Icon, Input } from '@rneui/themed';
import logo from "../../assets/wide_logo.png";
import { validateEmail } from "../../utils/helpers";
import { useAuth } from "../AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const { loading, login } = useAuth();

  const onLogin = async () => {
    setErrorEmail("");
    setErrorPassword("");

    if (!validateEmail(email)) {
      setErrorEmail("Debes de ingresar un email válido.");
      return;
    }

    if (isEmpty(password)) {
      setErrorPassword("Debes de ingresar tu contraseña.");
      return;
    }
    await login({ email, password });
  };

  return (
    <View style={styles.container}>
      <View style={styles.img}>
        {<Image style={styles.img} source={logo} testID="logotest" />}
      </View>
      <View style={styles.inputContainer}>
        <Input
          containerStyle={styles.input}
          placeholder="Correo Electrónico"
          onChangeText={(value) => setEmail(value)}
          keyboardType="email-address"
          errorMessage={errorEmail}
        />
        <Input
          containerStyle={styles.input}
          placeholder="Contraseña"
          password={true}
          secureTextEntry={!showPassword}
          onChangeText={(value) => setPassword(value)}
          errorMessage={errorPassword}
          rightIcon={
            <Icon
              type="material-community"
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              IconStyle={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <Button
          title="Iniciar Sesión"
          loading={loading}
          containerStyle={styles.btnContainer}
          buttonStyle={[styles.btnText]}
          onPress={onLogin}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  img: {
    alignSelf: "center",
    margin: "auto",
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  btnContainer: {
    backgroundColor: "#c1c1c1",
  },
  inputContainer: {
    marginBottom: 100,
  },
});
