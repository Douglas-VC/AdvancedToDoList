import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: grey[500],
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
    <div className="app-bar">
      <div className="app-header">
        <h1>
          📝️ Welcome
        </h1>
      </div>
      <div className="user-logout" onClick={userLogout}>
          Logout 🚪
      </div>
      <div className="welcome-button">
        <ThemeProvider theme={buttonTheme}>
          <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={tasksPage}>
          Visualizar tarefas
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};