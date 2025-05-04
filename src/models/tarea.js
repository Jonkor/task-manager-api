const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    completado: {
        type: Boolean,
        default: false
    },
    propietario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    }
}, {
    timestamps: true
});

const Tarea = mongoose.model('Tarea', taskSchema);

module.exports = Tarea;