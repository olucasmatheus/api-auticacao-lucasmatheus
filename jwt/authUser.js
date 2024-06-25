const jwt = require('jsonwebtoken')
const secretKey = require('../jwt/autentication')

function checkToken(userId){
    return jwt.sign(
        {
            userId: user._id,
        },
        secretKey,
        {
            expiresIn: 300,
        }
    )
}

module.exports = checkToken;