const db = require('../database');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json(errors.errors[0].msg);
    }
    try {
        const { email, password } = req.body;
        console.log(password);

        const salt = await bcrypt.genSalt(10);
        encryptedPassword = await bcrypt.hash(password, salt);

        const response = await db.promise().query(`INSERT INTO users (email, password) VALUES ('${email}', '${encryptedPassword}') `);
        res.status(201).json(response);
    }
    catch (err) {
        res.status(412).json("Une erreur est survenue");
    }
};

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json(errors.errors[0].msg);
    }
    try {
        const { email, password } = req.body;

        const response = await db.promise().query(`SELECT * FROM users WHERE email = '${email}'`);
        const validPassword = await bcrypt.compare(password, response[0][0].password);

        if( validPassword ) {
            id = response[0][0].id
            res.status(200).json({
                idUser: id,
                token: jwt.sign(
                  { idUser: id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
                )
              });
        } else {
            res.status(400).json("Identifiant ou mot de passe incorrect");
        }
    }
    catch(err) {
        res.status(412).json("Identifiant ou mot de passe incorrect");
    }
};

// USELESS
exports.logout = async (req, res, next) => {
    console.log('getLogouted');
};
