import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function AppNavbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          VaultConnect Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppNavbar;
