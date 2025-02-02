const express = require('express');
require('./db/mongoose');
const Usuario = require('./models/usuario');
const Tarea = require('./models/tarea');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/usuarios', (req, res) => {
    const usuario = new Usuario(req.body);

    usuario.save().then(() => {
        res.status(201).send(usuario);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.post('/tareas', (req, res) => {
    const tarea = new Tarea(req.body);

    tarea.save().then(() =>{
        res.status(201).send(tarea);        
    }).catch((error) => {
        res.status(400).send(error);
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})