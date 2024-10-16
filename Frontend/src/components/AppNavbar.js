import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

/** 
 * AppNavbar component responsible for rendering the top navigation bar
 * @returns {JSX.Element} - The rendered navigation bar
 */
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
