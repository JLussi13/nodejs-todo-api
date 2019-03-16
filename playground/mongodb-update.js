// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server');

    // db.collection("ToDos").findOneAndUpdate({
    //     _id: new ObjectID("5c8d63af29129519049aebfb")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection("Users").findOneAndUpdate({
        _id: new ObjectID("5c8d6753a97cc1278cf8a36c")
    }, {
        $set: {
            name: "Jimmy"
        },
        $inc: {
            age: +5
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // db.close();
});