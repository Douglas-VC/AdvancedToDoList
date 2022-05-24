import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task';
import { TasksCollection } from '/imports/db/TasksCollection';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
  },
});

const deleteTask = ({ _id }) => TasksCollection.remove(_id);

export const Tasks = () => {
  const navigate = useNavigate();
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  const welcomePage = () => {
    navigate('/welcome');
  }

  const newTaskPage = () => {
    navigate('/newtask');
  }

  const editTask = (task) => {
    navigate('/edittask', { state: { task: task } });
  }

  return (
    <div className="tasks-page">
      <div className="tasks-title">
        <h1>
          Tarefas Cadastradas
        </h1>
      </div>

      <div className='tasks-list'>
        <Box sx={{ flexGrow: 1, minWidth:320 }}>
          <List style={{ maxHeight: 400, overflow: 'auto' }}>
            {tasks.map(task => (
              <Task
                key={task._id}
                task={task}
                onDeleteClick={deleteTask}
                onEditClick={editTask}
              />
            ))}
          </List>
        </Box>
      </div>

      <div className="tasks-newtask-button">
        <ThemeProvider theme={buttonTheme}>
          <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={newTaskPage}>
          +
          </Button>
        </ThemeProvider>
      </div>

      <div className="tasks-back-button">
        <ThemeProvider theme={buttonTheme}>
          <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={welcomePage}>
          Voltar
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};