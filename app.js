const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");


function init() {
    const logoText = logo ({ name: "Jake's Employee Manager"}). render();
    console.log(logoText);
}

init()