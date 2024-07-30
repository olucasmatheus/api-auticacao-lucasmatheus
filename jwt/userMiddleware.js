const jwt = require('jsonwebtoken')
const secretKey = require('../jwt/autentication')
const User = require('../config/db/models/User')

const tokenVerificado = (req, res, next) => {
    const token = req.headers['x-access-token'];
    
    console.log(token)
    if(token.length == 0) return res.status(403).send({auth: false, message: 'Token não fornecido'});

    jwt.verify(token, secretKey, async(err, decoded) => {
        if(err) return res.status(500).send({auth: false, message: 'Falha ao autenticar token'});

        req.userId = decoded.userId;
        const id = req.userId
        console.log(id)
        const findUser = await User.findById(id)
        console.log(findUser)
        next();
    });
}

module.exports = tokenVerificado;