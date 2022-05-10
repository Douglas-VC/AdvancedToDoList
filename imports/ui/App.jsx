import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Welcome } from './Welcome';
import { Tasks } from './Tasks';
import { Route, Routes, Navigate } from "react-router-dom";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  function RequireAuth({ children }) {
    console.log(user);
    // if (!user) {
    //   return <Navigate to="/" replace={false} />;
    // }
  
    // return children;
    return !user ? (
      <Navigate to="/" replace={true} />
    ) : (
      children
    );
  }

  return (
    <div>
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
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
};
