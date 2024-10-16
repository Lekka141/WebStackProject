import React from 'react';
import { Box, Typography } from '@mui/material';

/** 
 * Header component responsible for rendering the main dashboard heading and subtitle
 * @returns {JSX.Element} - The rendered header section with a title and subtitle
 */
function Header() {
  return (
    <Box sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h4">
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="subtitle1">
        Manage your digital footprint with VaultConnect
      </Typography>
    </Box>
  );
}

export default Header;
