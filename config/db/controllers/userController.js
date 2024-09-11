const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secretKey = require('../../../jwt/autentication');
const saltRounds = 10;
const {cpfValido} = require('./../../db/validation/validator');
const {emailValido} = require('../validation/validator');
const {senhaForte} = require('../validation/validator');
const gerarToken = require('../../../jwt/authUser')


exports.loginUser = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).send("Preencha todos os campos");
    }

    try {
        const user = await User.findOne({where: {username: username}});
        
        if(!user){
            return res.status(404).send("Usuário não encontrado");
        }
        
        const SenhaCorreta = await bcrypt.compare(password, user.password);

        if(!SenhaCorreta){
            return res.status(400).send("Senha incorreta");
        }
        // Gerar token de autenticação
        if(user && SenhaCorreta){
            const tokenAutenticacao = gerarToken(user._id);
            res.json({
            message: `Autenticado como ${username}!`,
            auth: true,
            tokenAutenticacao
            })
        }

        return true;
    } catch (err) {
        console.error("Erro ao autenticar:", err); // Logar erro no console
        res.status(500).send("Erro ao autenticar usuário"); // Enviar mensagem de erro
    }
}

exports.deleteUser = async (req, res) => {
    try {
        console.log("1")
        const resultado = await User.destroy({where: {username: req.body.username}});
        console.log("2")
        res.status(200).send("Usuário deletado");
    } catch (err) {
        res.status(500).send("Erro ao deletar usuário");
    }
}

exports.registerUser = async (req, res) => {
    const { username, password, email, cpf, role} = req.body;
   
    if(!cpfValido(cpf)){
        return res.status(400).send("CPF inválido");
    }

    if(!emailValido(email)){
        return res.status(400).send("Email inválido");
    }

    if(!senhaForte(password)){
        return res.status(400).send("Senha inválida. Verifique se a senha contém pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
    }


    const usuarioExiste = await User.findOne({
        where: {email: email, cpf: cpf, role:role}
    });
    try {
        if(usuarioExiste){
            return res.status(400).send("Usuário já existe");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar usuário");
    }

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        let role = 'user';
        if(username == 'adminUserLucas'){
            role = 'admin'
        }
        const newUser = new User({ username, password: hash, email, cpf, role});
        const userSave = await newUser.save();

        // Retornar os campos mencionados
        res.json(userSave);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
}

exports.showUser = async (req, res) => {
    try {
        const users = await User.findAll({});
        if(users.length === 0){
            return res.status(404).send("Nenhum usuário encontrado");
        } else {
            res.json(users);
        }
    } catch (err) {
        res.status(500).send("Erro ao buscar usuários");
    }
}

exports.changeUser = async (req, res) => {
    try{
        const resultado = await User.update(updates, {
            where: {username: username}
        });

        if(updateRows === 0){
            return res.status(404).send("Usuário não encontrado")
        }
        res.status(200).send("Informações atualizadas")
    } catch (err){
        res.status(500).send("Erro ao atualizar informações")
    }
}