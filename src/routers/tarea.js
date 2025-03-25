const express = require('express');
const Tarea = require('../models/tarea');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tareas', auth, async (req, res) => {
    const tarea = new Tarea({
        ...req.body, //spread operator copies all properties of body to this object
        propietario: req.usuario._id
    }); 

    try {
        await tarea.save();
        res.status(201).send(tarea);
    }catch (e){
        res.status(400).send(e);
    }

});

router.get('/tareas', auth, async (req, res) => {
    const match = {};

    if (req.query.completado) {
        match.completado = req.query.completado === 'true';
    }

    try {
        await req.usuario.populate({
            path: 'tareas',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        });
        res.send(req.usuario.tareas);
    }catch (e){
        res.status(500).send(e);
    }

});

router.get('/tareas/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const tarea = await Tarea.findOne({ _id, propietario: req.usuario._id });

        if (!tarea) {
            return res.status(404).send();
        }

        res.send(tarea);
    } catch (e){
        res.status(500).send(e);
    }

});

router.patch('/tareas/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body); //array of strings
    const allowedUpdates = ['descripcion', 'completado'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(404).send({ error: 'Actualizacion invalida'});
    }

    try{
        const tarea = await Tarea.findOne({ _id: req.params.id, propietario: req.usuario._id });
        
        if(!tarea){
            return res.status(404).send();
        }

        updates.forEach((update) => tarea[update] = req.body[update]);
        await tarea.save();
        res.send(tarea);
    }catch (e){
        res.status(500).send(e);
    }
});

router.delete('/tareas/:id', auth, async (req, res) => {
    try {
        const tarea = await Tarea.findOneAndDelete({ _id: req.params.id, propietario: req.usuario._id });

        if (!tarea) {
            return res.status(404).send();
        }
        res.send(tarea);
    } catch (e) {
        res.status(500).send(e);    
    }
});

module.exports = router;