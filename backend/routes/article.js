const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
const validation = require('../validation');

//GET ALL
router.get('/', articleController.getAllArticle);

//GET ONE
router.get('/:id', articleController.getOneArticle);

//MODIFY ONE
router.put('/modify/:id', validation.article, articleController.modifyArticle);

//CREATE ONE
router.post('/new', validation.article, articleController.createArticle);

//DELETE ONE
router.delete('/delete/:id', articleController.deleteArticle);

module.exports = router;