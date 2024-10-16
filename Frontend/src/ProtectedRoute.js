import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './components/auth/AuthContext';

/**
 * ProtectedRoute component ensures that only authenticated users can access certain routes.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.Component} props.children - The component to render if the user is authenticated.
 * @returns {React.Component} - The component that either renders the protected content or redirects to the sign-in page.
 */
const ProtectedRoute = ({ children }) => {
  /* Access the authentication status from the AuthContext */
  const { isAuthenticated } = useContext(AuthContext);

  /* If the user is authenticated, render the children (protected content) */
  if (isAuthenticated) {
    return children;
  }

  /* If the user is not authenticated, redirect them to the sign-in page */
  return <Navigate to="/signin" />;
};

export default ProtectedRoute;
