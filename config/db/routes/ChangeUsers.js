const express = require('express');
const AlteraUser = require('../controllers/registerController');
const router = express.Router();

router.patch('/', AlteraUser.changeUser);

module.exports = router;