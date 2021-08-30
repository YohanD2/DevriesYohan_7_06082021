const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

//GET ONE 
router.get('/:id', userController.getOneUser);

//DELETE ONE
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;