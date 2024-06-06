const express = require('express');
const logaUsers = require('./../controllers/loginController');
const router = express.Router();

router.post('/login', logaUsers.loginUser);

module.exports = router;
