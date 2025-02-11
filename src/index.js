const express = require('express');
require('./db/mongoose');
const Usuario = require('./models/usuario');
const Tarea = require('./models/tarea');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/usuarios', async (req, res) => {
    const usuario = new Usuario(req.body);

    try {
        await usuario.save();
        res.status(201).send(usuario);
    }catch (e) {
        res.status(400).send(e);        
    }    
})

app.get('/usuarios', async (req, res) => {

    try {
        const usuarios = await Usuario.find({});
        res.send(usuarios);
    }catch (e){
        res.status(500).send();
    }
    
})

app.get('/usuarios/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const usuario = await Usuario.findById(_id);
        if (!usuario){
            return res.status(404).send();
        }
        res.send(usuario); 
    }catch (e){
        res.status(500).send();
    }

})

app.post('/tareas', async (req, res) => {
    const tarea = new Tarea(req.body);

    try {
        await tarea.save();
        res.status(201).send(tarea);
    }catch (e){
        res.status(400).send();
    }

})

app.get('/tareas', async (req, res) => {

    try {
        const tareas = await Tarea.find({});
        res.send(tareas);
    }catch (e){
        res.status(500).send();
    }

})

app.get('/tareas/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const tarea = await Tarea.findById(_id);
        if (!tarea){
            return res.status(404).send();
        }
        res.send(tarea);
    } catch (e){
        res.status(500).send();
    }

})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})