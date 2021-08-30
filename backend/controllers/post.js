const db = require('../database');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const { promises: fs } = require("fs");
const { query } = require('../database');

exports.getAllPost = async (req, res, next) => {
    try {
        var posts = await db.promise().query(`SELECT * FROM posts`);
        posts = posts[0];
        
        for(let post of posts) {
            let idUser = post.id_user;
            try {
                var email = await db.promise().query(`SELECT email FROM users WHERE id = ${idUser}`);
                email = email[0][0].email;
                post.email = email;
            }
            catch {
                res.status(400).json("select user email");
            }

            try {
                let nbReaction = await db.promise().query(`SELECT COUNT(*) AS nbReaction FROM reactions WHERE id_post = ${post.id}`);

                nbReaction = nbReaction[0][0].nbReaction;
                post.nbReaction = nbReaction;
            }
            catch {
                res.status(400).json("Une erreur est survenue");
            }
        }
        res.status(200).send(posts);
    }
    catch {
        res.status(400).json("select");
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
        catch {
            res.status(400).json("Une eur est survenue");
        }
    }
    catch {
        res.status(400).json("Une erreur est survenue");
    }
};

exports.modifyPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json(errors.errors[0].msg);
    }
    let idPost = req.params.id;
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        let idUser = decodedToken.idUser;
        let roleUser = decodedToken.roleUser;

        let id_user = await db.promise().query(`SELECT id_user FROM posts WHERE id = ${idPost}`);
        id_user = id_user[0][0].id_user;
        if(idUser == id_user || roleUser == "ADMIN" ) {
            if(req.file != undefined) {
                try {
                    var urlImg = await db.promise().query(`SELECT url_img FROM posts WHERE id = ${idPost}`);
                    urlImg = urlImg[0][0].url_img;
        
                    var filename = urlImg.split('/images/')[1];
                    try {
                        fs.unlink(`images/${filename}`);
                        try {
                            let title = req.body.title;
                            var urlImg = req.protocol + "://" + req.get('host') + "/images/" + req.file.filename;
                            await db.promise().query(`UPDATE posts SET title = '${title}', url_img = '${urlImg}' WHERE id = ${idPost}`);
                            res.status(201).json(idPost);
                        }
                        catch {
                            res.status(400).json("Une erreur est survenue");
                        }
                    }
                    catch {
                        res.status(400).json("Une erreur est survenue");
                    }
                }
                catch {
                    res.status(400).json("Une erreur est survenue");
                }
            } else {
                try {
                    let title = req.body.title;
        
                    await db.promise().query(`UPDATE posts SET title = '${title}' WHERE id = ${idPost}`);
                    res.status(201).json(idPost);
                }
                catch {
                    res.status(400).json("Une erreur est survenue");
                }
            }
        } else {
            res.status(403).json("Une erreur est survenue");
        }
    }
    catch {
        res.status(400).json("Une erreur est survenue");
    }
};

exports.createPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json(errors.errors[0].msg);
    }

    let title = req.body.title;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let idUser = decodedToken.idUser;

    let id_user = req.body.id_user;

    if (idUser == id_user ) {
        let urlImg = req.protocol + "://" + req.get('host') + "/images/" + req.file.filename;

        try {
            const response = await db.promise().query(`INSERT INTO posts (title, id_user, url_img) VALUES ('${title}', '${idUser}', '${urlImg}')`);
            id = response[0].insertId;
         
            res.status(201).json(id);
        }
        catch {
            res.status(400).json("Une erreur est survenue");
        }
    } else {
        res.status(400).json("Une erreur est survenue");
    }
};


exports.deletePost = async (req, res, next) => {
    var id = req.params.id;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let idUser = decodedToken.idUser;
    let roleUser = decodedToken.roleUser;

    try {
        let id_user = await db.promise().query(`SELECT id_user FROM posts WHERE id = ${id}`);
        id_user = id_user[0][0].id_user;
        if( idUser == id_user || roleUser == "ADMIN" ) {
            try {
                var urlImg = await db.promise().query(`SELECT url_img FROM posts WHERE id = ${id}`);
                urlImg = urlImg[0][0].url_img;
                var filename = urlImg.split('/images/')[1];
                try {
                    fs.unlink(`images/${filename}`);
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
                                            res.status(400).json("Une erreur est survenue");
                                        }
                                    }
                                    res.status(201).json({msg: "post supprimé"});
                                }
                                catch {
                                    res.status(400).json("Une erreur est survenue");
                                }
        
                            } else {
                                res.status(201).json({msg: "post supprimé"});
                            }
                        }
                        catch {
                            res.status(400).json("Une erreur est survenue");
                        }
                    }
                    catch  {
                        res.status(400).json("Une erreur est survenue");
                    }
                }
                catch  {
                    res.status(400).json("Une erreur est survenue");
                }
            }
            catch {
                res.status(400).json("Une erreur est survenue");
            }
        } else {
            res.status(403).json("Une erreur est survenue");
        }
    }
    catch {
        res.status(400).json("Une erreur est survenue");
    }
}