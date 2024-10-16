/**
 * AuthContext.js
 * This file contains the context for managing authentication state across the app.
 * It provides authentication state, user data, login, and logout functionalities.
 */

import React, { createContext, useState, useEffect } from 'react';

/** Create the AuthContext to be used globally in the application */
export const AuthContext = createContext();

/** AuthProvider component to manage authentication state */
export const AuthProvider = ({ children }) => {
  /** State for tracking if the user is authenticated */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  /** State for storing the logged-in user's information */
  const [user, setUser] = useState(null);

  /** 
   * useEffect hook to check localStorage for any stored authentication status and user information 
   * This will persist user authentication across page reloads.
   */
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');

    /** If user authentication exists in localStorage, set the authenticated state */
    if (storedAuthStatus === 'true') {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));  /** Parse the stored user JSON string */
    }
  }, []);

  /** 
   * login function to authenticate the user and store authentication state in localStorage 
   * @param {Object} userData - The user's data (typically from API response)
   */
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    
    /** Persist authentication state and user data in localStorage */
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  /**
   * logout function to clear authentication state and remove user data from localStorage 
   */
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    
    /** Remove authentication state and user data from localStorage */
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    /** Provide the authentication state and methods (login, logout) to child components */
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
