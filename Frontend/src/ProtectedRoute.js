import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './auth/AuthContext';

/**
 * ProtectedRoute component ensures that only authenticated users can access certain routes.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.Component} props.component - The component to render if the user is authenticated.
 * @param {...object} rest - Any other properties passed to the route.
 * @returns {React.Component} - The route that either renders the component or redirects to the sign-in page.
 */
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => 
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
