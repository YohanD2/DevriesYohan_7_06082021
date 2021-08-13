const express = require('express');

const router = express.Router();
const commentController = require('../controllers/comment');
const validation = require('../validation');


//GET ALL BY ID_ARTCILE
router.get('/', commentController.getAllComment);

//CREATE ONE
router.post('/new/:id', validation.comment, commentController.createComment);

module.exports = router;