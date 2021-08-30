const db = require('../database');
const { validationResult } = require('express-validator/check');
const articleController = require('../controllers/article');
const jwt = require('jsonwebtoken');
const { promises: fs } = require("fs");


// CHEKC IF USER IS THE SAME
exports.getOneUser = async (req, res, next) => {
    let id_user = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let idUser = decodedToken.idUser;
    if (idUser == id_user) {
        try {
            const response = await db.promise().query(`SELECT email FROM users WHERE id = ${idUser}`);
            res.status(200).send(response[0]);
        }
        catch {
            res.status(400).json("Une erreur est survenue");
        }
    } else {
        res.status(400).json("Une erreur est survenue");
    }
};

// CHECK SAME USER
exports.deleteUser = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let idUser = decodedToken.idUser;
    id_user = req.params.id;

    if (idUser == id_user) {
        try {
            // DELETE ARTICLE
            const articles = await db.promise().query(`SELECT * FROM articles WHERE id_user = ${idUser}`);
            for (let article of articles[0]) {
                try {
                        await db.promise().query(`DELETE FROM comments WHERE id_article = ${article.id}`);
                    try{
                        await db.promise().query(`DELETE FROM articles WHERE id_user = ${idUser}`);
                    }
                    catch {
                        res.status(400).json("delete article");
                    }
                }
                catch {
                    res.status(400).json("Delete comms");
                }
            }
        }
        catch {
            res.status(400).json("select user");
        }
    
            // DELETE POST
            // delete all images and delete reactions
            
            const posts = await db.promise().query(`SELECT * FROM posts WHERE id_user = ${idUser}`);
            for (let post of posts[0]) {
                urlImgPost = post.url_img;
                var filenamePost = urlImgPost.split('/images/')[1];
                try {
                    fs.unlink(`images/${filenamePost}`);
                    try {
                        await db.promise().query(`DELETE FROM posts WHERE id = ${id}`);
                        try {
                            let reactionImg = await db.promise().query(`SELECT url_img FROM reactions WHERE id_post = ${id}`);
                            if(reactionImg[0].length != 0) {
                                try {
                                    await db.promise().query(`DELETE FROM reactions WHERE id_post = ${id}`);
                                    reactionImg = reactionImg[0];
                                    for (let img of reactionImg) {
                                        reactionImg = img.url_img;
                                        var reactionFilename = reactionImg.split('/images/')[1];
                                        try {
                                            fs.unlink(`images/${reactionFilename}`);
                                        }
                                        catch{
                                            res.status(400).json("a");
                                        }
                                    }
                                }
                                catch {
                                    res.status(400).json("b");
                                }
                            }
                        }
                        catch {
                            res.status(400).json("c");
                        }
                    }
                    catch  {
                        res.status(400).json("d");
                    }
                }
                catch  {
                    res.status(400).json("e");
                }
            }

            // DELETE CONV
            // delete img and message 
            const conversations = await db.promise().query(`SELECT * FROM conversations WHERE id_user_by = ${idUser} OR id_user_to = ${idUser} ORDER BY id DESC` );
            for (let conversation of conversations[0]) {
                try {
                    const messages = await db.promise().query(`SELECT * FROM messages WHERE id_conversation = ${conversation.id}`);
                    for (let message of messages[0]) {
                        urlImgMessage = message.url_img;
                        var filenameMessage = urlImgMessage.split('/images/')[1];
                        try {
                            fs.unlink(`images/${filenameMessage}`);
                            try {
                                await db.promise().query(`DELETE FROM messages WHERE id = ${message.id}`);
                            } catch {
                                res.status(400).json("delte tmessahe");
                            }
                        } catch {
                            res.status(400).json("img message");
                        }
                    }
                    try{
                        const response = await db.promise().query(`DELETE FROM conversations WHERE id = ${conversation.id}`);
                    }
                    catch {
                        res.status(400).json("delete conversation");
                    } 
                } catch {
                    res.status(400).json("select message");
                }
            }
    } else {
        res.status(400).json("not same user");
    }
    // DELETE USER
    try {
        const response = await db.promise().query(`DELETE FROM users WHERE id = ${idUser}`);
        res.status(200).json("Utilisateur supprimé");
    } catch {
        res.status(400).json("delete user");
    }
}