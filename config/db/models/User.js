const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    username: {
        type: String, required: [true, "Nome de usuário é obrigatório"],
        unique: [true, "Nome de usuário já cadastrado"]
    }, 
    password: {
        type: String, required: [true, "Senha é obrigatória"]
    }, 
    email: {
        type: String, unique: [true, "Email já cadastrado"],
        required: [true, "Email é obrigatório"]
},
    name: String,
    cpf: {
        type: String, unique: [true, "CPF já cadastrado"]
    },
    telefone: String,
    endereco: String,
    cep: String,
    cidade: String,
})

module.exports = mongoose.model("users", userSchema)