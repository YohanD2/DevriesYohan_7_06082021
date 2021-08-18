const db = require('../database');
const { validationResult } = require('express-validator/check');
const articleController = require('../controllers/article');
const jwt = require('jsonwebtoken');


// USELESS OCNTROLLER
exports.getOneUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        let id = decodedToken.idUser;
        
        const response = await db.promise().query(`SELECT email FROM users WHERE id = ${id}`);
        res.status(200).send(response[0]);
    }
    catch (err) {
        console.log(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        let idUser = decodedToken.idUser;

        const articles = await db.promise().query(`SELECT * FROM articles WHERE id_user = ${idUser}`);
        for (let article of articles[0]) {
            try {
                const response = await db.promise().query(`DELETE FROM comments WHERE id_article = ${article.id}`);
                try{
                    const response = await db.promise().query(`DELETE FROM articles WHERE id_user = ${idUser}`);


                    //res.status(201).send(response[0]);
                }
                catch(err) {
                    res.status(400).json("Une erreur est survenue");
                }
            }
            catch(err) {
                console.log(err);
            }
        }

        const conversations = await db.promise().query(`SELECT * FROM conversations WHERE id_user_by = ${idUser} OR id_user_to = ${idUser} ORDER BY id DESC` );
        for (let conversation of conversations[0]) {
            try {
                const response = await db.promise().query(`DELETE FROM messages WHERE id_conversation = ${conversation.id}`);
                try{
                    const response = await db.promise().query(`DELETE FROM conversations WHERE id = ${conversation.id}`);
                    //res.status(201).send("Compte supprimé");
                }
                catch(err) {
                    res.status(400).json("Une erreur est survenue");
                } 
            }
            catch(err) {
                console.log(err);
            }
        }

        try {
            const response = await db.promise().query(`DELETE FROM users WHERE id = ${idUser}`);
        } catch(err) {
            console.log(err);
        }
        res.status(201).json("Utilisateur supprimé");
    }
    catch (err) {
        console.log(err);
    }
}