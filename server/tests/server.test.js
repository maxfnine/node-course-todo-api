const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { ObjectID } = require('mongodb');
const { todos, populateTodos, populateUsers, users } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => { expect(res.body.todos.length).toBe(2); })
      .end(done);
  })
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app).get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if invalid id passed', (done) => {
    request(app).get(`/todos/123`)
      .expect(404)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});
describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexID = todos[1]._id.toHexString();
    request(app).delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexID).then((result) => {
          expect(result).toNotExist();
          return done();
        })
          .catch((err) => {
            return done(err);
          })

      });

  });

  it('should return 404 if todo not found', (done) => {
    request(app).delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);

  });

  it('should return 404 if id is not valid', (done) => {
    request(app).delete(`/todos/123`)
      .expect(404)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);

  });

});

describe('PATCH /todos/:id', () => {
  var id = todos[1]._id.toHexString();
  var text = 'This is a test';
  it('should update the todo ', (done) => {
    request(app)
      .patch(`/todos/${id}`)
      .send({ text, completed: true })
      .expect(200)
      .expect((res) => {
        var todo = res.body.todo;
        expect(todo.text).toBe(text);
        expect(todo.completedAt).toBeA('number');
        expect(todo.completed).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(id).then((result) => {
          expect(result.text).toBe(text);
          done();
        }).catch((e) => done(e));
      });

  });

  it('should clear completedAT when todo is not completed', (done) => {
    request(app)
      .patch(`/todos/${id}`)
      .send({ text, completed: false })
      .expect(200)
      .expect((res) => {
        var todo = res.body.todo;
        expect(todo.completedAt).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(id).then((result) => {
          expect(result.text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

});

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body._id).toBe(users[0].email);
      })
      .end(() => {
        done();
      });
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toNotExist();

      })
      .end(() => {
        done();
      });
  })
});

describe('POST /users', () => {

  it('should create a user', (done) => {
    var email = 'example@example.com';
    var password = '123mnb';
    request(app)
      .post('/users')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        User.findOne({ email })
          .then((user) => {
            expect(user).toExist();
            expect(user.password).toNotBe(password);
            done();
          })
          .catch((err) => done(err));

      });

  });

  it('should return validation errors if request is invalid', (done) => {
    var email = '@example.com';
    var password = '123mnb';
    request(app)
      .post('/users')
      .send({ email, password })
      .expect(400)
      .end((err) => {
        if (err) {
          return done(err);
        }
        done()
      });

  });

  it('should not create user if email is in use', (done) => {
    var password = '123mnb';
    request(app)
      .post('/users')
      .send({ email: users[0].email, password })
      .expect(400)
      .end((err) => {
        if (err) {
          return done(err);
        }
        done()
      });
  });

});

describe('POST /users/login', () => {
  it('should login user and return valid token', (done) => {
    request(app)
      .post('/users/login')
      .send({ email: users[1].email, password: users[1].password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id.toHexString()).then((user) => {
          expect(user.tokens[0]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        })
          .catch((err) => done(err));
      });

  });
  it('should reject invalid login', (done) => {

    request(app)
      .post('/users/login')
      .send({ email: users[1].email, password: users[1].password + 1 })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id.toHexString()).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        })
          .catch((err) => done(err));
      });
  });
});
