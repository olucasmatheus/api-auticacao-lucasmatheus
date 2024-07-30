const jwt = require('jsonwebtoken')
const User = require('../config/db/models/User')
const secretKey = require('../jwt/autentication')


const isAdmin = async (req, res, next) => {
    const pegarToken = req.headers['x-access-token'];
    if(!pegarToken){
        return res.status(401).send({auth: false, message: "Você não tem permissão!"})
    }

    try{
        const verifyRole = jwt.verify(pegarToken, secretKey);
        const id = verifyRole.userId;
        const findUser = await User.findById(id);
        console.log(findUser);
        console.log(findUser.role)
        if(findUser.role != 'admin'){
            return res.status(401).send({auth: false, message: "Você não tem a permissão do ADM "})
        }
        next();
    } catch (err){
        return res.status(401).send({auth: false, message: "Token inválido!"})
    }
}

module.exports = isAdmin;