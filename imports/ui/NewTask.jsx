import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { buttonTheme } from './Welcome';

export const NewTask = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedDate, handleDateChange] = useState(null);

  const tasksPage = () => {
    navigate('/tasks');
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (!taskName || !taskDescription || !selectedDate) return;

    TasksCollection.insert({
      name: taskName.trim(),
      description: taskDescription.trim(),
      date: selectedDate,
      situation: 'Cadastrada',
      userId: Meteor.user()._id,
      userName: Meteor.user().username,
      createdAt: new Date()
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
        sx = {{ fontSize: "1.6rem", mt: 8, mb: 4, fontWeight: "bold"}}>
        Criar Nova Tarefa
      </Typography>

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
            sx = {{width: 400}}
            required/>
          }
          label="Data"
          value={selectedDate}
          format="dd/MM/yyyy hh:mm a"
          onChange={handleDateChange}
        />
      </LocalizationProvider>

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