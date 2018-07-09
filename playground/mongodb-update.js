const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err)
    {
        return  console.log('Unable to connect to mongoDB server');
    }
    
    
// const db = client.db('Users');
// db.collection('Users').findOneAndUpdate({_id:new ObjectID("5b43ab828c5e275242e72d8e")}
// ,{
// $inc:{
//     age:10
// },
// $set:{
//     name:'Arkadiy',
//     lolcation:'Israel'
// }
// },{
// returnOriginal:false
// }).then((result)=>{console.log(result);});

   
    
    client.close();
});