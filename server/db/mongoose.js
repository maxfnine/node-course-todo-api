const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// let db = {
//     localhost: 'process.env.MONGODB_URI',
//     mlab: 'mongodb://todo:todoapp1@ds137661.mlab.com:37661/todoapp'
//   };
mongoose.connect(process.env.MONGODB_URI || 'mongodb://todo:todoapp1@ds137661.mlab.com:37661/todoapp');

module.exports={mongoose};