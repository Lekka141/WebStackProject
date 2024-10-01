import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); /* To store additional user information */

  /* Check localStorage for authentication status on component mount */
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');

    if (storedAuthStatus === 'true') {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser)); /* Parse stored user data if available */
    }
  }, []);

  /* Function to handle login */
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true'); /* Persist auth status */
    localStorage.setItem('user', JSON.stringify(userData)); /* Persist user data */
  };

  /* Function to handle logout */
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
