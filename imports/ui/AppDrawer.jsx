import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import IconButton from '@mui/material/IconButton';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';

export const AppDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const welcomePage = () => {
    navigate('/welcome');
  }

  const tasksPage = () => {
    navigate('/tasks');
  }

  const userprofilePage = () => {
    navigate('/userprofile');
  }

  return (
    <Box sx={{ mr: "auto" }}>
      <IconButton onClick={handleDrawerOpen} onClose={handleDrawerClose}>
        <MenuSharpIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={openDrawer}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: { width: 200 }
        }}>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={welcomePage}>
              <ListItemIcon>
                <HomeSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={userprofilePage}>
              <ListItemIcon>
                <AccountBoxSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={tasksPage}>
              <ListItemIcon>
                <AssignmentSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Tarefas" />
            </ListItemButton>
          </ListItem>
        </List>

      </Drawer>
    </Box>
  );
};