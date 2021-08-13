const db = require('../database');
const { validationResult } = require('express-validator/check');

// USELESS OCNTROLLER
exports.getOneUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        
        const response = await db.promise().query(`SELECT email FROM users WHERE id = ${id}`);
        res.status(200).send(response[0]);
    }
    catch (err) {
        console.log(err);
    }
};

exports.createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { email , password } = req.body;

    try {
        const response = await db.promise().query(`INSERT INTO users (email, password) VALUES ('${email}', '${password}') `);
        res.status(201).json(response);
    }
    catch (err) {
        console.log(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        const response = await db.promise().query(`DELETE FROM users WHERE id = ${id}`);
        res.status(201).json(response);
    }
    catch (err) {
        console.log(err);
    }
}