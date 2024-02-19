// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext({
    isLoggedIn: false, // Set a default value here
    setIsLoggedIn: (newIsLoggedIn: boolean) => {},
  });

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
