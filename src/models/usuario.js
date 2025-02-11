const mongoose = require('mongoose');
const validator = require('validator'); 

const Usuario = mongoose.model('Usuario', {
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email es invalido');
            }
        }
    },
    edad: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Edad deber ser un numero positivo');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,       
        minLength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('no se puede poner password como contrasena');
            }
        }
    }
})

module.exports = Usuario;