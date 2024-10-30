import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);

  const login = (token, userID) => {
    setToken(token);
    setUserID(userID);
  };

  const logout = () => {
    setToken(null);
    setUserID(null);
  };

  return (
    <AuthContext.Provider value={{ token, userID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
