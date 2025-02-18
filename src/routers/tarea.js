const express = require('express');
const Tarea = require('../models/tarea');
const router = new express.Router();

router.post('/tareas', async (req, res) => {
    const tarea = new Tarea(req.body);

    try {
        await tarea.save();
        res.status(201).send(tarea);
    }catch (e){
        res.status(400).send(e);
    }

});

router.get('/tareas', async (req, res) => {

    try {
        const tareas = await Tarea.find({});
        res.send(tareas);
    }catch (e){
        res.status(500).send(e);
    }

});

router.get('/tareas/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const tarea = await Tarea.findById(_id);
        if (!tarea){
            return res.status(404).send();
        }
        res.send(tarea);
    } catch (e){
        res.status(500).send(e);
    }

});

router.patch('/tareas/:id', async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['descripcion', 'completado'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(404).send({ error: 'Actualizacion invalida'});
    }

    try{
        const tarea = await Tarea.findById(req.params.id);

        updates.forEach((update) => tarea[update] = req.body[update]);

        await tarea.save();

        if(!tarea){
            return res.status(404).send();
        }
        res.send(tarea);
    }catch (e){
        res.status(500).send(e);
    }
});

router.delete('/tareas/:id', async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndDelete(req.params.id);

        if (!tarea) {
            return res.status(404).send();
        }
        res.send(tarea);
    } catch (e) {
        res.status(500).send(e);    
    }
});

module.exports = router;