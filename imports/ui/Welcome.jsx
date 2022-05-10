import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
    const navigate = useNavigate();
    const userLogout = () => {
        console.log("logging out");
        Meteor.logout();
        while(Meteor.loggingOut === true) {}
        navigate('/');                
    }

    return (
        <div className="app-bar">
            <div className="app-header">
              <h1>
                📝️ To Do List
              </h1>
            </div>
            <div className="user-logout" onClick={userLogout}>
                testuser 🚪
            </div>
        </div>
    );
};