const mysql = require('mysql2');

module.exports = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'csOCe45@e',
    database: 'groupomania'
})
