import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

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
