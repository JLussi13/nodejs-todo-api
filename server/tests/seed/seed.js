const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');

const todos = [
    {_id: new ObjectID(), 
    text: "First test todo"}, 
    {_id: new ObjectID(), 
    text: "Second test todo",
    completed: true,
    completedAt: 78356378}, 
    {_id: new ObjectID(), 
    text: "Third text todo"}];

const populateTodos = ((done) => {
    Todo.deleteMany({}).then(() => {
      return Todo.insertMany(todos);
    }).then(() => done()).catch((e) => done(e));
  });

module.exports = {todos, populateTodos};