import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { Icon } from "react-native-elements";
import { WebView } from 'react-native-webview';

import { useNavigation } from "@react-navigation/native";
import { validateEmail, isEmpty } from "../../utils/helpers";

export default function LoginForm() {
  // Estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Estado para guardar la data del formulario de RegisterForm
  const [formData, setFormData] = useState(defaultFormValues());

  // Validaciones para cada campo
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  // Constante para usar la importanción de la navegación
  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const doLogin = async () => {
    if (!validateData()) {
      return;
    }

    const { email, password } = formData;

    // **Integración con react-native-webview:**

    // Crear referencia al componente WebView
    const webViewRef = useRef(null);

    // Función para enviar la petición POST
    const sendPostRequest = () => {
      const data = JSON.stringify({ email, password });
      webViewRef.current.injectJavaScript(`
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://crm.gestiongroup.es/api/token-refresh/');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(${data});
      `);
    };

    // Mostrar WebView y enviar la petición
    return (
      <WebView
        ref={webViewRef}
        source={{ uri: "https://www.paginawebdelaempresa.com/login" }}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          // Procesar la respuesta de la petición POST (token de acceso)
          if (data.success) {
            // Almacenar el token de acceso
            // Navegar a la pantalla "account"
            navigation.navigate("account");
          } else {
            // Mostrar mensaje de error
            alert("Usuario o contraseña incorrectos.");
          }
        }}
      />
    );

    // **Fin de la integración con react-native-webview:**
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
      <TextInput
        containerStyle={styles.input}
        placeholder="Ingresa tu email"
        onChange={(e) => onChange(e, "email")}
        keyboardType="email-address"
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <TextInput
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
