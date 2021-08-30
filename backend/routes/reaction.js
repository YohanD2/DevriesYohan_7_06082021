const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reaction');
const multer = require('../multer');

//CREATE ONE
router.post('/new/:id', multer, reactionController.createReaction);

module.exports = router;