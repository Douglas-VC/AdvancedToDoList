import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const UserProfile = () => {
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
        Perfil de {Meteor.user().username}
      </Typography>
    </Box>
  );
};