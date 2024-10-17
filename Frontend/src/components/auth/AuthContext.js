/**
 * AuthContext.js
 * This file contains the context for managing authentication state across the app.
 * It provides authentication state, user data, login, and logout functionalities.
 */

import React, { createContext, useState, useEffect } from 'react';

/** Create the AuthContext to be used globally in the application */
export const AuthContext = createContext();

/**
 * AuthProvider component manages authentication state, providing the necessary context
 * for all child components to access and update authentication status.
 *
 * @param {ReactNode} children - The components that require access to the authentication state.
 */
export const AuthProvider = ({ children }) => {
  /**
   * State for tracking if the user is authenticated.
   * @type {boolean} isAuthenticated - Represents whether the user is currently logged in.
   */
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * State for storing the logged-in user's information.
   * @type {Object|null} user - Stores information about the authenticated user (e.g., id, name, email).
   */
  const [user, setUser] = useState(null);

  /**
   * useEffect hook to initialize authentication state by checking localStorage for any
   * stored authentication status and user information. This ensures that the user's
   * authentication persists across page reloads.
   */
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');

    /**
     * If user authentication status is found in localStorage, set the authentication state accordingly.
     * The stored user information is parsed from JSON and set to the user state.
     */
    if (storedAuthStatus === 'true') {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /**
   * login function to authenticate the user, update authentication state,
   * and persist authentication information in localStorage.
   *
   * @param {Object} userData - The user's data (typically obtained from the API response after successful login).
   * @property {string} userData.id - The user's unique identifier.
   * @property {string} userData.email - The user's email address.
   * @property {string} userData.name - The user's name.
   */
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);

    /** Persist authentication state and user data in localStorage for session continuity */
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  /**
   * logout function to clear authentication state, user data, and any stored session
   * information from localStorage, effectively logging the user out.
   */
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);

    /** Remove authentication state and user data from localStorage to ensure logout */
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    /**
     * AuthContext.Provider allows child components to access authentication-related state and functions.
     * This makes the "isAuthenticated", "user", "login", and "logout" accessible throughout the component tree.
     */
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
