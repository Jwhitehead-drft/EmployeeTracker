const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const connection = require("./db/connection");
require("console.table");

function init() {
	const logoText = logo({ name: "Employee Manager" }).render();
	console.log(logoText)
	loadMainMenu();
}

function loadMainMenu() {
	inquirer
		.prompt([
			{
				name: "choice",
				type: "list",
				message: "What would you like to do?",
				choices: [
					{
						name: "View Employees",
						value: "VIEW_EMPLOYEES",
					},
					{
						name: "View Employees By Manager",
						value: "VIEW_EMPLOYEES_BY_MANAGER"
					},
					{
						name: "Add Employees",
						value: "ADD_EMPLOYEES"
					},
					{
						name: "Delete Employees",
						value: "DELETE_EMPLOYEES"
					},
					{
						name: "View Departments",
						value: "VIEW_DEPARTMENTS"
					},
					{
						name: "Add Departments",
						value: "ADD_DEPARTMENTS"
					},
					{
						name: "Delete Departments",
						value: "DELETE_DEPARTMENTS"
					},
					{
						name: "View Roles",
						value: "VIEW_ROLES"
					},
					{
						name: "Update Employee Roles",
						value: "UPDATE_EMPLOYEE_ROLES"
					},
					{
						name: "Add Roles",
						value: "ADD_ROLES"
					},
					{
						name: "Delete Roles",
						value: "DELETE_ROLES"
					},
					{
						name: "Update Employee Manager",
						value: "UPDATE_EMPLOYEE_MANAGER"
					},
					{
						name: "View Budget",
						value: "VIEW_BUDGET"
					},
					{
						name: "Exit",
						value: "EXIT"
					}
				]
			}
		])
		.then(answer => {
			switch (answer.choice) {
				case "VIEW_EMPLOYEES":
					return viewEmployees();
				case "VIEW_EMPLOYEES_BY_MANAGER":
					return viewEmployeesByManager();
				case "ADD_EMPLOYEES":
					return addEmployees();
				case "DELETE_EMPLOYEES":
					return deleteEmployees();
				case "VIEW_DEPARTMENTS":
					return viewDepartments();
				case "ADD_DEPARTMENTS":
					return addDepartments();
				case "DELETE_DEPARTMENTS":
					return deleteDepartments();
				case "VIEW_ROLES":
					return viewRoles();
				case "ADD_ROLES":
					return addRoles();
				case "DELETE_ROLES":
					return deleteRoles();
				case "UPDATE_EMPLOYEE_ROLES":
					return updateRoles();
				case "UPDATE_EMPLOYEE_MANAGER":
					return updateEmployeeManager();
				case "VIEW_BUDGET":
					return viewBudget();
				case "EXIT":
					return connection.end();
			}
		})
}

async function viewEmployees() {
	const employees = await db.findEmployees();
	console.log("\n")
	console.table(employees);
	loadMainMenu();
}

async function viewEmployeesByManager() {
	const viewByManager = await db.findEmployeesManager();
	console.table(viewByManager);
	loadMainMenu();
}

async function addEmployees() {
	const addRol = await db.findRoles();
	const manager = await db.findEmployeesManager();
	inquirer
		.prompt([
			{
				name: "first",
				type: "input",
				message: "What is the new employee's first name?"

			},
			{
				name: "last",
				type: "input",
				message: "What is the new employee's last name?"

			},
			{
				name: "choice",
				type: "rawlist",
				choices: () => {
					let roleArr = [];
					for (let i = 0; i < addRol.length; i++) {
						roleArr.push(addRol[i].title)
					}
					return roleArr;
				},
				message: "What is the new employee's title?"
			},
			{
				name: "empManager",
				type: "rawlist",
				choices: () => {
					let roleArr = [];
					for (let i = 0; i < manager.length; i++) {
						roleArr.push(manager[i].first_name + manager[i].last_name);
					}
					return roleArr;
				},
				message: "Who is the new employee's manager?"
			}
		])
		.then(answer => {
			let addRole;
			for (let i = 0; i < addRol.length; i++) {
				if (addRol[i].title === answer.choice) {
					addRole = addRol[i].id;
				}
			}
			let employeeManager;
			for (let i = 0; i < manager.length; i++) {
				if (manager[i].first_name + " " + manager[i].last_name === answer.empManager) {
					employeeManager = manager[i].id;
				}
			}

			const newHire = db.newEmployees(answer.first, answer.last, addRole);
			console.table(newHire)
			loadMainMenu();
		})
}



async function deleteEmployees() {

}

async function viewDepartments() {
	const viewDept = await db.findDepartments();
	console.table(viewDept);
	loadMainMenu();
}

async function addDepartments() {
	const addDept = await db.findDepartments();
	console.table(addDept)
	inquirer
		.prompt([
			{
				name: "choice",
				type: "input",
				message: "What is the name of the new department?"
			}
		])
		.then(answer => {
			const newDept = db.newDepartments(answer.choice);
			console.log("New Department: " + answer.choice + ", has been added.")
			loadMainMenu();
		})
}

async function deleteDepartments() {
	console.log("delete departments")
}

async function viewRoles() {

	const viewRoles = await db.findRoles();
	console.table(viewRoles)
	loadMainMenu();
}

async function addRoles() {
	const addRol = await db.findDepartments();
	inquirer
		.prompt([
			{
				name: "role",
				type: "input",
				message: "What is the new role?"

			},
			{
				name: "salary",
				type: "input",
				message: "What is the salary for the new role?"

			},
			{
				name: "choice",
				type: "rawlist",
				choices: () => {
					let roleArr = [];
					for (let i = 0; i < addRol.length; i++) {
						roleArr.push(addRol[i].name)
					}
					return roleArr;
				},
				message: "Which department does the role belong to?"
			},
		])
		.then(answer => {
			let addRole;
			for (let i = 0; i < addRol.length; i++) {
				if (addRol[i].name === answer.choice) {
					addRole = addRol[i].id;
				}
			}

			const updatedRole = db.newRoles(answer.role, answer.salary, addRole);
			console.log("New role created: " + answer.role)
			loadMainMenu();
		})
}

async function deleteRoles() {

	const roles = await db.findRoles();
	inquirer
		.prompt([
			{
				name: "role",
				type: "rawlist",
				choices: () => {
					let roleArr = [];
					for (let i = 0; i < roles.length; i++) {
						roleArr.push(roles[i].title)
					}
					return roleArr;
				},
				message: "Which role would you like to delete?"
			},
		])
		.then(answer => {
			let delRole;
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].title === answer.role) {
					delRole = roles[i].id;
				}
			}
			const deletedRole = db.destroyRole(delRole);
			loadMainMenu();
		})

	console.table(roles)
}

async function updateRoles() {
	// { name: "What is displayed", value: "what is returned" }
	let q = "SELECT id AS value, concat(id, ': ', first_name, ' ', last_name) AS name from employee"
	const employees = await connection.query(q);
	
	const { employee_id } = await inquirer.prompt({
		name: "employee_id",
		type: "list",
		choices: employees
	})
	
	q = "SELECT r.id AS value, concat(name, ' ', title) AS name from role r LEFT JOIN department d ON r.department_id = d.id"
	const roles = await connection.query(q);
	const { role_id } = await inquirer.prompt({
		name: "role_id",
		type: "list",
		choices: roles
	})

	q = "UPDATE employee SET role_id = ? WHERE id = ?"
	
	await connection.query(q, [role_id, employee_id])
	loadMainMenu()
}

async function updateEmployeeManager() {
	console.log("update employee's manager")
}

async function viewBudget() {
	console.log("budget total")
}


init();