const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
    {_id: new ObjectID(), 
    text: "First test todo"}, 
    {_id: new ObjectID(), 
    text: "Second test todo"}, 
    {_id: new ObjectID(), 
    text: "Third text todo"}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }). then(() => done());
});

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done(0);
                }).catch((err) => done(err));
            })
    })

    it("Should not create todo with bad data", (done) => {
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch((err) => done(err));
            })
    })
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(3)
        })
        .end(done);
    })
})

describe('GET /todos/:id', () => {
    it('Should get todo by ID', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done);
    });

    it("Should return 404 if todo not found", (done) => {
        request(app)
        .get(`/todos/${new ObjectID()}`)
        .expect(404)
        .end(done);
    })

    it("Should return 404 if invalid ID", (done) => {
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    })
})