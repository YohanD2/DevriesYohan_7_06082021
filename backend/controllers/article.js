const db = require('../database');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');


exports.getAllArticle = async (req, res, next) => {
    try {
        let articles = await db.promise().query(`SELECT * FROM articles ORDER BY id DESC`);
        articles = articles[0];

        for (let article of articles) {
            let idArticle = article.id;
            let idUser = article.id_user;

            try {
                let nbComment = await db.promise().query(`SELECT COUNT(*) AS nbComment FROM comments WHERE id_article = ${idArticle}`);
                nbComment = nbComment[0][0].nbComment;
                article.nbComment = nbComment;
            }
            catch {
                res.status(400).json("a"); 
            }
            try {
                let userEmail = await db.promise().query(`SELECT email FROM users WHERE id = ${idUser}`);
                email = userEmail[0][0].email;
                article.email = email;
            }
            catch {
                res.status(400).json("b");
            }
        };
        res.status(200).send(articles);
    }
    catch {
        res.status(400).json("c");
    }
};

exports.getOneArticle = async (req, res, next) => {
    try {
        let id = req.params.id
        let article = await db.promise().query(`SELECT * FROM articles WHERE id = ${id}`);
        try {
            let comments = await db.promise().query(`SELECT * FROM comments WHERE id_article = ${id}`);
            article = article[0];
            comments = comments[0];

            for (let comment of comments) {
                let id = comment.id_user;
                try {
                    let userEmail = await db.promise().query(`SELECT email FROM users WHERE id = ${id}`);
                    email = userEmail[0][0].email;
                    comment.email = email;
                }
                catch {
                    res.status(400).json("Une erreur est survenue");
                }
            }
            const response = {
                article,
                comments
            }
            res.status(200).send(response);
        }
        catch {
            res.status(400).json("Une erreur est survenue");
        }
    }
    catch {
        res.status(400).json("Une erreur est survenue");
    }
};

exports.modifyArticle = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json(errors.errors[0].msg);
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let idUser = decodedToken.idUser;
    let roleUser = decodedToken.roleUser;

    var id = req.params.id;

    try {
        let id_user = await db.promise().query(`SELECT id_user FROM articles WHERE id = ${id}`);
        id_user = id_user[0][0].id_user;

        if (id_user == idUser || roleUser == "ADMIN" )  {
            try {
                let title = req.body.title;
                let content = req.body.content;

                const response = await db.promise().query(`UPDATE articles SET title = '${title}', content = '${content}' WHERE id = ${id}`);

                let article = {
                    title,
                    content,
                    id
                }
                res.status(201).json(article);
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

   
};

// TRAITER L ERREUR
exports.createArticle = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json(errors.errors[0].msg);
    }

    let title = req.body.title;
    let content = req.body.content;
    let id_user = req.body.id_user;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let idUser = decodedToken.idUser;

    if ( idUser == id_user ) {
        try {
            const response = await db.promise().query(`INSERT INTO articles (id_user, title, content) VALUES ('${idUser}', '${title}', '${content}') `);
            id = response[0].insertId;
    
            let article = {
                title,
                content,
                id
            }
         
            res.status(201).json(article);
        }
        catch {
            res.status(400).json("Une erreur est survenue");
        }
    }
    else {
        res.status(403).json("Une erreur est survenue");
    }
};

// TRAITER L ERREUR
exports.deleteArticle = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let idUser = decodedToken.idUser;
    let roleUser = decodedToken.roleUser;

    try {
        let id = req.params.id;
        let id_user = await db.promise().query(`SELECT id_user FROM articles WHERE id = ${id}`);
        id_user = id_user[0][0].id_user;
        if(idUser == id_user || roleUser == "ADMIN") {
            try {
                const response = await db.promise().query(`DELETE FROM articles WHERE id = ${id}`);
                try {
                    const deleteComments = await db.promise().query(`DELETE FROM comments WHERE id_article = ${id}`);
                    res.status(201).json({msg: "article supprimé"});
                }
                catch {
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