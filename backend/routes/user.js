const express = require('express');

const router = express.Router();

const validation = require('../validation');
const userController = require('../controllers/user');

//GET ALL BY USERID (TO ME OR BY ME)
//router.get('/', messageController.getAllMessage);

//GET ONE 
router.get('/:id', userController.getOneUser);

//CREATE ONE 
router.post('/new', validation.createUser, userController.createUser);

//MODIFY ONE
//router.put('/modify/:id', messageController.modifyMessage);

//CREATE ONE
//router.post('/new', messageController.createMessage);

//DELETE ONE
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;