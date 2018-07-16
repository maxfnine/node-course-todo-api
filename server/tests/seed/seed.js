const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');

const todos=[
    {text:'First test todo',_id: new ObjectID()},
    {text:'Second test todo',_id: new ObjectID(),completed:false,completedAt:123456}
];

const userOneID= new ObjectID();
const userTwoID= new ObjectID();

const users = [{
_id:userOneID,
email:'user1@pass.com',
password:'user1pass',
tokens:[{
    access:'auth',
    token:jwt.sign({_id:userOneID,access:'auth'},'abc123').toString()
}]
},
{
    _id:userTwoID,
    email:'user2@pass.com',
    password:'user2pass'
}];

const populateTodos = (done)=>{
    Todo.remove({}).then(()=>{
     return Todo.insertMany(todos);
    })
    .then(()=>{
      done();
    });
  };

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo])
    })
        .then(() => {
            done();
        })
};

  module.exports={
      todos,
      populateTodos,
      users,
      populateUsers
  }