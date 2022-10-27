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
    .then ((answers) => {
        if (answers.prompt === 'View All Departments') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log('Viewing All Departments: ');
                console.table(result);
                userPrompt();
            });
        } else if (answers.prompt === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err,result) => {
                if (err) throw err; 
                console.log('Viewing All Employees: ');
                console.table(result);
                userPrompt();
            })
        }else if (answers.prompt === 'View All Roles') {
            db.query(`SELECT * FROM roles`, (err,result) => {
                if (err) throw err; 
                console.log('Viewing All Roles: ');
                console.table(result);
                userPrompt();
            })

        }else if (answers.prompt === 'Add A Department') {
            inquirer.prompt([{
                type:'input',
                name: 'department',
                message: 'What is the Department name?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    }else {
                        console.log('Add a Dept');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to DB`)
                    userPrompt();
                });
            })