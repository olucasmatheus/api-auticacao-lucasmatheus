const express = require('express');
const deletaUsuarios = require('./../../db/controllers/registerController');
const router = express.Router();

router.delete('/', deletaUsuarios.deleteUser);

module.exports = router;
