const db = require('../database');
const jwt = require('jsonwebtoken');

exports.createReaction = async (req, res, next) => {
    /*
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json(errors.errors[0].msg);
    }
    */



    /*
    post = req.body.content.replace(/&quot;/g,'"');
    console.log(post);
    post = JSON.parse(post);
*/
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let idUser = decodedToken.idUser;

    try {
        var email = await db.promise().query(`SELECT email FROM users WHERE id = ${idUser}`);
        email = email[0][0].email;
        
        let urlImg = req.protocol + "://" + req.get('host') + "/images/" + req.file.filename;
        let idPost = req.params.id;
    
        try {
            const response = await db.promise().query(`INSERT INTO reactions (id_user, id_post, url_img) VALUES ('${idUser}', '${idPost}', '${urlImg}')`);
            let post = {
                email,
                urlImg
            }
         
            res.status(201).json(post);
        }
        catch (err) {
            console.log(err);
        }
    }
    catch(err) {

    }
    
};