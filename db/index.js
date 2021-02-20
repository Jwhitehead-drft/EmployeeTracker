const connection = require("./connection");

class DB {
	constructor(connection) {
		this.connection = connection;
	}
	
	findEmployees() {
		return this.connection.query(
			"SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;" 
		)
	}

	findEmployeesManager() {
		return this.connection.query(
			"SELECT manager_id FROM employee"
		)
	}

	findDepartments() {
		return this.connection.query(
			"SELECT * FROM department ORDER BY id"
		)
	}

	newEmployees(a,b,c,d) {
		return this.connection.query(
			"INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)", [a,b,c,d]
		)
	}

	newDepartments(newDept) {
		 return this.connection.query(
			 "INSERT INTO department (name) Values (?)", [newDept]
		 )
	}

	findRoles(){
		return this.connection.query(
			"SELECT * FROM role"
		)
	}

	newRoles(x,y,z) {
		return this.connection.query(
			"INSERT INTO role (title, salary, department_id) values (?, ? , ?)", [x,y,z]
		)
	}

	destroyRole(id){
		return this.connection.query(
			"DELETE FROM role WHERE id = (?)", 
			[id],
		);
	}
}


module.exports = new DB(connection);