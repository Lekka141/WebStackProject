import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/API'; /* Assuming an API utility for backend interaction */

/**
 * SignUp component handles user registration functionality
 */
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  /**
   * Handles the registration submission and validation
   * Calls the backend API to register the user
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /* Call the backend API for sign up */
      const response = await API.post('/signup', { name, email, password });

      if (response.data.success) {
        /* Navigate to the sign-in page upon successful registration */
        history.push('/signin');
      } else {
        /* Display error message */
        setError(response.data.message);
      }
    } catch (err) {
      /* Handle network or unexpected errors */
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
