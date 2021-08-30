const { check } = require('express-validator/check');
const db = require('./database');

// AUTH
// ARTICLE
// COMMENT
// MESSAGE

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
    .withMessage('Vous devez entrer un mot de passe')
    .isLength({ min: 8 })
    .withMessage('Le mot de passe doit faire 8 caractères minimum')
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
            return Promise.reject('Aucun compte ne correspond à cet identifiant.')
           }
         })
   }),
  check('password')
    .notEmpty()
    .withMessage('Vous devez entrer un mot de passe')
    .isLength({ min: 8 })
    .withMessage('Identifiant ou mot de passe incorrect')
    .escape(),
];

// ARTICLE
// CREATE AND MODIFY
exports.article = [
  check('title')
    .notEmpty()
    .withMessage('Donnez un titre à l\'article')
    .isLength({ min: 5 })
    .withMessage('Le titre de l\'article doit être de 5 caractères minimum')
    .isLength({ max: 100 })
    .withMessage('Le titre de l\'article doit être de 100 caractères maximum')
    .escape(),

  check('content')
    .notEmpty()
    .withMessage('L\'article ne peut pas être vide')
    .isLength({ min: 10 })
    .withMessage('Le contenu de l\'article doit être de 10 caractères minimum')
    .escape(),
];

// COMMENT
// ADD
exports.comment = [
  check('content')
    .notEmpty()
    .withMessage('Le commentaire ne peut pas être vide')
    .isLength({ min: 5 })
    .withMessage('Le commentaire doit être de 5 caractères minimum')
    .escape(),
];

// MESSAGE
// ADD
exports.message = [
  check('content')
    .notEmpty()
    .withMessage('Le message ne peut pas être vide')
    .escape(),
]

//Posts
// ADD AND MODIFY
exports.post = [
  check('title')
    .notEmpty()
    .withMessage('Le titre ne peut pas être vide')
    .isLength({ min: 5 })
    .withMessage('Le titre du post doit être de 5 caractères minimum')
    .isLength({ max: 100 })
    .withMessage('Le titre du post doit être de 100 caractères maximum')
    .escape(),
]