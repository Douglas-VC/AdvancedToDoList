import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Welcome } from './Welcome';
import { Tasks } from './Tasks';
import { NewTask } from './NewTask';
import { Route, Routes, useNavigate } from "react-router-dom";

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const RequireAuth = ({ children }) => {
    console.log(user);

    return !user ? (
      console.log("You need to log in!"),
      navigate('/')
    ) : (
      children
    );
  }

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<LoginForm />} />
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
      </Routes>
    </div>
  );
};
