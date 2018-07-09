const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err)
    {
        return  console.log('Unable to connect to mongoDB server');
    }
    
    const db = client.db('TodosApp');
    
    //deleteMany
    //db.collection('Todos').deleteMany({text:'Solve all issues'}).then((result)=>{console.log(result);});
    

    
    //deleteOne
    //db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{console.log(result);});
   

    //findOneAndDelete
    //db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{console.log(result);});
    
    client.close();
});