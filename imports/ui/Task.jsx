import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';

export const Task = ({ task, onDeleteClick, onEditClick }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <AssignmentSharpIcon
          sx = {{
            transform: "scale(1.6)"
          }}/>
      </ListItemIcon>
      <ListItemText
        primary = {task.name}
        secondary = {task.userName}
      />
      <ListItemSecondaryAction>
        <IconButton edge='end' onClick={() => onEditClick(task)} size="large">
          <EditSharpIcon />
        </IconButton>
        <IconButton edge='end' onClick={() => onDeleteClick(task)} size="large">
          <DeleteSharpIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};