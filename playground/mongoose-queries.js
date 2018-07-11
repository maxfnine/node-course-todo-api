const {ObjectID}=require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} =require('./../server/models/user');

 var id='5b4494d58b808825b0ad284e';
// if(!ObjectID.isValid(id))
// {
//     console.log('Not Valid ObjectID',id);
// }
// else
// {  
// Todo.find({_id:id}).then((result)=>{
//     console.log('Todos',result);
    
// }).catch((err)=>{
//     console.log(err);
    
// });

// Todo.findOne({_id:id}).then((result)=>{
//     console.log('Todos',result);
    
// }).catch((err)=>{
//     console.log(err);
    
// });

// Todo.findById(id).then((result)=>{
//     if(!result)
//     {
//         return console.log('Id not found');
        
//     }
//     console.log('Todos',result);
    
// }).catch((err)=>{
//     console.log(err);
    
// });
// }

User.findById(id).then((result)=>{
    if(!result)
    {
        return console.log('Unable to retrieve user for id',id);
    }
    console.log(JSON.stringify(result,undefined,2));
    
}).catch((err)=>{
    console.log('Error :',err);
    
});



