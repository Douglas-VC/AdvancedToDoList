import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
  },
});

export const Tasks = () => {
  const navigate = useNavigate();
  const welcomePage = () => {
    navigate('/welcome');
  }

  return (
    <div className="app-bar">
      <div className="app-header">
        <h1>
          📝️ Tasks
        </h1>
      </div>
      <div className="tasks-button">
        <ThemeProvider theme={buttonTheme}>
          <Button 
          type="submit"
          variant="contained"
          color="primary"
          onClick={welcomePage}>
          Voltar
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};