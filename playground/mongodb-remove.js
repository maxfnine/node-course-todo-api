const {ObjectID}=require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} =require('./../server/models/user');

//remove
// Todo.remove({}).then((result)=>{
//     console.log(result);   
// })

//findOneAndRemove
// Todo.findOneAndRemove({_id:new ObjectID('5b48c612113eda98629093ea')}).then((result)=>{
//     console.log(result);
    
// });

//findByIDAndRemove
// Todo.findByIdAndRemove('5b48c517113eda9862908efa').then((result)=>{
//     console.log(result);
    
// });

