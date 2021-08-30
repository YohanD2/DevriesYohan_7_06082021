const db = require('../database');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

exports.createComment = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json(errors.errors[0].msg);
    }

    let content = req.body.content;
    let idArticle = req.params.id;
    let id_user = req.body.id_user;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let idUser = decodedToken.idUser;

    if( idUser == id_user ) {
        try {
            await db.promise().query(`INSERT INTO comments (id_user, id_article, content) VALUES (${idUser}, ${idArticle}, '${content}') `);
            try {
                const response = await db.promise().query(`SELECT email FROM users WHERE id = ${idUser}`);
                let email = response[0][0].email;
                let comment = {
                    content,
                    email
                }
             
                res.status(201).json(comment);
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
};