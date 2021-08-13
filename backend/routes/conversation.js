const express = require('express');

const router = express.Router();

const conversationController = require('../controllers/conversation');

//GET ALL BY USERID (TO ME OR BY ME)
router.get('/', conversationController.getAllConversation);

//GET ONE 
router.get('/:id', conversationController.getOneConversation);

//MODIFY ONE
router.put('/modify/:id', conversationController.modifyConversation);

//CREATE ONE
router.post('/new', conversationController.createConversation);

//DELETE ONE
router.delete('/delete/:id', conversationController.deleteConversation);

module.exports = router;