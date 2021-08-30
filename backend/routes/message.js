const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message');
const validation = require('../validation');
const multer = require('../multer');

//CREATE ONE
router.post('/new', multer, validation.message, messageController.createMessage);

module.exports = router;