// const { log } = require('console');
const {MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


//Vieja forma de conectar sin el async
// MongoClient.connect(connectionURL, {useNewURLParser: true}, (error,client) =>{
//     if(error){
//         return console.log('No se puede conecta a la base de datos');
        
//     }
//     console.log('conectado');
    
//     const db = client.db(databaseName);

//     db.collection('usuarios').insertOne({
//         nombre: 'Juan',
//         edad: 26
//     })
// })        

async function main() {
    const client = await MongoClient.connect(connectionURL);
    console.log("Se conecto al servidor");

    const db = client.db(databaseName);
    
    // db.collection('usuarios').findOne({ _id: new ObjectId("67574dd8d20c0debe4ae1513") }).then((data) => {
    //   console.log(data);
    // })
    // .catch((error) => console.log(`Error,  fallo en el fetch: ${error}`));
    
    // db.collection('usuarios').find({ edad: 26 }).toArray()
    // .then((data) => {
    //   console.log(data);
    // })
    // .catch((error) => console.log(`Error,  fallo en el fetch: ${error}`));    

    // db.collection('tareas').findOne({ _id: new ObjectId("67683860631b4d1bcf9d2a2a") }).then((data) => {
    //   console.log(data);
    // })
    // .catch((error) => console.log(`Error,  fallo en el fetch: ${error}`));

    // db.collection('tareas').find({ completado: false }).toArray()
    // .then((data) => {
    //   console.log(data);
    // })
    // .catch((error) => console.log(`Error,  fallo en el fetch: ${error}`)); 


    /**Para actualizar */

    // db.collection('usuarios').updateOne({
    //   _id: new ObjectId("67574dd8d20c0debe4ae1513")
    // }, {
    //     $inc:{
    //       edad: 100

    //     }
    // }).then((resultado)=>{
    //   console.log(resultado);

    // }).catch((error) =>{
    //   console.log(error);
    // })

    // db.collection('tareas').updateMany({
    //   completado: false  
    // }, {
    //   $set: {
    //     completado: true
    //   }
    // }).then((resultado)=>{
    //   console.log(resultado.modifiedCount);
    // }).catch((error) => {
    //   console.log(error);
    // })

    /**Para borrar*/

    // db.collection('usuarios').deleteMany({
    //   edad: 18
    // }).then((result)=> {
    //   console.log(result);
    // }).catch((error)=>{
    //   console.log(error)
    // })

    db.collection('tareas').deleteOne({
      descripcion: "limpiar la casa"
    }).then((result)=>{
      console.log(result)
    }).catch((error)=>{
      console.log(error)
    })
}

main().catch(console.error);
