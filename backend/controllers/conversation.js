const db = require('../database');
const jwt = require('jsonwebtoken');

// CHECK WHO IS CONNECTED TO CHANGE PERSPECTIV
exports.getAllConversation = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        let idUser = decodedToken.idUser;

        let conversations = await db.promise().query(`SELECT * FROM conversations WHERE id_user_by = ${idUser} OR id_user_to = ${idUser} ORDER BY id DESC` );
        conversations = conversations[0];

        for (let conversation of conversations) {
            
            let id;
            if ( idUser == conversation.id_user_to) {
                id = conversation.id_user_by;
            } else {
                id = conversation.id_user_to;
            }
            
            try {
                let userEmail = await db.promise().query(`SELECT email FROM users WHERE id = ${id}`);
                email = userEmail[0][0].email;
                conversation.email = email;
            }
            catch(err) {
                console.log(err);
            }
        };

        res.status(200).send(conversations);
    }
    catch (err) {
        console.log(err);
    }
};

// GET MESSAGES WITH
exports.getOneConversation = async (req, res, next) => {
    try {
        let idConversation = req.params.id
        let conversation = await db.promise().query(`SELECT * FROM conversations WHERE id = ${idConversation}`);

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        let idUser = decodedToken.idUser;

        let id;
        if ( idUser == conversation[0][0].id_user_to) {
            id = conversation[0][0].id_user_by;
        } else {
            id = conversation[0][0].id_user_to;
        }
        try {
            let userEmail = await db.promise().query(`SELECT email FROM users WHERE id = ${id}`);
            email = userEmail[0][0].email;
            conversation[0][0].email = email;

            try {
                let messages = await db.promise().query(`SELECT * FROM messages WHERE id_conversation = ${idConversation}`);
                conversation = conversation[0];
                messages = messages[0];
                
                const response = {
                    conversation,
                    messages
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
    }
    catch (err) {
        console.log(err);
    }
};

exports.modifyConversation = async (req, res, next) => {
    try {
        let id = req.params.id;
        const response = await db.promise().query(`UPDATE conversations SET content = 'Nouveau contenu' WHERE id = ${id}`);
        res.status(201).json(response);
    }
    catch(err) {
        console.log(err);
    }
};

exports.createConversation = async (req, res, next) => {
    let id_user_by = req.body.id_user_by;
    let email = req.body.email;
    try {

        const response = await db.promise().query(`SELECT id FROM users WHERE email = '${email}'`);
        if( response[0].length == 0 ) {
            res.status(400).json("Utilisateur introuvable");

        } else {
            let id_user_to = response[0][0].id;

            try {
                let response = await db.promise().query(`SELECT * FROM conversations WHERE (id_user_by = ${id_user_to} AND id_user_to = ${id_user_by}) OR (id_user_by = ${id_user_by} AND id_user_to = ${id_user_to}) ` );
                console.log(response[0].length);
                if(response[0].length != 0 ) {
                    res.status(400).json("Une conversation existe déjà");
                } else {
                    try {
                        const response = await db.promise().query(`INSERT INTO conversations (id_user_by, id_user_to) VALUES ('${id_user_by}', '${id_user_to}') `);
                        id = response[0].insertId;
                        res.status(201).json(id);
                    }
                    catch (err) {
                        res.status(400).json("Une erreur est survenue");
                    }
                }
            }
            catch(err) {
                res.status(400).json("Une erreur est survenue");

            }
        }
    }
    catch (err) {
        res.status(400).json("Une erreur est survenue");
    }
    
};

exports.deleteConversation = async (req, res, next) => {
    try {
        let id = req.params.id
        const response = await db.promise().query(`DELETE FROM messages WHERE id_conversation = ${id}`);
        try{
            const response = await db.promise().query(`DELETE FROM conversations WHERE id = ${id}`);
            res.status(201).send(response[0]);
        }
        catch(err) {
            res.status(400).json("Une erreur est survenue");
        } 
    }
    catch (err) {
        res.status(400).json("Une erreur est survenue");
    }
}