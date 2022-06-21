import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
        height: "100vh",
        alignItems: "center"
      }}>

      <Typography
        variant="h4"
        sx = {{ mt: 8 }}>
        Criar Nova Conta
      </Typography>

      <Snackbar
        open={showErrorMessage}
        onClose={() => setShowErrorMessage(null)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical:"top", horizontal:"center"}}>
        <Alert
          severity="error"
          variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>

      <TextField
        required
        variant="outlined"
        label="Usuário"
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mt: "auto" }}>
      </TextField>

      <TextField
        required
        variant="outlined"
        type="password"
        label="Senha"
        onChange={(e) => setPassword(e.target.value)}
        sx = {{ mt: 2 }}>
      </TextField>

      <TextField
        required
        variant="outlined"
        type="password"
        label="Confirmar Senha"
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx = {{ mt: 2}}>
      </TextField>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          columnGap: 6,
          rowGap: 2,
          mt: "auto",
          mb: 4
        }}>

        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleCancelSignup}>
          Cancelar
        </Button>

        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleSubmit}>
          Criar Conta
        </Button>
      </Box>
    </Box>
  );
};