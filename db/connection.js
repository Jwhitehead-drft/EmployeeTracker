const util = require('util');
const mysql = require ('mysql');

const connection = mysql.createConnection({
	host: "localhost",
  
	// Your port; if not 3306
	port: 3306,
  
	// Your username
	user: "root",
  
	// Your password
	password: "rootroot",
	database: "employees"
  });
  
connection.connect();

//   connection.connect(function(err) {
// 	  if (err) throw err;
// 	console.log("connected as id " + connection.threadId + "\n");
//   });
  
connection.query = util.promisify(connection.query)
  
module.exports = connection;