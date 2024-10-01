import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { AuthContext } from './AuthContext';
import API from '../../utils/API'; /* Assuming an API utility for backend interaction */
import { useHistory } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); /* Use the login function from AuthContext */
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /* Call the backend API for login */
      const response = await API.post('/login', { email, password });

      if (response.data.success) {
        /* Set authentication state and redirect to the dashboard */
        login({ id: response.data.user.id, email: response.data.user.email }); /* Use the login method */
        history.push('/dashboard'); /* Redirect to the dashboard */
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
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
