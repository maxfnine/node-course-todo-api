const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err)
    {
        return  console.log('Unable to connect to mongoDB server');
       
    }
    console.log('Connected to mongoDB server');
    // const db = client.db('TodosApp');
    // db.collection('Todos').insertOne({
    //    text:'Something todo',
    //    completed:false 
    // },(err,result)=>{
    //    if(err){
    //        return console.log('unable to insert todo',err);    
    //    } 
    //    console.log(JSON.stringify(result.ops,undefined,2));
       
    // })
    const db = client.db('Users');
    db.collection('Users').insertOne({
       name:'Arkadiy',
       age:36,
       location:'Israel'
    },(err,result)=>{
       if(err){
           return console.log('unable to insert user',err);    
       } 
       console.log(JSON.stringify(result.ops,undefined,2));
       console.log(result.ops[0]._id.getTimestamp());
       
       
    })
    
    client.close();
});