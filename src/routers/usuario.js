const express = require('express');
const Usuario = require('../models/usuario');
const router = new express.Router();

router.post('/usuarios', async (req, res) => {
    const usuario = new Usuario(req.body);

    try {
        await usuario.save();
        res.status(201).send(usuario);
    }catch (e) {
        res.status(400).send(e);        
    }    
});

router.post('/usuarios/login', async (req, res) => {
    try {
        const usuario = await Usuario.findByCredentials(req.body.email, req.body.password);
        res.send(usuario);
    } catch (e) {
        res.status(400).send();
    }
});

router.get('/usuarios', async (req, res) => {

    try {
        const usuarios = await Usuario.find({});
        res.send(usuarios);
    }catch (e){
        res.status(500).send();
    }
    
});

router.get('/usuarios/:id', async (req, res) => {
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

});

router.patch('/usuarios/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ['nombre', 'email', 'edad', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({ error: 'Actualizacion invalida'});
    }

    try {
        const usuario = await Usuario.findById(req.params.id);

        updates.forEach((update) => usuario[update] = req.body[update]);

        await usuario.save();
        
        if (!usuario){
            return res.status(404).send();
        }

        res.send(usuario);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/usuarios/:id', async (req,res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuario) {
            return res.status(404).send();
        }

        res.send(usuario);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;