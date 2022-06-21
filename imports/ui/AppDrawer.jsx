import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ProfilesCollection } from '/imports/db/ProfilesCollection';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';

export const AppDrawer = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  const subscriptionHandler = useTracker(() => Meteor.subscribe('profiles'));
  const profile = useTracker(() => ProfilesCollection.findOne({ userIdNumber: Meteor.userId() }));

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
    <Box sx={{ mr: "auto", mt: 2, ml: 2 }}>
      <IconButton onClick={handleDrawerOpen} onClose={handleDrawerClose}>
        <MenuSharpIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={openDrawer}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: { width: 300 }
        }}>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            mb: 2
          }}>
          {subscriptionHandler.ready() ?
            <>
              <Avatar
                src={profile.photo}
                sx={{
                  width: "100px",
                  height: "100px",
                }}>
              </Avatar>
              <Typography
                variant="h4"
                sx = {{ fontSize: "1rem", mt: 2}}>
                {profile.name}
              </Typography>
              <Typography
                variant="h4"
                sx = {{ fontSize: "0.8rem", mt: 0.5}}>
                {profile.email}
              </Typography>
            </> : <></>
          }
        </Box>

        <Divider />

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

          <ListItem disablePadding>
            <ListItemButton
              onClick={userprofilePage}>
              <ListItemIcon>
                <AccountBoxSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItemButton>
          </ListItem>

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