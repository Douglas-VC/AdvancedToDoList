import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { buttonTheme } from './Welcome';

export const EditTask = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  useTracker(() => Meteor.subscribe('tasks'));
  const task = useTracker(() => TasksCollection.findOne({ _id: state.task._id }));

  const [disabledState, setDisabledState] = useState(true);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [selectedDate, handleDateChange] = useState(task.date);
  const [taskType, setTaskType] = React.useState(task.type);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(null);

  const [disabledRegisteredButton, setDisabledRegisteredButton] = useState( (task.situation === "Cadastrada") ? true : false );
  const [disabledOngoingButton, setDisabledOngoingButton] = useState( (task.situation === "Em Andamento") ? true : false );
  const [disabledConcludedButton, setDisabledConcludedButton] = useState( (task.situation === "Cadastrada" || task.situation === "Concluída") ? true : false );

  const tasksPage = () => {
    navigate('/tasks');
  }

  const handleSave = e => {

    e.preventDefault();

    if (!taskName || !taskDescription) return;

    Meteor.call('tasks.setTaskInfo', {
      taskId: task._id,
      name: taskName.trim(),
      description: taskDescription.trim(),
      date: selectedDate,
      type: taskType
    });

    setDisabledState(true);
  };

  const handleCancel = () => {
    setTaskName(task.name);
    setTaskDescription(task.description);
    setTaskType(task.type);
    handleDateChange(task.date);

    setDisabledState(true);
  };

  const handleEdit = () => {
    if (task.userName === Meteor.user().username) {
      setDisabledState(false);
    } else {
      setErrorMessage("Apenas o usuário que criou a tarefa pode modificá-la");
      setShowErrorMessage(true);
    }
  };

  const handleTypeChange = (e) => {
    setTaskType(e.target.value);
  };

  const handleRegisteredClick = () => {
    Meteor.call('tasks.setSituation', task._id, "Cadastrada");
    setDisabledRegisteredButton(true);
    setDisabledOngoingButton(false);
    setDisabledConcludedButton(true);
    return;
  };

  const handleOngoingClick = () => {
    Meteor.call('tasks.setSituation', task._id, "Em Andamento");
    setDisabledRegisteredButton(false);
    setDisabledOngoingButton(true);
    setDisabledConcludedButton(false);
    return;
  };

  const handleConcludedClick = () => {
    Meteor.call('tasks.setSituation', task._id, "Concluída");
    setDisabledRegisteredButton(false);
    setDisabledOngoingButton(false);
    setDisabledConcludedButton(true);
    return;
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
        {disabledState ? 'Visualizar' : 'Editar'}: {task.name}
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

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <Typography
          sx = {{
            width: 140,
            textAlign: "right" }}>
          Nome da Tarefa:
        </Typography>

        <TextField
          required
          disabled={disabledState}
          variant="outlined"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          sx = {{
            width: 400,
            marginLeft: 1,
            marginRight: 18,
            backgroundColor: disabledState ? '#bdbdbd' : 'white',
            "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black" }
          }}>
        </TextField>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <Typography
          sx = {{
            width: 140,
            textAlign: "right" }}>
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
          sx = {{
            width: 400,
            marginLeft: 1,
            marginRight: 18,
            backgroundColor: disabledState ? '#bdbdbd' : 'white',
            "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black" }
          }}>
        </TextField>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" }}>
        <Typography
          sx = {{
            width: 140,
            textAlign: "right" }}>
          Data:
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) =>
              <TextField {...props}
              sx = {{
                width: 400,
                marginLeft: 1,
                marginRight: 18,
                backgroundColor: disabledState ? '#bdbdbd' : 'white',
                "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black" }
              }}
              required/>
            }
            value={selectedDate}
            disabled={disabledState}
            format="dd/MM/yyyy hh:mm a"
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <Typography
          sx = {{
            width: 140,
            textAlign: "right" }}>
          Tipo:
        </Typography>

        <FormControl>
          <Select
            value={taskType}
            disabled={disabledState}
            onChange={handleTypeChange}
            sx = {{
              width: 400,
              marginLeft: 1,
              marginRight: 18,
              backgroundColor: disabledState ? '#bdbdbd' : 'white',
              "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black" }
            }}
          >
            <MenuItem value={"Pública"}>Pública</MenuItem>
            <MenuItem value={"Pessoal"}>Pessoal</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" }}>
        <Typography
          sx = {{
            width: 140,
            textAlign: "right" }}>
          Criador:
        </Typography>

        <TextField
          disabled
          variant="outlined"
          value={task.userName}
          sx = {{
            width: 400,
            marginLeft: 1,
            marginRight: 18,
            backgroundColor: '#bdbdbd',
            "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black" }
          }}>
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
          sx = {{
            width: 400,
            marginLeft: 1,
            marginRight: 18,
            backgroundColor: '#bdbdbd',
            "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black" }
          }}>
        </TextField>
      </Box>

      <Box
        sx={{
          display: "flex",
          position: "absolute",
          bottom: 110,
          justifyContent: "space-around"
        }}>

        <ThemeProvider theme={buttonTheme}>
          <Button
            type="button"
            variant="contained"
            disabled={disabledRegisteredButton}
            sx = {{
              fontWeight: "bold",
              fontSize: "normal",
              mr: 8,
              ml: 8
            }}
            color="primary"
            onClick={handleRegisteredClick}>
            Cadastrada
          </Button>
        </ThemeProvider>

        <ThemeProvider theme={buttonTheme}>
          <Button
            type="button"
            variant="contained"
            disabled={disabledOngoingButton}
            sx = {{
              fontWeight: "bold",
              fontSize: "normal",
              mr: 8,
              ml: 8
            }}
            color="primary"
            onClick={handleOngoingClick}>
            Em Andamento
          </Button>
        </ThemeProvider>

        <ThemeProvider theme={buttonTheme}>
          <Button
            type="button"
            variant="contained"
            disabled={disabledConcludedButton}
            sx = {{
              fontWeight: "bold",
              fontSize: "normal",
              mr: 8,
              ml: 8
            }}
            color="primary"
            onClick={handleConcludedClick}>
            Concluída
          </Button>
        </ThemeProvider>
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
            onClick={disabledState ? tasksPage : handleCancel}>
            {disabledState ? 'Voltar' : 'Cancelar'}
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
            onClick={disabledState ? handleEdit : handleSave}>
            {disabledState ? 'Editar' : 'Salvar'}
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
};