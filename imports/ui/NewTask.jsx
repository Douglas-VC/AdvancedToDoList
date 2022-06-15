import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { buttonTheme } from './Welcome';

export const NewTask = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedDate, handleDateChange] = useState(null);
  const [taskType, setTaskType] = React.useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(null);

  const handleTypeChange = (e) => {
    setTaskType(e.target.value);
  };

  const tasksPage = () => {
    navigate('/tasks');
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (!taskName || !taskDescription || !selectedDate || !taskType) {
      setErrorMessage("Preencha todos os campos obrigatórios");
      setShowErrorMessage(true);
      return;
    }

    Meteor.call('tasks.insert', {
      name: taskName.trim(),
      description: taskDescription.trim(),
      date: selectedDate,
      situation: 'Cadastrada',
      type: taskType
    });

    navigate('/tasks');
  };

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
        sx = {{ fontSize: "1.6rem", mt: 2, mb: 4, fontWeight: "bold"}}>
        Criar Nova Tarefa
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
        label="Nome da Tarefa"
        onChange={(e) => setTaskName(e.target.value)}
        style = {{width: 400, marginBottom: '15px'}}>
      </TextField>

      <TextField
        required
        multiline
        maxRows={3}
        variant="outlined"
        label="Descrição"
        onChange={(e) => setTaskDescription(e.target.value)}
        style = {{width: 400, marginBottom: '15px'}}>
      </TextField>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) =>
            <TextField {...props}
            sx = {{width: 400, marginBottom: '15px'}}
            required/>
          }
          label="Data"
          value={selectedDate}
          format="dd/MM/yyyy hh:mm a"
          onChange={handleDateChange}
        />
      </LocalizationProvider>

      <Box sx={{ width: 400 }}>
        <FormControl fullWidth>
          <InputLabel required>Tipo</InputLabel>
          <Select
            value={taskType}
            label="Tipo"
            onChange={handleTypeChange}
          >
            <MenuItem value={"Pública"}>Pública</MenuItem>
            <MenuItem value={"Pessoal"}>Pessoal</MenuItem>
          </Select>
        </FormControl>
      </Box>

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
            onClick={tasksPage}>
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
            Cadastrar
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
};