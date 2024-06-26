const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController')

const tokenAutorizado = require('../../../jwt/userMiddleware')

router
    .post('/users', usuarioController.registerUser)
    .post('/users/login', usuarioController.loginUser)
    .get('/users', tokenAutorizado, usuarioController.showUser)
    .patch('/users', tokenAutorizado, usuarioController.changeUser)
    .delete('/users', tokenAutorizado, usuarioController.deleteUser)


module.exports = router;