import React, { createContext, useEffect, useState } from 'react';
import { getToken, removeToken } from '../utils/token';


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
      const token = await getToken()
      setIsLoggedIn(!!token);
      setToken(token)
    };
    loadLoginStatus();
  }, []);
  

  const cerrarSesion = async () => {
    await removeToken();
    setIsLoggedIn(false);
    setToken('');
    // (Opcional) gestionar la navegación u otras acciones al cerrar la sesión
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, cerrarSesion, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
