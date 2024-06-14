// const e = require('express'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const secretKey = require('./../../../jwt/autentication');


exports.loginUser = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).send("Preencha todos os campos");
    }

    try {
        const user = await User.findOne({username: username});
        
        if(!user){
            return res.status(404).send("Usuário não encontrado");
        }
        
        const SenhaCorreta = await bcrypt.compare(password, user.password);

        if(!SenhaCorreta){
            return res.status(400).send("Senha incorreta");
        }
        // Gerar token de autenticação
        if(user && SenhaCorreta){
            const tokenAutenticacao = jwt.sign(
                {
                userId: user._id,
                },
                secretKey,
                {
                    expiresIn: 300,
                }
            );
            res.json({
            message: `Autenticado como ${username}!`,
            auth: true,
            tokenAutenticacao
            })
        }

        return true;
    } catch (err) {
        return res.status(403).json({message: "Erro ao autenticar. Usuário ou senha incorreta."});
    }
}