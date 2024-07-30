const jwt = require('jsonwebtoken')
const secretKey = require('../jwt/autentication')

function gerarToken(userId) {
    return jwt.sign(
        {
            userId: userId,
        },
        secretKey,
        {
            expiresIn: 300,
        }
    )
}

module.exports = gerarToken;