const jwt = require('jsonwebtoken')
const secretKey = require('../jwt/autentication')
const User = require('../config/db/models/User')

const tokenVerificado = async (req, res, next) => {
    try{
        
        const token = req.headers['x-access-token'];

        if(!token){
            return res.status(403).json({auth: false, message: 'Token não fornecido'});
        }
        //verifica e decodifica o token
        const decoded = jwt.verify(token, secretKey);

        //atribui o userId decodificado pra request
        req.userId = decoded.userId;

        //busca o usuário pelo ID decodificado
        const user = await User.findByPk(req.userId);

        //verifica se o usuário existe
        if(!user){
            return res.status(404).json({auth:false, message: 'Usuário não encontrado'});
        }

        //Armazena o usuário na request
        req.user = user;
        next();
    } catch(err){
        console.log('Erro ao verificar token:', err);
        return res.status(500).json({auth: false, message: 'Falha na autenticação do token'});
    }
};

module.exports = tokenVerificado;