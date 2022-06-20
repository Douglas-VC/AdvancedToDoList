import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function (username) {
  return TasksCollection.find({ $or: [{userName: username}, {type: "Pública"}] });
});