import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

const insertTask = (taskName, taskDescription, user) =>
  TasksCollection.insert({
    name: taskName,
    description: taskDescription,
    date: new Date(),
    situation: 'Cadastrada',
    type: 'Pública',
    userId: user._id,
    userName: user.username,
    createdAt: new Date(),
});

Meteor.methods({
  doesUserExist(name) {
    return Accounts.findUserByUsername(name) != null;
  }
});

const SEED_USERNAME = 'testuser';
const SEED_PASSWORD = 'pass1523462652';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    const taskInformation = [
      ['Primeira Tarefa','Descrição Tarefa 1'],
      ['Segunda Tarefa','Descrição Tarefa 2'],
      ['Terceira Tarefa','Descrição Tarefa 3'],
      ['Quarta Tarefa','Descrição Tarefa 4']
    ];
    for (let i = 0; i < taskInformation.length; i++) {
      insertTask(taskInformation[i][0], taskInformation[i][1], user);
    }
  }
});