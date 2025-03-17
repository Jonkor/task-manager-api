const mongoose = require('mongoose');

const Tarea = mongoose.model('Tarea', {
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
})

module.exports = Tarea;