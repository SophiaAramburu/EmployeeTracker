const inquirer = require('inquirer');
const db = require('./db/connection');


db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');
    userPrompt();
})

var userPrompt = function () {
    inquirer.prompt([
        {   
            type: "list",
            name: "selection",
            message: "Please select one of the following",
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'LogOut'
            ]
        }
    ])