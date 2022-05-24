import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, function (err) {
      if (!err) {
          console.log("User logged in: " + Meteor.user());
          console.log("User logged in: " + Meteor.user().username);
          navigate('/welcome');
      } else{
          // Do something on error...
          console.log("Not logged in, and error occurred:", err);  // Outputs error
      }
    });
  };

  return (
    <form onSubmit={submit} className="login-form">
      <div  className="login-title">
        <h1>Bem vindo ao ToDo List</h1>
      </div>

      <div>
        <TextField
          required
          type="text"
          variant="outlined"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}>
        </TextField>
      </div>

      <div>
        <TextField
          required
          type="password"
          variant="outlined"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}>
        </TextField>
      </div>

      <div>
        <ThemeProvider theme={buttonTheme}>
          <Button
            type="submit"
            variant="contained"
            color="primary">
            Entrar
          </Button>
        </ThemeProvider>
      </div>
    </form>
  );
};