// Called first, sets the proper port based upon the development environment selected
require('./config/config')

// npm requires
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// User created requires
var {mongoose} = require("./db/mongoose");
var {authenticate} = require('./middleware/authenticate');
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

// Create the middleware Express object
var app = express();
const port = process.env.PORT || 3000;

// Makes the middleware use a json bodyParser
app.use(bodyParser.json());

// POST a new todo to the database, user types a todo into the request body, todo is saved to the database
// and the todo is sent back to the user vai the response if it was succesful. Autheticate is used to
// associate a todo with a specific user
app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

// POST a new user to the database, user types in user info into the request body, the 'email' and 'password'
// attributes are picked from that body
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ["email", "password"])
    var user = new User(body);

    // User is daved to database, when succesfully saved an auth token is generated
    // Auth token and user object are sent back to the user
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
}); 

// GET all the todos associated with the user making the request and return those todos to them
app.get('/todos', authenticate, (req, res) => {
    Todo.find({_creator: req.user._id}).then((todos) => {
        res.send({todos})
    }, () => {
        res.status(400).send(e);
    })
})

// GET a todo by id from the database, the user types the ID in to the address bar, we check if the ID is a
// valid ID and if it exists in database. If it does, and the todo belongs to the currently logged in user, 
// return that specific todo
app.get('/todos/:id', authenticate, (req, res) => {
    if(!ObjectID.isValid(req.params.id)) {
        return res.status(404).send({});
    }
    Todo.findOne({
        _id: req.params.id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo})
    }).catch((e) => {
        res.status(400).send();
    })
})

// DELETE a todo by id from the database, the user types the ID in to the address bar, we check if the ID is a
// valid ID and if it exists in database. If it does, return that specific todo and delete it from the database
app.delete('/todos/:id', authenticate, (req, res) => {
    if(!ObjectID.isValid(req.params.id)) {
        return res.status(404).send({});
    }
    Todo.findOneAndDelete({
        _id: req.params.id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo})
    }).catch((e) => {
        res.status(400).send();
    })
})

// PATCH (change) a todo by id from the database, the user types the ID in to the address bar, the user also types in
// a new 'text' and/or 'completed' value for that todo. If the object is valid, make necessary changes to the todo body
// and send it back to the user
app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed'])

    if(!ObjectID.isValid(req.params.id)) {
        return res.status(404).send({});
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        return res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })

})

// GET a specific user from the database using an authentication token in the header
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})

// POST a login request to the server, provide email and password. Search for the email in and then compare
// the hashed password and plaintext with bcrypt to see if they match. If so, set the x-auth to the user's token
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })
    }).catch((e) => {
        res.status(400).send();
    });
})

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }), () => {
        res.status(400).send();
    }
})

// Starts the app on the provided port
app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

module.exports = {app};