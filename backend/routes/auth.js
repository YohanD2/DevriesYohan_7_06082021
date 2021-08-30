const express = require('express');
const router = express.Router();
const validation = require('../validation');
const authController = require('../controllers/auth');

//LOGIN
router.post('/login', validation.loginUser, authController.login);

//SIGNUP
router.post('/signup', validation.createUser, authController.signup);

module.exports = router;