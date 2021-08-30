const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const validation = require('../validation');

//CREATE ONE
router.post('/new/:id', validation.comment, commentController.createComment);

module.exports = router;