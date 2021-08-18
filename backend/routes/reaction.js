const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reaction');
const validation = require('../validation');
const multer = require('../multer');

//GET ALL
//router.get('/', postController.getAllPost);

//GET ONE
//router.get('/:id', postController.getOnePost);

//MODIFY ONE
//router.put('/modify/:id', postController.modifyPost);

//CREATE ONE
router.post('/new/:id', multer, reactionController.createReaction);

//DELETE ONE
//router.delete('/delete/:id', postController.deletePost);

module.exports = router;