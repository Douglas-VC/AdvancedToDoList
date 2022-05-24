import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { TasksCollection } from '/imports/db/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DateTimePicker } from '@material-ui/pickers';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
  },
});

export const EditTask = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const task = useTracker(() => TasksCollection.find({_id : state.task._id}).fetch()[0]);

  const [disabledState, setDisabledState] = useState(true);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [selectedDate, handleDateChange] = useState(task.date);

  const [disabledRegisteredButton, setDisabledRegisteredButton] = useState( (task.situation === "Cadastrada") ? true : false );
  const [disabledOngoingButton, setDisabledOngoingButton] = useState( (task.situation === "Em Andamento") ? true : false );
  const [disabledConcludedButton, setDisabledConcludedButton] = useState( (task.situation === "Cadastrada" || task.situation === "Concluida") ? true : false );

  const tasksPage = () => {
    navigate('/tasks');
  }

  const handleSave = e => {

    e.preventDefault();

    if (!taskName || !taskDescription) return;

    TasksCollection.update(
      {_id : task._id},
      {$set:{
        name : taskName,
        description: taskDescription,
        date: selectedDate
      }}
    );

    setDisabledState(true);
  };

  const handleCancel = () => {
    setTaskName(task.name);
    setTaskDescription(task.description);

    setDisabledState(true);
  };

  const handleRegisteredClick = () => {
    TasksCollection.update(
      {_id : task._id},{$set:{situation: 'Cadastrada'}}
    );
    setDisabledRegisteredButton(true);
    setDisabledOngoingButton(false);
    setDisabledConcludedButton(true);
    return;
  };

  const handleOngoingClick = () => {
    TasksCollection.update(
      {_id : task._id},{$set:{situation: 'Em Andamento'}}
    );
    setDisabledRegisteredButton(false);
    setDisabledOngoingButton(true);
    setDisabledConcludedButton(false);
    return;
  };

  const handleConcludedClick = () => {
    TasksCollection.update(
      {_id : task._id},{$set:{situation: 'Concluída'}}
    );
    setDisabledRegisteredButton(false);
    setDisabledOngoingButton(false);
    setDisabledConcludedButton(true);
    return;
  };

  return (
    <div className="edit-task-page">
      <div className="edit-task-title">
        <h1>
        {disabledState ? 'Visualizar' : 'Editar'}: {task.name}
        </h1>
      </div>

      <div>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
          <Typography
            style = {{
              width: 140,
              textAlign: "right"}}>
            Nome da Tarefa:
          </Typography>
          <TextField
            required
            disabled={disabledState}
            variant="outlined"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            style = {{
              width: 400,
              marginLeft: 12,
              marginRight: 140,
              backgroundColor: disabledState ? '#bdbdbd' : 'white',
              WebkitTextFillColor: 'black'}}>
          </TextField>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
          <Typography
            style = {{ width: 140, textAlign: "right" }}>
            Descrição:
          </Typography>
          <TextField
            required
            multiline
            maxRows={3}
            disabled={disabledState}
            variant="outlined"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            style = {{
              width: 400,
              marginLeft: 12,
              marginRight: 140,
              backgroundColor: disabledState ? '#bdbdbd' : 'white',
              WebkitTextFillColor: 'black'}}>
          </TextField>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" }}>
          <Typography
            style = {{ width: 140, textAlign: "right" }}>
            Data:
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={buttonTheme}>
              <DateTimePicker
                required
                disabled={disabledState}
                value={selectedDate}
                inputVariant="outlined"
                onChange={handleDateChange}
                format="dd/MM/yyyy hh:mm a"
                style = {{
                  width: 400,
                  marginLeft: 12,
                  marginRight: 140,
                  backgroundColor: disabledState ? '#bdbdbd' : 'white',
                  WebkitTextFillColor: 'black'}}
              />
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" }}>
          <Typography
            style = {{ width: 140, textAlign: "right" }}>
            Criador:
          </Typography>
          <TextField
            disabled
            variant="outlined"
            value={task.userName}
            style = {{
              width: 400,
              marginLeft: 12,
              marginRight: 140,
              backgroundColor: '#bdbdbd',
              WebkitTextFillColor: 'black'}}>
          </TextField>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" }}>
          <Typography
            style = {{ width: 140, textAlign: "right" }}>
            Situação:
          </Typography>
          <TextField
            disabled
            variant="outlined"
            value={task.situation}
            style = {{
              width: 400,
              marginLeft: 12,
              marginRight: 140,
              backgroundColor: '#bdbdbd',
              WebkitTextFillColor: 'black'}}>
          </TextField>
        </Box>
      </div>

      <div className="task-situation-buttons">
        <div className="task-situation-button">
          <ThemeProvider theme={buttonTheme}>
            <Button
            type="submit"
            variant="contained"
            disabled={disabledRegisteredButton}
            color="primary"
            onClick={handleRegisteredClick}>
            Cadastrada
            </Button>
          </ThemeProvider>
        </div>

        <div className="task-situation-button">
          <ThemeProvider theme={buttonTheme}>
            <Button
            type="submit"
            variant="contained"
            disabled={disabledOngoingButton}
            color="primary"
            onClick={handleOngoingClick}>
            Em Andamento
            </Button>
          </ThemeProvider>
        </div>

        <div className="task-situation-button">
          <ThemeProvider theme={buttonTheme}>
            <Button
            type="submit"
            variant="contained"
            disabled={disabledConcludedButton}
            color="primary"
            onClick={handleConcludedClick}>
            Concluída
            </Button>
          </ThemeProvider>
        </div>
      </div>

      <div className="edit-task-buttons">
        <div className="edit-task-button">
          <ThemeProvider theme={buttonTheme}>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={disabledState ? tasksPage : handleCancel}>
            {disabledState ? 'Voltar' : 'Cancelar'}
            </Button>
          </ThemeProvider>
        </div>

        <div className="edit-task-button">
          <ThemeProvider theme={buttonTheme}>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={disabledState ? () => setDisabledState(false) : handleSave}>
            {disabledState ? 'Editar' : 'Salvar'}
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};