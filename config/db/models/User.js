const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    username: String, 
    password: String, 
    email: {type: String, unique: [true, "Email já cadastrado"]},
    name: String,
    cpf: {type: String, unique: [true, "CPF já cadastrado"]},
    telefone: {type: String, unique: [true, "Telefone já cadastrado"]},
    endereco: String,
    cep: String,
    cidade: String,
})

module.exports = mongoose.model("users", userSchema)