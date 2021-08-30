const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation');

//GET ALL
router.get('/user/:id', conversationController.getAllConversation);

//GET ONE 
router.get('/:id', conversationController.getOneConversation);

//CREATE ONE
router.post('/new', conversationController.createConversation);

//DELETE ONE
router.delete('/delete/:id', conversationController.deleteConversation);

module.exports = router;