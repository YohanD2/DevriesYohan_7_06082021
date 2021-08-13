const { check } = require('express-validator/check');
const db = require('./database');
// AUTH
// ARTICLE


// AUTH 
exports.createUser = [
  check('email')
    .notEmpty()
    .isLength({ min: 3 })
    .custom(value => {
      return db.promise().query(`SELECT * FROM users WHERE email = '${value}'`)
         .then((response) => {
           console.log(response[0].length);
           if( response[0].length != 0 ) {
            return Promise.reject('Cette adresse email est déjà utilisée. Veuillez en saisir une autre.')
           }
         })
   }),

  check('password')
    .notEmpty()
    .isLength({ min: 8 })
    .escape(),
];

exports.loginUser = [
  check('email')
    .notEmpty()
    .isLength({ min: 3 })
    .custom(value => {
      return db.promise().query(`SELECT * FROM users WHERE email = '${value}'`)
         .then((response) => {
           if( response[0].length == 0 ) {
            return Promise.reject('Le mot de passe ou l\'adresse mail est incorrect. Veuillez réessayer.')
           }
         })
   }),
  check('password')
    .notEmpty()
    .isLength({ min: 8 })
    .escape(),
];

// ARTICLE
exports.article = [
  check('title')
    .notEmpty()
    .withMessage('Donnez un titre à l\'article')
    .isLength({ min: 5 })
    .withMessage('Le titre de l\'article doit être de 5 caractères minimum')
    .escape(),

  check('content')
    .notEmpty()
    .withMessage('L\'article ne peut pas être vide')
    .isLength({ min: 10 })
    .withMessage('Le contenu de l\'article doit être de 10 caractères minimum')
    .escape(),
];


// COMMENT
exports.comment = [
  check('content')
    .notEmpty()
    .withMessage('Le commentaire ne peut pas être vide')
    .isLength({ min: 5 })
    .withMessage('Le commentaire doit être de 5 caractères minimum')
    .escape(),
];

// MESSAGE 
exports.message = [
  check('content')
    .notEmpty()
    .withMessage('Le message ne peut pas être vide')
    .escape(),
]