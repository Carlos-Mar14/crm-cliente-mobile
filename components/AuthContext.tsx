import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { api, getToken, refreshToken, removeToken, saveToken } from '../utils/api';


interface LoginData {
  email: string;
  password: string;
}

const AuthContext = createContext({
  isLoggedIn: false,
  loading: true,
  login: (data: LoginData) => { },
  logout: () => { },
});

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (loginData: LoginData) => {
    setLoading(true)
    try {
      const response = await api.post('/token-auth/', loginData);
      await saveToken(response.data.token);
      navigation.navigate("Calendar");
    } catch (error) {
      Alert.alert("Error", error?.response?.data || error);
    } finally {
      setLoading(false)
    }
  };

  const logout = async () => {
    await removeToken();
    setIsLoggedIn(false);
  };

  const checkAuth = async () => {
    setLoading(true)
    const token = await getToken();
    if (token) {
      try {
        await refreshToken(token);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false)
        await removeToken()
      } finally {
        setLoading(false)
      }
    } else {
      setIsLoggedIn(false);
      setLoading(false)
    }
  };

  return (
    <AuthContext.Provider value={{ loading, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};


