import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import { TasksCollection } from '/imports/db/TasksCollection';
import { DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
  },
});

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
    <div className="new-task-page">
      <div className="new-task-title">
        <h1>
          Criar Nova Tarefa
        </h1>
      </div>

      <div>
        <TextField
          required
          variant="outlined"
          label="Nome da Tarefa"
          onChange={(e) => setTaskName(e.target.value)}
          style = {{width: 400, marginBottom: '15px'}}>
        </TextField>
      </div>

      <div>
        <TextField
          required
          multiline
          maxRows={3}
          variant="outlined"
          label="Descrição"
          onChange={(e) => setTaskDescription(e.target.value)}
          style = {{width: 400, marginBottom: '15px'}}>
        </TextField>
      </div>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={buttonTheme}>
          <DateTimePicker
            required
            label="Data"
            value={selectedDate}
            inputVariant="outlined"
            onChange={handleDateChange}
            format="yyyy/MM/dd hh:mm a"
            style = {{width: 400}}
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>

      <div className="new-task-buttons">
        <div className="new-task-button">
          <ThemeProvider theme={buttonTheme}>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={tasksPage}>
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
            Criar
            </Button>
          </ThemeProvider>
        </div>
      </div>

    </div>
  );
};