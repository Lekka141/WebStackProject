import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

/** 
 * SideMenu component responsible for rendering a permanent side navigation menu
 * @returns {JSX.Element} - The rendered side menu with navigation options
 */
function SideMenu() {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Files" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideMenu;
