import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/helpers";
import { API_URL } from "../../utils/accions";

export default function LoginForm() {
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

    const handleEmailChange = (text) => {
      setEmail(text);
    };

    const handlePasswordChange = (text) => {
      setPassword(text);
    };

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
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          style={styles.image}
          source={{ uri: "https://crm.gestiongroup.es/img/logo.svg" }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          containerStyle={styles.input}
          //value={email}
          //onChangeText={handleEmailChange}
          placeholder="Correo Electrónico"
          onChange={(e) => onChange(e, "email")}
          keyboardType="email-address"
          errorMessage={errorEmail}
          defaultValue={formData.email}
        />
        <Input
          containerStyle={styles.input}
          placeholder="Contraseña"
          //value={password}
          //onChangeText={handlePasswordChange}
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
      </View>
    </View>
  );
}

//Objetos para almacenar los datos del formulario
const defaultFormValues = () => {
  return { email: "", password: "" };
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
  },
  image: {
    width: 350,
    height: 350,
    marginTop: 50,
  },
  btn: {
    backgroundColor: "#c1c1c1",
    marginLeft: 100,
    width: 130,
  },
  inputContainer: {
    marginBottom: 100,
  },
});
