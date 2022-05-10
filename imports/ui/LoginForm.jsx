import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

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

    // Meteor.loginWithPassword(username, password);
    Meteor.loginWithPassword(username, password, function (err) {
      if (!err) {
          console.log("User logged in: " + Meteor.user());
          console.log("User logged in: " + Meteor.user().username);
      } else{
          // Do something on error....
          console.log("Not logged in, and error occurred:", err);  // Outputs error
      }
    });
    console.log(Meteor.user());

    while(Meteor.loggingIn === true) {}
    navigate('/welcome');
   
  };

  return (
      <form onSubmit={submit} className="login-form">
        <div  className="app-title">
          <h1>Bem vindo ao ToDo List</h1>
        </div>

        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
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