import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

export const Welcome = () => {
  const navigate = useNavigate();

  const currentUser = useTracker(() => Meteor.user())
  const subscriptionHandler = useTracker(() => Meteor.subscribe('tasks', currentUser ? currentUser.username : ""));
  const registeredTasksCount = useTracker(() => TasksCollection.find({ situation: "Cadastrada" }).count());
  const ongoingTasksCount = useTracker(() => TasksCollection.find({ situation: "Em Andamento" }).count());
  const completedTasksCount = useTracker(() => TasksCollection.find({ situation: "Concluída" }).count());

  const logout = () => Meteor.logout();

  const userLogout = () => {
    console.log("logging out");
    logout();
    while(Meteor.loggingOut === true) {}
    navigate('/');
  }

  const tasksPage = () => {
    navigate('/tasks');
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
        sx = {{ mt: 2 }}>
        Olá {currentUser ? currentUser.username : ""}, bem vindo ao Advanced ToDo List
      </Typography>

      <Link
        type="button"
        variant="subtitle1"
        underline="none"
        sx = {{
          display: "flex",
          alignSelf: "flex-end",
          mr: 1,
          mt: 2
        }}
        onClick={userLogout}>
        Logout {currentUser ? currentUser.username : ""}
        <LogoutSharpIcon sx={{ ml: 1, pt: 0.2}} />
      </Link>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
          columnGap: 14,
          mt: 6
        }}>

        <Card
          sx={{
          width: 150,
          height: 150
          }}>
          <CardContent>
            <Typography
              variant="h6">
              Total de Tarefas Cadastradas
            </Typography>
            {!subscriptionHandler.ready() ?
              <CircularProgress
                sx={{ color: "white", mt: 2, ml: 1 }}
              /> :
              <Typography
                sx={{ pt: 1, pl: 2 }}
                variant="h2"
                component="div">
                {registeredTasksCount}
              </Typography>
            }
          </CardContent>
        </Card>

        <Card
          sx={{
          width: 150,
          height: 150
          }}>
          <CardContent>
            <Typography
              variant="h6">
              Total de Tarefas em Andamento
            </Typography>
            {!subscriptionHandler.ready() ?
              <CircularProgress
                sx={{ color: "white", mt: 2, ml: 1 }}
              /> :
              <Typography
                sx={{ pt: 1, pl: 2 }}
                variant="h2"
                component="div">
                {ongoingTasksCount}
              </Typography>
            }
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
          columnGap: 14,
          mt: 8,
          mb: 1
        }}>

        <Card
          sx={{
          width: 150,
          height: 150
          }}>
          <CardContent>
            <Typography
              variant="h6">
              Total de Tarefas Concluídas
            </Typography>
            {!subscriptionHandler.ready() ?
              <CircularProgress
                sx={{ color: "white", mt: 2, ml: 1 }}
              /> :
              <Typography
                sx={{ pt: 1, pl: 2 }}
                variant="h2"
                component="div">
                {completedTasksCount}
              </Typography>
            }
          </CardContent>
        </Card>

        <Button
          type="button"
          variant="contained"
          sx = {{
            width: 150,
            height: 150
          }}
          color="primary"
          onClick={tasksPage}>
          Visualizar tarefas
        </Button>
      </Box>
    </Box>
  );
};