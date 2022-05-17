import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AssignmentSharpIcon from '@material-ui/icons/AssignmentSharp';
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

export const Task = ({ task, onDeleteClick }) => {
  return (
    
    <ListItem>
      <ListItemIcon>
        <AssignmentSharpIcon className="task-icon"/>
      </ListItemIcon>
      <ListItemText 
        primary = {task.text}
        secondary = {task.userName}
      />
      <ListItemSecondaryAction>
        <IconButton edge='end'>
          <EditSharpIcon />
        </IconButton>
        <IconButton 
          edge='end'
          onClick={() => onDeleteClick(task)}>
          <DeleteSharpIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>

  );
};

