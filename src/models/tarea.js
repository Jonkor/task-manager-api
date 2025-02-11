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
    }
})

module.exports = Tarea;