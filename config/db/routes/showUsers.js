const express = require('express');
const MostraUsers = require('../controllers/registerController');
const router = express.Router();

router.get('/', MostraUsers.showUser);

module.exports = router;