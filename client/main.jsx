import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import { ThemeProvider } from '@mui/material/styles';
import { MainTheme } from '/imports/theme/MainTheme';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <ThemeProvider theme={MainTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  )
});