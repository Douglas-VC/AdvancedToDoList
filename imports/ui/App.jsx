import { Meteor } from 'meteor/meteor';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Welcome } from './Welcome';
import { Tasks } from './Tasks';
import { NewTask } from './NewTask';
import { EditTask } from './EditTask';
import { SignUp } from './SignUp';
import { AppDrawer } from './AppDrawer';
import { UserProfile } from './UserProfile';
import Box from '@mui/material/Box';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const RequireAuth = ({ children }) => {
    useEffect(() => {
      if (!user && !Meteor.loggingIn()) {
        navigate('/')
      }
    }, [user, navigate]);

    return (
      <>
        <AppDrawer />
        {children}
      </>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "white"
      }}>
      <Routes>
        <Route
          path="/"
          element={ <LoginForm /> }
        />

        <Route
          path="/signup"
          element={ <SignUp /> }
        />

        <Route
          path="/welcome"
          element={
            <RequireAuth>
              <Welcome />
            </RequireAuth>
          }
        />

        <Route
          path="/tasks"
          element={
            <RequireAuth>
              <Tasks />
            </RequireAuth>
          }
        />

        <Route
          path="/newtask"
          element={
            <RequireAuth>
              <NewTask />
            </RequireAuth>
          }
        />

        <Route
          path="/edittask"
          element={
            <RequireAuth>
              <EditTask />
            </RequireAuth>
          }
        />

        <Route
          path="/userprofile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
      </Routes>
    </Box>
  );
};
