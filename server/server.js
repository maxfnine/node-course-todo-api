const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/TodoApp');
var Todo = mongoose.model('Todo',{
    text:{
        type:String
    },
    completed:{
        type:Boolean
    },
    completedAt:{
        type:Number
    }
});

// var todo = new Todo({
//     text:'Cook dinner'
// });

// todo.save().then((result)=>{console.log('Todo',JSON.stringify(result,undefined,2));
// },(err)=>{console.log(err);
// });
var todo = new Todo({
    text:'Done with Mongoose',
    completed:true,
    completedAt:1000
});

todo.save().then((result)=>{console.log('Todo',JSON.stringify(result,undefined,2));
},(err)=>{console.log(err);
});


