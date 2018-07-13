const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://todo:todoapp1@ds137661.mlab.com:37661/todoapp'
  };
mongoose.connect(db.mlab || db.localhost);

module.exports={mongoose};