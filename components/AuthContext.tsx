import React, { createContext, useEffect, useState } from 'react';
import { getToken, refreshToken, removeToken } from '../utils/api';


const AuthContext = createContext({
  isLoggedIn: false,
  loading: false,
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const checkAuth = async () => {
    setLoading(true)
    const token = await getToken();
    if (token) {
      try {
        await refreshToken();
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

  useEffect(() => {
    checkAuth();
  }, []);
  

  const logout = async () => {
    await removeToken();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
