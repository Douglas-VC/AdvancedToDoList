import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { grey } from '@mui/material/colors';

export const buttonTheme = createTheme({
  palette: {
    primary: {
      main: grey[400],
    },
  },
});

export const Welcome = () => {
  const navigate = useNavigate();
  const logout = () => Meteor.logout();

  const userLogout = () => {
    console.log("logging out");
    logout();
    while(Meteor.loggingOut === true) {}
    navigate('/');
  }

  const tasksPage = () => {
    navigate('/tasks');
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>

      <Typography
        variant="h4"
        sx = {{ fontSize: "1.6rem", mt: 8, fontWeight: "bold"}}>
        Olá {Meteor.user().username}, bem vindo ao Advanced ToDo List
      </Typography>

      <Link
        type="button"
        variant="subtitle1"
        underline="none"
        sx = {{
          color: "black",
          fontWeight: "bold",
          mt: 1,
          '&:hover': { cursor: 'pointer' },
          display: "flex",
          alignSelf: "flex-end",
          mr: 1,
          mt: 2
        }}
        onClick={userLogout}>
        Logout ({Meteor.user().username}) 🚪
      </Link>

      <ThemeProvider theme={buttonTheme}>
        <Button
          type="button"
          variant="contained"
          sx = {{
            mt: 4,
            mb: 1,
            width: 150,
            height: 150,
            fontWeight: "bold",
            fontSize: "large"
          }}
          color="primary"
          onClick={tasksPage}>
          Visualizar tarefas
        </Button>
      </ThemeProvider>
    </Box>
  );
};