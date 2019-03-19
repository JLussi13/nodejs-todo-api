const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

var userID = "c8db7e04f805b08245cc885"

// var id = "5c8f3ba8b7480a0c10c5259f";

if(!ObjectID.isValid(userID)) {
    console.log("ID Not Valid");
}

User.findById(userID).then((user) => {
    if(!user) {
        return console.log("No user with this ID");
    }
    return console.log("User by ID: " + user);
}).catch((e) => console.log(e))

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ' + todos);
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo: ' + todo);
// })

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log("ID Not found");
//     }
//     console.log('Todo by Id: ' + todo);
// }).catch((e) => console.log(e));