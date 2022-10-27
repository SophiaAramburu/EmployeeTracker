const mysql = require('mysql2');
require('dotenv').config();


const db = mysql.createConnection(
    {
        host: 'localhost',       
        user: 'root',
        password: '@Alonzo512',
        database: 'buisness'
    }
)

module.exports = db;