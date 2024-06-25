const jwt = require('jsonwebtoken')
const secretKey = require('../jwt/autentication')

const tokenVerificado = (req, res, next) => {
    const token = req.header['x-access-token'];

    if(!token) return res.status(403).send({auth: false, message: 'Token não fornecido'});

    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) return res.status(500).send({auth: false, message: 'Falha na autenticação do token'});

        req.userId = decoded.userId;
        next();


    })
}

module.exports = tokenVerificado;