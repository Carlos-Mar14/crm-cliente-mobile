import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import logo from "../../assets/wide_logo.png";
import { api, saveToken } from "../../utils/api";
import { validateEmail } from "../../utils/helpers";


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
    try {
      const { email, password } = formData;
      const response = await api.post('/token-auth/', { email, password });
      await saveToken(response.data.token);
      navigation.navigate("CalendarScreen");
    } catch (error) {
      // Manejar el error
      if (error.response && error.response.status === 400) {
        Alert.alert("Error", "Credenciales Invalidas");
      } else {
        //Manejo de otros errores
        console.error(error);
      }
    }
  };
  const validateData = () => {
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
      <View style={styles.img}>
        {<Image style={styles.img} source={logo} testID="logotest" />}
      </View>
      <View style={styles.inputContainer}>
        <Input
          containerStyle={styles.input}
          placeholder="Correo Electrónico"
          onChange={(e) => onChange(e, "email")}
          keyboardType="email-address"
          errorMessage={errorEmail}
          defaultValue={formData.email}
        />
        <Input
          containerStyle={styles.input}
          placeholder="Contraseña"
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
          buttonStyle={[styles.btnText]}
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
  img: {
    marginTop: 20,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  btnContainer: {
    backgroundColor: "#c1c1c1",
    marginLeft: 40,
    width: 130,
  },
  inputContainer: {
    marginBottom: 100,
  },
});
