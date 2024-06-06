const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    username: String, 
    password: String, 
    email: String, unique: true,
    name: String,
    cpf: String, unique: true,
    telefone: String, unique: true,
    endereco: String,
    cep: String,
    cidade: String,
})

module.exports = mongoose.model("users", userSchema)