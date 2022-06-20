import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Task } from './Task';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

export const Tasks = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(null);
  const [taskCheckbox, setTaskCheckbox] = useState(true);
  const [page, setPage] = React.useState(1);
  const [searchField, setSearchField] = useState('');

  const subscriptionHandler = useTracker(() => Meteor.subscribe('tasks', Meteor.user().username));
  const tasks = useTracker(() => TasksCollection.find(searchField ? { name: { $regex: searchField, $options : 'i' } } : taskCheckbox ? {} : { situation: { $ne: "Concluída" } }, { skip: (page-1)*4, limit: 4 }).fetch());
  const tasksCount = useTracker(() => TasksCollection.find(searchField ? { name: { $regex: searchField, $options : 'i' } } : taskCheckbox ? {} : { situation: { $ne: "Concluída" } }).count());

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleCheckbox = () => {
    setTaskCheckbox(v => !v);
    setPage(1);
  };

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

      <FormControlLabel
        label="Mostrar Tarefas Concluídas"
        sx={{ mt: 1 }}
        control={
          <Checkbox
            defaultChecked
            onChange={handleCheckbox}
            sx={{
              color: "black",
              '&.Mui-checked': {
                color: "black"
              }
            }}
          />
        }
      />

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
        size="small"
        variant="outlined"
        placeholder="Pesquisar..."
        onChange={(e) => setSearchField(e.target.value)}
        sx={{
          mt: 1,
          mb: 1,
          width: "30vw",
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            }
          }
        }}
        InputProps={{
          endAdornment:
            <InputAdornment
              position="end">
                <SearchSharpIcon
                  sx={{
                    color: "#bdbdbd"
                  }}
                />
            </InputAdornment>
        }}>
      </TextField>

      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
        {!subscriptionHandler.ready() ?
          <CircularProgress sx={{ color: "black" }}/> :
          <List sx={{ minHeight: "385px" }}>
            {tasks.map(task => (
              <Task
                key={task._id}
                task={task}
                onDeleteClick={deleteTask}
                onEditClick={editTask}
              />
            ))}
          </List>}

          <Pagination
            sx={{ mt: 2}}
            shape="rounded"
            variant="outlined"
            showFirstButton
            showLastButton
            count={Math.ceil(tasksCount/4)}
            page={page}
            onChange={handleChange}
            boundaryCount={2}
          />

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
      </Box>

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
    </Box>
  );
};