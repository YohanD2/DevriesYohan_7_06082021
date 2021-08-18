const db = require('../database');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const { promises: fs } = require("fs");

exports.getAllPost = async (req, res, next) => {
    try {
        var posts = await db.promise().query(`SELECT * FROM posts`);
        posts = posts[0];
        
        for(let post of posts) {
            try {
                var email = await db.promise().query(`SELECT email FROM users WHERE id = ${post.id_user}`);
                email = email[0][0].email;
                post.email = email;
            }
            catch(err) {
                console.log(err);
            }

            try {
                let nbReaction = await db.promise().query(`SELECT COUNT(*) AS nbReaction FROM reactions WHERE id_post = ${post.id}`);

                nbReaction = nbReaction[0][0].nbReaction;
                post.nbReaction = nbReaction;
            }
            catch(err) {
                console.log(err);
            }
        }
       
        res.status(200).send(posts);
    }
    catch (err) {
        console.log(err);
        
    }
};

// TRAITER L ERREUR
exports.getOnePost = async (req, res, next) => {

    let idPost = req.params.id
    try {
        var post = await db.promise().query(`SELECT * FROM posts WHERE id = ${idPost}`);
        post = post[0];
        try{
            var reactions = await db.promise().query(`SELECT * FROM reactions WHERE id_post = ${idPost}`);
            reactions = reactions[0];

            for(let reaction of reactions) {
                var email = await db.promise().query(`SELECT email FROM users WHERE id = ${reaction.id_user}`);
                reaction.email = email[0][0].email;
            }
            const response = {
                post,
                reactions
            }
            res.status(200).send(response);
        }
        catch (err) {
            console.log(err);
        }
    }
    catch(err) {
        console.log(err);
    }
};

// TRAITER L ERREUR
exports.modifyPost = async (req, res, next) => {
    let idPost = req.params.id;
    if(req.file != undefined) {
        try {
            var urlImg = await db.promise().query(`SELECT url_img FROM posts WHERE id = ${id}`);
            urlImg = urlImg[0][0].url_img;
            var filename = urlImg.split('/images/')[1];
            try {
                fs.unlink(`images/${filename}`);
                try {
                    let post = req.body.content;
                    post = JSON.parse(post);
                    let title = post.title;
                    var urlImg = req.protocol + "://" + req.get('host') + "/images/" + req.file.filename;
                    await db.promise().query(`UPDATE posts SET title = '${title}', content = '${urlImg}' WHERE id = ${idPost}`);
                    res.status(201).json(idPost);
                }
                catch(err) {
                    console.log(err);
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        catch(err) {
            console.log(err);
        }
    } else {
        try {
            let post = req.body;

            let title = post.title;
            await db.promise().query(`UPDATE posts SET title = '${title}' WHERE id = ${idPost}`);
            res.status(201).json(idPost);
        }
        catch(err) {
            console.log(err);
        }
    }
   
};

// TRAITER L ERREUR
exports.createPost = async (req, res, next) => {

    let post = req.body.content;
    post = JSON.parse(post);
    let title = post.title;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let idUser = decodedToken.idUser;

    let urlImg = req.protocol + "://" + req.get('host') + "/images/" + req.file.filename;

    try {
        const response = await db.promise().query(`INSERT INTO posts (title, id_user, url_img) VALUES ('${title}', '${idUser}', '${urlImg}')`);
        id = response[0].insertId;
     
        res.status(201).json(id);
    }
    catch (err) {
        console.log(err);
    }
};

// TRAITER L ERREUR
exports.deletePost = async (req, res, next) => {
    let id = req.params.id;
    try {
        var urlImg = await db.promise().query(`SELECT url_img FROM posts WHERE id = ${id}`);
        urlImg = urlImg[0][0].url_img;
        var filename = urlImg.split('/images/')[1];
        try {
            fs.unlink(`images/${filename}`);
            try {
                await db.promise().query(`DELETE FROM posts WHERE id = ${id}`);
                try {
                    await db.promise().query(`DELETE FROM reactions WHERE id_post = ${id}`);
                    res.status(201).json({msg: "post supprimé"});
                }
                catch(err) {
                    console.log(err);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    catch(err) {
        console.log(err);
    }
}