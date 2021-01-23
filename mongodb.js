// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const connectionURL ='mongodb://127.0.0.1:27.017';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{
  if(error){
    return console.log('No se pudo conectar');
  }

  console.log('Se conecto');

  const db= client.db(databaseName);

  // db.collection('users').findOne({ _id: new ObjectID("5f3ae70d3c5756422f323766") }, (error, user)=>{
  //   if(error){
  //     return console.log('Unable to fetch');
  //   }
  //
  //   //console.log(user);
  // })
  //
  // db.collection('users').find({ age: 21}).toArray((error, users) =>{
  //   console.log(users);
  // })
  //
  // db.collection('users').find({ age: 21}).count((error, users) =>{
  //   console.log(users);
  // })

  // db.collection('tasks').findOne({ _id: new ObjectID("5f3ade12bb0ba03f08de8262")}, (error, tasks) =>{
  //   console.log(tasks);
  // })
  //
  // db.collection('tasks').find({ completed: false}).toArray((error, tasks) =>{
  //   console.log(tasks);
  // })

  // db.collection('users').updateOne({
  //   _id: new ObjectID("5f3ad9f9abce6b3dd334d8a3")
  // }, {
  //   $inc: {
  //     age: 1
  //   }
  // }).then((result)=>{
  //   console.log(result);
  // }).catch((error)=>{
  //   console.log(error);
  // })

  // db.collection('tasks').updateMany({
  //   completed: true
  //
  // }, {
  //   $set: {
  //     completed: false
  //   }
  // }).then((result)=>{
  //   console.log(result);
  // }).catch((error)=>{
  //   console.log(error);
  // })

  // db.collection('users').deleteMany({
  //   age: 22
  // }).then((result)=>{
  //   console.log(result);
  // }).catch((error)=>{
  //   console.log(error);
  // })

  db.collection('tasks').deleteOne({
    description: "Hola"
  }).then((result)=>{
    console.log(result);
  }).catch((error)=>{
    console.log(error);
  })
});
