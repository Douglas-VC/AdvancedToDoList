import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { buttonTheme } from './Welcome';

export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setErrorMessage("Preencha todos os campos requeridos");
      setShowErrorMessage(true);
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("Senhas não são iguais");
      setShowErrorMessage(true);
      return;
    }

    Meteor.call('doesUserExist', username, function(error, result) {
      if (!error) {
        if (!result) {
          Accounts.createUser({
            username: username,
            password: password,
          });

          Meteor.call('findIdByUsername', username, function(error, result) {
            if (!error) {
              Meteor.call('profiles.insert', {
                userId: result
              });
              navigate('/');
            } else {
              console.log("Error:", error);
            }
          });
        } else {
          setErrorMessage("Usuário já existe");
          setShowErrorMessage(true);
          return;
        }
      } else {
        console.log("Error:", error);
      }
    });
  };

  const handleCancelSignup = () => {
    navigate('/');
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
        sx = {{ fontSize: "1.6rem", mt: 8, mb: 4, fontWeight: "bold"}}>
        Criar Nova Conta
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
        variant="outlined"
        label="Usuário"
        onChange={(e) => setUsername(e.target.value)}
        style = {{ marginBottom: '15px', marginTop: "100px" }}>
      </TextField>

      <TextField
        required
        variant="outlined"
        type="password"
        label="Senha"
        onChange={(e) => setPassword(e.target.value)}
        style = {{marginBottom: '15px'}}>
      </TextField>

      <TextField
        required
        variant="outlined"
        type="password"
        label="Confirmar Senha"
        onChange={(e) => setConfirmPassword(e.target.value)}
        style = {{marginBottom: '15px'}}>
      </TextField>

      <Box
        sx={{
          display: "flex",
          position: "absolute",
          bottom: 40,
          justifyContent: "space-around"
        }}>

        <ThemeProvider theme={buttonTheme}>
          <Button
            type="button"
            variant="contained"
            sx = {{
              fontWeight: "bold",
              fontSize: "large",
              mr: 8,
              ml: 8
            }}
            color="primary"
            onClick={handleCancelSignup}>
            Cancelar
          </Button>
        </ThemeProvider>

        <ThemeProvider theme={buttonTheme}>
          <Button
            type="button"
            variant="contained"
            sx = {{
              fontWeight: "bold",
              fontSize: "large",
              mr: 8,
              ml: 8
            }}
            color="primary"
            onClick={handleSubmit}>
            Criar Conta
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
};