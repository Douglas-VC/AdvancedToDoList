import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
  },
});

export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      return;
    } else if (password !== confirmPassword) {
      console.log("working");
      <Alert severity="error">
        Senhas informadas não são iguais!!
      </Alert>
      return;
    }

    Meteor.call('doesUserExist', username, function(error, result) {
      if (!error) {
        if (!result) {
          Accounts.createUser({
            username: username,
            password: password,
          });
          navigate('/');
        } else {
          <Alert severity="error">
            Usuário já existe!!
          </Alert>
          return;
        }
      } else{
          console.log("Error:", error);
      }
    });
  };

  const handleCancelSignup = () => {
    navigate('/');
  }

  return (
    <div className="new-task-page">
      <div className="new-task-title">
        <h1>
          Criar Nova Conta
        </h1>
      </div>

      <div className="signup-form">
        <div>
          <TextField
            required
            type="text"
            variant="outlined"
            label="Usuário"
            onChange={(e) => setUsername(e.target.value)}>
          </TextField>
        </div>

        <div>
          <TextField
            required
            type="password"
            variant="outlined"
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}>
          </TextField>
        </div>

        <div>
          <TextField
            required
            type="password"
            variant="outlined"
            label="Confirmar Senha"
            onChange={(e) => setConfirmPassword(e.target.value)}>
          </TextField>
        </div>
      </div>

      <div className="new-task-buttons">
        <div className="new-task-button">
          <ThemeProvider theme={buttonTheme}>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleCancelSignup}>
            Cancelar
            </Button>
          </ThemeProvider>
        </div>

        <div className="new-task-button">
          <ThemeProvider theme={buttonTheme}>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}>
            Cadastrar
            </Button>
          </ThemeProvider>
        </div>
      </div>

    </div>
  );
};