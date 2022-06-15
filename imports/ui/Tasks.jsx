import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Task } from './Task';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { buttonTheme } from './Welcome';

export const Tasks = () => {
  const navigate = useNavigate();

  const handler = useTracker(() => Meteor.subscribe('tasks'));
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(null);

  const welcomePage = () => {
    navigate('/welcome');
  }

  const newTaskPage = () => {
    navigate('/newtask');
  }

  const editTask = (task) => {
    navigate('/edittask', { state: { task: task } });
  }

  const deleteTask = ({ _id, userName }) => {
    if (userName === Meteor.user().username) {
      Meteor.call('tasks.remove', _id)
    } else {
      setErrorMessage("Apenas o usuário que criou a tarefa pode excluí-la");
      setShowErrorMessage(true);
    }
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
        sx = {{ fontSize: "1.6rem", mt: 2, fontWeight: "bold"}}>
        Tarefas Cadastradas
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

      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
        {!handler.ready() ?
          <CircularProgress sx={{color: "black"}}/> :
          <List sx={{ maxHeight: 500, overflow: "auto" }}>
            {tasks.map(task => (
              <Task
                key={task._id}
                task={task}
                onDeleteClick={deleteTask}
                onEditClick={editTask}
              />
            ))}
          </List>}

          <ThemeProvider theme={buttonTheme}>
            <Button
              type="button"
              variant="contained"
              sx = {{
                mt: 2,
                mb: 1,
                fontWeight: "bold",
                fontSize: "large"
              }}
              color="primary"
              onClick={newTaskPage}>
              +
            </Button>
          </ThemeProvider>
      </Box>

      <ThemeProvider theme={buttonTheme}>
        <Button
          type="button"
          variant="contained"
          sx = {{
            width: 150,
            fontWeight: "bold",
            fontSize: "large",
            position: "fixed",
            bottom: 40,
            left: 40
          }}
          color="primary"
          onClick={welcomePage}>
          Voltar
        </Button>
      </ThemeProvider>
    </Box>
  );
};