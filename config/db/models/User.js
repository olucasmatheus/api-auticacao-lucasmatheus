const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    username: String, 
    password: String, 
    email: {type: String, unique: true},
    name: String,
    cpf: {type: String, unique: true},
    telefone: {type: String, unique: true},
    endereco: String,
    cep: String,
    cidade: String,
})

module.exports = mongoose.model("users", userSchema)