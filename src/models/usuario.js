const mongoose = require('mongoose');
const validator = require('validator'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tarea = require('./tarea') 

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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

usuarioSchema.virtual('tareas', {
    ref: 'Tarea',
    localField: '_id',
    foreignField: 'propietario'
});

usuarioSchema.methods.toJSON = function () { //here we hide the user's private data
    const usuario = this;
    const usuarioObject = usuario.toObject();

    delete usuarioObject.password;
    delete usuarioObject.tokens;
    delete usuarioObject.avatar;

    return usuarioObject;
}

usuarioSchema.methods.generateAuthToken = async function () {
    const usuario = this;
    const token = jwt.sign({_id: usuario.id.toString() }, 'thisismynewcourse');
    
    usuario.tokens = usuario.tokens.concat({ token });
    await usuario.save();

    return token;
}

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

//Borra tareas del usuario cuando este es eliminado
usuarioSchema.pre('deleteOne', { document: true }, async function (next) {
    const usuario = this;
    await Tarea.deleteMany({ propietario: usuario._id });
    next();
})

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;