// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server');

    // delete many
    // db.collection('ToDos').deleteMany({text: "Walk the dog"}).then((res) => {
    //     console.log(res);
    // });

    // delete one
    // db.collection('ToDos').deleteOne({text: "Walk the dog"}).then((res) => {
    //     console.log(res);
    // });

    // find one and dlete
    // db.collection('ToDos').findOneAndDelete({completed: false}).then((res) => {
    //     console.log(res);
    // });

    // db.collection('Users').deleteMany({name: "Jimmy"}).then((res) => {
    //     console.log(res);
    // });

    // db.collection('Users').findOneAndDelete({_id: new ObjectID("5c8d669832b630294c3a4fca")}).then((res) => {
    //     console.log(res);
    // });

    // db.close();
});