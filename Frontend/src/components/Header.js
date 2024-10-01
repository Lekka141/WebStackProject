import React from 'react';
import { Box, Typography } from '@mui/material';

function Header() {
  return (
    <Box sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h4">Welcome to Your Dashboard</Typography>
      <Typography variant="subtitle1">Manage your digital footprint with VaultConnect</Typography>
    </Box>
  );
}

export default Header;
