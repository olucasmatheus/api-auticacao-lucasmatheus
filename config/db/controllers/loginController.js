const e = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const validator = require('validator');
const secretKey = require('./../../../jwt/autentication');
const {cpfValido} = require('./../../db/validation/validator');

exports.loginUser = async (req, res) => {
    const {cpf, password} = req.body;

    if(!cpfValido(cpf)){
        return res.status(400).send("CPF inválido");
    }

    try {
        const user = await User.findOne({cpf: cpf});
        
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
            message: `Autenticado como ${cpf}!`,
            auth: true,
            tokenAutenticacao
            })
        }

        return true;
    } catch (err) {
        return res.status(403).json({message: "Erro ao autenticar. Senha ou CPF incorretos."});
    }
}