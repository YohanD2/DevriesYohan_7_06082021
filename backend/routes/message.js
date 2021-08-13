const express = require('express');

const router = express.Router();

const messageController = require('../controllers/message');

const validation = require('../validation');

const multer = require('../multer');


//GET ALL BY USERID (TO ME OR BY ME)
router.get('/', messageController.getAllMessage);

//GET ONE 
//router.get('/:id', messageController.getOneMessage);

//MODIFY ONE
//router.put('/modify/:id', messageController.modifyMessage);

//CREATE ONE
router.post('/new', multer, validation.message, messageController.createMessage);

//DELETE ONE
//router.delete('/delete/:id', messageController.deleteMessage);

module.exports = router;