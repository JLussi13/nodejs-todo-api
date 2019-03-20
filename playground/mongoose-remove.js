const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');
const {ObjectID} = require('mongodb');

var id = new ObjectID("5c929b144238a22754fa2884");

// Todo.remove({}).then((result) => {
//     console.log(result)
// });

Todo.findOneAndRemove({_id: id}).then((todo) => {
    console.log(todo)
});

Todo.findByIdAndRemove("5c929b144238a22754fa2884").then((todo) => {
    console.log(todo)
});