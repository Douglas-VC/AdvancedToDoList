import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import { TasksCollection } from '/imports/db/TasksCollection';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
  },
});

export const NewTask = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const tasksPage = () => {
    navigate('/tasks');
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    TasksCollection.insert({
      text: text.trim(),
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
          onChange={(e) => setText(e.target.value)}
          required
          variant="outlined"
          label="Nome da Tarefa">
        </TextField>
      </div>

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