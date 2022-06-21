import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

export const EditTask = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const task = state.task;

  const [disabledState, setDisabledState] = useState(true);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [selectedDate, handleDateChange] = useState(task.date);
  const [taskType, setTaskType] = React.useState(task.type);
  const [taskSituation, setTaskSituation] = React.useState(task.situation);
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
    setTaskSituation("Cadastrada");
    setDisabledRegisteredButton(true);
    setDisabledOngoingButton(false);
    setDisabledConcludedButton(true);
    return;
  };

  const handleOngoingClick = () => {
    Meteor.call('tasks.setSituation', task._id, "Em Andamento");
    setTaskSituation("Em Andamento");
    setDisabledRegisteredButton(false);
    setDisabledOngoingButton(true);
    setDisabledConcludedButton(false);
    return;
  };

  const handleConcludedClick = () => {
    Meteor.call('tasks.setSituation', task._id, "Concluída");
    setTaskSituation("Concluída");
    setDisabledRegisteredButton(false);
    setDisabledOngoingButton(false);
    setDisabledConcludedButton(true);
    return;
  };

  const textFieldStyle = {
    width: 400,
    marginLeft: 1,
    marginRight: 18,
    backgroundColor: "white",
    "& .MuiInputBase-root.Mui-disabled": {
      backgroundColor: "#bdbdbd"
    },
    "& .MuiSelect-select.Mui-disabled": {
      backgroundColor: "#bdbdbd"
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
        sx = {{ mt: 2, mb: 4}}>
        {disabledState ? 'Visualizar' : 'Editar'}: {task.name}
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
          sx={textFieldStyle}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}>
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
          sx = {textFieldStyle}>
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
              sx = {textFieldStyle}
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
            sx = {textFieldStyle}
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
          sx = {textFieldStyle}>
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
          value={taskSituation}
          sx = {textFieldStyle}>
        </TextField>
      </Box>

      <Box
        sx={{
          display: "flex",
          mt: 5,
          justifyContent: "space-around",
          columnGap: 10
        }}>
        <Button
          type="button"
          variant="contained"
          disabled={disabledRegisteredButton}
          color="secondary"
          onClick={handleRegisteredClick}>
          Cadastrada
        </Button>

        <Button
          type="button"
          variant="contained"
          disabled={disabledOngoingButton}
          color="secondary"
          onClick={handleOngoingClick}>
          Em Andamento
        </Button>

        <Button
          type="button"
          variant="contained"
          disabled={disabledConcludedButton}
          color="secondary"
          onClick={handleConcludedClick}>
          Concluída
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          position: "absolute",
          justifyContent: "space-around",
          columnGap: 10,
          rowGap: 2,
          bottom: 40
        }}>

        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={disabledState ? tasksPage : handleCancel}>
          {disabledState ? 'Voltar' : 'Cancelar'}
        </Button>

        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={disabledState ? handleEdit : handleSave}>
          {disabledState ? 'Editar' : 'Salvar'}
        </Button>
      </Box>
    </Box>
  );
};