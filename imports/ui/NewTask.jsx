import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        alignItems: "center",
        height: "90vh"
      }}>

      <Typography
        variant="h4"
        sx = {{ mt: 2, mb: 4}}>
        Criar Nova Tarefa
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
        label="Nome da Tarefa"
        onChange={(e) => setTaskName(e.target.value)}
        sx = {{width: 400, mb: '15px', mt: "auto"}}>
      </TextField>

      <TextField
        required
        multiline
        maxRows={3}
        variant="outlined"
        label="Descrição"
        onChange={(e) => setTaskDescription(e.target.value)}
        sx = {{width: 400, mb: '15px'}}>
      </TextField>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) =>
            <TextField {...props}
            sx = {{width: 400, mb: '15px'}}
            required/>
          }
          label="Data"
          value={selectedDate}
          format="dd/MM/yyyy hh:mm a"
          onChange={handleDateChange}
        />
      </LocalizationProvider>

      <Box sx={{ width: 400, mb: "auto" }}>
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
          justifyContent: "space-around",
          mt: "auto",
          columnGap: 10,
          rowGap: 2,
        }}>

        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={tasksPage}>
          Cancelar
        </Button>

        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleSubmit}>
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
};