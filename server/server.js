const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/TodoApp');
var Todo = mongoose.model('Todo',{
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number
    }
});

var User = mongoose.model('User',{
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    }
});

// var todo = new Todo({
//     text:'Done with Mongoose',
//     completed:true,
//     completedAt:1000
// });

// todo.save().then((result)=>{console.log('Todo',JSON.stringify(result,undefined,2));
// },(err)=>{console.log(err);
// });

var user = new User({
    email:'maxfnine@gmail.com'
});

user.save().then((result)=>{console.log('User',JSON.stringify(result,undefined,2));
},(err)=>{console.log(err);
});


