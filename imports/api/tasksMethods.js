import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.methods({
  'tasks.insert'({ name, description, date, situation, type }) {
    check(name, String);
    check(description, String);
    check(Object.prototype.toString.call(date), "[object Date]");
    check(situation, String);
    check(type, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      name: name,
      description: description,
      date: date,
      situation: situation,
      type: type,
      userId: Meteor.user()._id,
      userName: Meteor.user().username,
      createdAt: new Date()
    });
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.remove(taskId);
  },

  'tasks.setTaskInfo'({ taskId, name, description, date }) {
    check(taskId, String);
    check(name, String);
    check(description, String);
    check(Object.prototype.toString.call(date), "[object Date]");

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.update(taskId, {
      $set: {
        name: name,
        description: description,
        date: date,
      }
    });
  },

  'tasks.setSituation'(taskId, situation) {
    check(taskId, String);
    check(situation, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.update(taskId, {
      $set: {
        situation: situation
      }
    });
  }
});