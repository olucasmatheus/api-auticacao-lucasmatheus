const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.deleteUser = async (req, res) => {
    try{
        const user = await User.findOneAndDelete({username: req.body.username});
        if(!user) res.status(404).send("Nenhum email encontrado");
            res.status(200).send("Usuário deletado com sucesso");
        } catch (error) {
            res.status(500).send(err);
    }
}

exports.registerUser = async (req, res) => {
    const { username, password, email, cpf, telefone } = req.body;

    try {
        const hash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, password: hash, email, cpf, telefone});
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
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(user);
    }
    catch (err) {
        res.status
    }
}
