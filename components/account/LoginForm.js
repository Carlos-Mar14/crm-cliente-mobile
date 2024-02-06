import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/helpers";

export default function LoginForm() {
  const API_URL = "https://crm.gestiongroup.es/api/token-auth/";

  //Estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  //Estado para guardar la data del formulario de RegisterForm
  const [formData, setFormData] = useState(defaultFormValues());

  //Validaciones para cada campo
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  //Constante para usar la importanción de la navegación
  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const doLogin = async () => {
    if (!validateData()) {
      return;
    }

    try {
      const { email, password } = formData;
      const response = await axios.post(API_URL, { email, password });

      // Navegar a la siguiente pantalla
      //navigation.navigate("account");
    } catch (error) {
      // Manejar el error
      console.error(error);
      // Mostrar un mensaje de error al usuario
      // ...
    }
  };
  const validateData = () => {
    setErrorEmail("");
    setErrorPassword("");
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes de ingresar un email válido.");
      isValid = false;
    }

    if (isEmpty(formData.password)) {
      setErrorPassword("Debes de ingresar tu contraseña.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.input}>
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu email"
        onChange={(e) => onChange(e, "email")}
        keyboardType="email-address"
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu contraseña"
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errorPassword}
        defaultValue={formData.password}
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
        containerStyle={styles.btnContainer}
        buttonStyle={[styles.btn, styles.btnText]}
        onPress={() => doLogin()}
      />
      {/* <Loading isVisible={loading} text="Iniciando Sesión..." /> */}
    </View>
  );
}

//Objetos para almacenar los datos del formulario
const defaultFormValues = () => {
  return { email: "", password: "" };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  input: {
    width: "100%",
  },
  btnContainer: {
    marginTop: 20,
    width: "85%",
  },
  btn: {
    backgroundColor: "#c1c1c1",
    marginLeft: 57,
    width: "60%",
  },
  //   icon: {
  //     color: "#c1c1c1",
  //   },
  btnText: {
    color: "#000000",
  },
});
