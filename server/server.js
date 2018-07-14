require('./config/config.js');
const _=require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos }).status(200);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  }
  else {
    Todo.findById(id).then((result) => {
      if (result) {
        res.status(200).send({ todo: result });
      }
      else {
        res.status(404).send(result);
      }

    }).catch((err) => {
      res.status(400).send();
    })
  }

});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  }
  else{
    Todo.findByIdAndRemove(id).then((result)=>{
      if(result)
      {
        return res.status(200).send({todo:result});
      }
      else{
        return res.status(404).send();
      }
    }).catch((err)=>{
      return res.status(400).send(err);
    })
  }
});

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);

  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  }
   if(_.isBoolean(body.completed) && body.completed)
   {
     body.completedAt = new Date().getTime();
   }
   else
   {
     body.completed = false;
     body.completedAt = null;
   }

   Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((result)=>{
     if(result)
     {
       return res.status(200).send({todo:result});
     }

   })
   .catch((err)=>{
    return res.status(400).send(err);
   })



})



app.listen(port, () => {
  console.log(`Started on port ${port}`);
});



module.exports = { app };