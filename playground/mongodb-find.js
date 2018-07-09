const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err)
    {
        return  console.log('Unable to connect to mongoDB server');
    }
    const db = client.db('TodosApp');
    db.collection('Todos').find({text:'Something todo'}).toArray().then((docs)=>{
        console.log('Todos',JSON.stringify(docs,undefined,2));
     },(err)=>{
        console.log('Unable to fetch data',err);    
    });

   
    
    client.close();
});