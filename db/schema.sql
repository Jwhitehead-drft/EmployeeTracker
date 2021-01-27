DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT auto_increment PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
)

CREATE TABLE role (
    id INT UNSIGNED auto_increment PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    INDEX dep_ind (department_id),
    CONTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT UNSIGNED auto_increment PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_ind (role_id),
    CONTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
    manager_id INT UNSIGNED,
    INDEX man_ind (manager_id),
    CONTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE CASCADE
)

