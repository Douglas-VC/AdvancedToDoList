import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Task = ({ task, onDeleteClick, onEditClick }) => {
  return (
    <ListItem
      sx={{
        border: 1,
        borderRadius: "6px",
        mb: "5px"
      }}>
      <ListItemIcon>
        <AssignmentSharpIcon
          sx = {{ transform: "scale(1.6)" }}/>
      </ListItemIcon>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}>
        <Typography
          variant="h4"
          sx = {{
            fontSize: "1rem",
            color: "black"
          }}>
            {(task.name.length > 30) ? task.name.substr(0, 30-1) + '...' : task.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            mt: 1,
            columnGap: 3,
            rowGap: 1
          }}>

          <Typography
            variant="h4"
            sx = {{
              fontSize: "0.9rem",
              color: "#616161"
            }}>
              {"Data: " + task.date.toLocaleString()}
          </Typography>

          <Typography
            variant="h4"
            sx = {{
              width: "170px",
              fontSize: "0.9rem",
              color: "#616161"
            }}>
              {"Situação: " + task.situation}
          </Typography>

        </Box>

        <Typography
          variant="h4"
          sx = {{
            fontSize: "0.9rem",
            color: "#616161",
            mt: 1
          }}>
            {"Criador: " + task.userName}
        </Typography>
      </Box>

      <IconButton
        edge='end'
        size="large"
        onClick={() => onEditClick(task)}>
          <EditSharpIcon />
      </IconButton>
      <IconButton
        edge='end'
        size="large"
        onClick={() => onDeleteClick(task)}>
          <DeleteSharpIcon />
      </IconButton>
    </ListItem>
  );
};