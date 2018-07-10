const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
var {text,completed,completedAt}=req.body;
var todo = new Todo({text,completed,completedAt});
todo.save().then((result)=>{
    res.send(result);
},(err)=>{
    res.status(400).send(err);
});

});



app.listen(3000,()=>{
    console.log('Listening on port 3000');
    
});





