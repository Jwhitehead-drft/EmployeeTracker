const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localHost",
    user: "root",
    password: "rootroot",
    database: "employees",
})

connection.connect();

connection.query = util.promisify(connection.query, console.log("connected"));

module.exports = connection; 