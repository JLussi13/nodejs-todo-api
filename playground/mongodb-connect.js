// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server');

    // db.collection('ToDos').insertOne({
    //     text: "Somethign to do",
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to connect to MongoDB server')
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: "Jimmy",
    //     age: 25,
    //     loc: "Dallas"
    // }, (err, result) => {
    //     if(err) {
    //         console.log("Unable to connect to database");
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // })


    db.close();
});