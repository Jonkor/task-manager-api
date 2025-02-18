const mongoose = require('mongoose');
const validator = require('validator'); 
const bcrypt = require('bcryptjs'); 

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
});

usuarioSchema.statics.findByCredentials = async (email, password) => {
    const usuario = await Usuario.findOne({ email: email });

    if (!usuario){
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, usuario.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return usuario;
}

//Debe ser una funciona normal y no flecha, realiza hash antes de guardar la contrasena
usuarioSchema.pre('save', async function (next) {
    const usuario = this ;

    if(usuario.isModified('password')) {
        usuario.password = await bcrypt.hash(usuario.password, 8);
    }
    next();
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;