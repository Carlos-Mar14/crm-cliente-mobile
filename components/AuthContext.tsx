import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (newIsLoggedIn) => {},
  cerrarSesion: () => {},
  // Opcional: si se necesita acceder al token en otros componentes
  token: '',
});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  // Cargar el estado de inicio de sesión al iniciar la aplicación
  useEffect(() => {
    const loadLoginStatus = async () => {
      const savedLoginStatus = await SecureStore.getItemAsync('isLoggedIn');
      const savedToken = await recuperarToken();
      setIsLoggedIn(savedLoginStatus === 'true' && savedToken !== null);
      setToken(savedToken);
    };
    loadLoginStatus();
  }, []);
  

  // Guardar el estado de inicio de sesión cada vez que cambie
  useEffect(() => {
    SecureStore.setItemAsync('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  const cerrarSesion = async () => {
    await eliminarToken();
    setIsLoggedIn(false);
    setToken('');
    // (Opcional) gestionar la navegación u otras acciones al cerrar la sesión
  };

  const recuperarToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      return token;
    } catch (error) {
      console.error('Error al recuperar el token:', error);
      return null;
    }
  };

  const eliminarToken = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
    } catch (error) {
      console.error('Error al eliminar el token:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, cerrarSesion, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
