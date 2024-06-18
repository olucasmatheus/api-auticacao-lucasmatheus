const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {cpfValido} = require('./../../db/validation/validator');
const {emailValido} = require('../validation/validator');
const {senhaForte} = require('../validation/validator');


exports.deleteUser = async (req, res) => {
    try{
        const user = await User.deleteMany({});
        if(!user) res.status(404).send("Nenhum usuário encontrado");
            res.status(200).send("Usuário deletado com sucesso");
        } catch (err) {
            res.status(500).send(err);
    }
}

exports.registerUser = async (req, res) => {
    const { username, password, email, cpf} = req.body;
   
    if(!cpfValido(cpf)){
        return res.status(400).send("CPF inválido");
    }

    if(!emailValido(email)){
        return res.status(400).send("Email inválido");
    }

    if(!senhaForte(password)){
        return res.status(400).send("Senha inválida. Verifique se a senha contém pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
    }

    const usuarioExiste = await User.findOne({email: email, cpf: cpf});
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

        const newUser = new User({ username, password: hash, email, cpf});
        const userSave = await newUser.save();

        // Retornar os campos mencionados
        res.json(userSave);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
}

exports.showUser = async (req, res) => {
    try{
        const users = await User.find({});
        if(!users){
            res.status(404).send("Nenhum usuário encontrado");
        } else{
            res.status(200).send(users);
        }
    } catch (err) {
        res.status(500).send("Erro ao buscar usuários");
}
}

exports.changeUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, secretKey);
        if(decoded.body.username !== req.body.username){
            return res.status(401).send("Você não tem permissão para alterar este usuário");
        }

        const user = await User.findOneAndUpdate({username: req.body.username}, req.body, {new: true});
        res.json(user);
    }
    catch (err) {
        res.status
    }
}
