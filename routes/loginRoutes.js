const express = require('express');
const loginController = require('../controllers/loginController.js');
const router = express.Router();


router.route('/').post(loginController);

module.exports = router;