import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function () {
  return TasksCollection.find({ $or: [{userName: Meteor.user().username}, {type: "Pública"}] });
});