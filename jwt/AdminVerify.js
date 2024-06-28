const jwt = require('jsonwebtoken')

const secretKey = require('../jwt/autentication')


const isAdmin = (req, res, next) => {
    const pegarToken = req.headers['x-access-token'];
    if(!pegarToken){
        return res.status(401).send({auth: false, message: "Você não tem permissão!"})
    }

    try{
        const verifyRole = jwt.verify(pegarToken, secretKey);

        if(verifyRole.role !== 'admin'){
            return res.status(401).send({auth: false, message: "Você não tem a permissão do ADM "})
        }
        next();
    } catch (err){
        return res.status(401).send({auth: false, message: "Token inválido!"})
    }
}

module.exports = isAdmin;
