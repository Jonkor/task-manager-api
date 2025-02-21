const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismynewcourse');        
        const usuario = await Usuario.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!usuario) {
            throw new Error();
        }
        
        req.usuario = usuario;
        next();
    } catch(e){
        res.status(401).send({error: 'Favor de autentificar'});
    }
}

module.exports = auth;