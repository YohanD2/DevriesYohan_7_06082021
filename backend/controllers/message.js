const db = require('../database');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator/check');

exports.createMessage = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json(errors.errors[0].msg);
    }

    let sql;
    let message;
    let id_conversation;
    let id_user_by;
    let content;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let idUser = decodedToken.idUser;
   
    if(req.file != undefined) {
        message = req.body.content.replace(/&quot;/g,'"');
        message = JSON.parse(message);
        id_conversation = message.id_conversation;
        id_user_by = message.id_user_by;
        content = message.content;
        var urlImg = req.protocol + "://" + req.get('host') + "/images/" + req.file.filename;
        sql = 'INSERT INTO messages (content, id_conversation, id_user_by, url_img) VALUES ("' + content + '", ' + id_conversation + ', ' + id_user_by + ', "' + urlImg + '")';
    } else {
        message = req.body;
        id_conversation = message.id_conversation;
        id_user_by = message.id_user_by;
        content = message.content;
        sql = 'INSERT INTO messages (content, id_conversation, id_user_by) VALUES ("' + content + '",' + id_conversation + ', ' + id_user_by + ')';
    }

    if (idUser == id_user_by) {
        try {
            const response = await db.promise().query(`${sql}`);
            id = response[0].insertId;

            let message = {
                id_conversation,
                id_user_by,
                content,
                id,
                urlImg
            }

            res.status(201).json(message);
        }
        catch {
            res.status(400).json("Une erreur est survenue");
        }
    } else {
        res.status(403).json("Une erreur est survenue");
    }
};
