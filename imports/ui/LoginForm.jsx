import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(null);
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, function (err) {
      if (!err) {
          console.log("User logged in: " + Meteor.user());
          console.log("User logged in: " + Meteor.user().username);
          navigate('/welcome');
      } else{
          console.log(err.reason);
          switch (err.reason) {
            case 'User not found':
              setErrorMessage("Usuário não encontrado");
              setShowErrorMessage(true);
              break;
            case 'Incorrect password':
              setErrorMessage("Senha incorreta");
              setShowErrorMessage(true);
              break;
          }
      }
    });
  };

  const signupPage = () => {
    navigate('/signup');
  }

  return (
    <form onSubmit={submit} className="login-form">
      <Typography
        variant="h4"
        sx = {{ fontSize: "1.8rem", margin: 1, fontWeight: "bold"}}>
        Bem vindo ao ToDo List
      </Typography>

      <Snackbar
        open={showErrorMessage}
        onClose={() => setShowErrorMessage(null)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical:"top", horizontal:"center"}}>
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <TextField
        required
        type="text"
        variant="outlined"
        label="Usuário"
        sx = {{ mt: 2 }}
        onChange={(e) => setUsername(e.target.value.trim())}>
      </TextField>

      <TextField
        required
        type="password"
        variant="outlined"
        label="Senha"
        sx = {{ mt: 2 }}
        onChange={(e) => setPassword(e.target.value)}>
      </TextField>

      <Button
        type="submit"
        variant="contained"
        sx = {{
          mt: 3,
          width: 150 }}
        color="primary">
        Entrar
      </Button>

      <Link
        type="button"
        variant="subtitle1"
        underline="hover"
        sx = {{
          color: "black",
          mt: 1,
          '&:hover': { cursor: 'pointer' }
        }}
        onClick={signupPage}>
        Cadastrar
      </Link>
    </form>
  );
};