import { AxiosError } from 'axios'
import { useState } from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper'
import logo from '../../assets/wide_logo.png'
import { validateEmail } from '../../utils/helpers'
import { useAuth } from '../AuthContext'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const { loading, login } = useAuth()

  const onLogin = async () => {
    setErrorEmail('')
    setErrorPassword('')

    if (!validateEmail(email)) {
      setErrorEmail('Debes de ingresar un email válido.')
      return
    }

    if (!password.length) {
      setErrorPassword('Debes de ingresar tu contraseña.')
      return
    }
    try {
      await login({ email, password })
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.alert('Error', 'Login o contraseña incorrectos')
      } else {
        console.error(e)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={logo} testID="logotest" />

      <TextInput
        style={styles.containerItem}
        label="Correo Electrónico"
        onChangeText={(value) => setEmail(value.toLowerCase())}
        keyboardType="email-address"
        error={!!errorEmail}
      />
      <HelperText type="error" visible={!!errorEmail}>
        {errorEmail}
      </HelperText>

      <TextInput
        style={styles.containerItem}
        label="Contraseña"
        secureTextEntry={!showPassword}
        error={!!errorPassword}
        right={
          <TextInput.Icon
            onPress={() => setShowPassword(!showPassword)}
            icon={showPassword ? 'eye-off' : 'eye'}
          />
        }
        onChangeText={(value) => setPassword(value)}
      />
      <HelperText type="error" visible={!!errorPassword}>
        {errorPassword}
      </HelperText>

      <Button
        style={styles.containerItem}
        icon="login"
        mode="contained"
        loading={loading}
        onPress={onLogin}>
        Iniciar Sesión
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 500,
    gap: 2,
  },
  containerItem: {
    marginBottom: 10,
  },
  img: {
    alignSelf: 'center',
    margin: 'auto',
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
})
