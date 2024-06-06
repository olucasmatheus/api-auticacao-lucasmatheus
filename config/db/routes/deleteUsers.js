const express = require('express');
const deletaUsuarios = require('./../../db/controllers/registerController');
const router = express.Router();

router.delete('/users/:id', deletaUsuarios.deleteUser);

module.exports = router;
