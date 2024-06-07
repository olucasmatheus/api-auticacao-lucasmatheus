const express = require('express');
const CadastraUsers = require('../controllers/registerController');
const router = express.Router();

router.post('/register', CadastraUsers.registerUser);

module.exports = router;