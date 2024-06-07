const express = require('require');
const AlteraUser = require('../controllers/registerController');
const router = express.Router();

router.patch('/users/:id', AlteraUser.changeUser);

module.exports = router;