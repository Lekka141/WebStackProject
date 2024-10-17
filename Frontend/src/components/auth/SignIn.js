import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { AuthContext } from './AuthContext';
import API from '../../utils/API'; /* Assuming an API utility for backend interaction */
import { useNavigate } from 'react-router-dom';

/**
 * SignIn component handles user login functionality.
 * It provides input fields for the user to enter their email and password, and submits these credentials
 * to authenticate the user through an API request. On successful login, the user is navigated to the dashboard.
 */
function SignIn() {
  /** State variables for storing user input */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  /** Access the login function from the AuthContext */
  const { login } = useContext(AuthContext);
  const history = useNavigate();

  /**
   * Handles the login form submission.
   * Calls the backend API to authenticate the user, and updates the authentication state on success.
   *
   * @param {Object} e - The event object representing the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /** Call the backend API for login with the user's email and password */
      const response = await API.post('/login', { email, password });

      if (response.data.success) {
        /**
         * If login is successful, update the authentication state using the login method
         * from the AuthContext, and navigate the user to the dashboard page.
         */
        login({ id: response.data.user.id, email: response.data.user.email });
        history('/dashboard');
      } else {
        /** Set an error message if login was not successful */
        setError(response.data.message);
      }
    } catch (err) {
      /** Handle unexpected errors or network issues */
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/** Email input field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/** Password input field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/** Display error message if login fails */}
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          {/** Submit button for login */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
