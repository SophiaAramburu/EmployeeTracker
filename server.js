const inquirer = require('inquirer');
const db = require('./db/connection');


db.connect(err => {
   if(err) throw err;
   console.log('Database connected.');
    userPrompt();
})

function userPrompt() {
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
                if(err) {
                    console.log(err);
                    return err;
                  }
                console.log('Viewing All Departments: ');
                console.table(result);
                userPrompt();
            });
        } else if (answers.prompt === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err,result) => {
                if(err) {
                    console.log(err);
                    return err;
                  }
                console.log('Viewing All Employees: ');
                console.table(result);
                userPrompt();
            })
        }else if (answers.prompt === 'View All Roles') {
            db.query(`SELECT * FROM roles`, (err,result) => {
                if(err) {
      console.log(err);
      return err;
    } 
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
                    if(err) {
      console.log(err);
      return err;
    }
                    console.log(`Added ${answers.department} to DB`)
                    userPrompt();
                });
            })
        }else if (answers.prompt === 'Add Role') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if(err) {
      console.log(err);
      return err;
    }

                inquirer.prompt([{
                    type: 'input',
                    name: 'roles', 
                    message: 'Input your Role:',
                    validate: departmentInput => {
                        if (departmentInput) {
                            return true;
                        }else {
                            console.log('Add a Role');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary', 
                    message: 'Input salary for role:',
                    validate: departmentInput => {
                        if (departmentInput) {
                            return true;
                        }else {
                            console.log('Add Salary');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department', 
                    message: 'Input Department for Role:',
                    choices: () => {
                        var array = [];
                        for (var i=0; i < result.length; i++){
                            array.push(result[i].name)
                        }
                        return array;
                    }
                }
            ]).then((answers) => {
                for (var i=0; i < result.length; i++) {
                    if (result[i].name === answers.department){
                        var department = result[i];
                    }
                }
                db.query(`INSERT INTO role (title, salary,department_id) VALUES (?,?,?)`, [answers.roles, answers.salary, department.id], (err,result) => {
                    if(err) {
      console.log(err);
      return err;
    }
                    console.log(`added ${answers.roles} to db`)
                    userPrompt();
                })
            })
        });
    } else if (answers.prompt === 'Add An Employee') {
        db.query(`SELECT * FROM employee, roles`, (err,result) => {

            if(err) {
      console.log(err);
      return err;
    }
            inquirer.prompt([{
                
                type: 'input',
                name: 'firstName', 
                message: 'Employees First Name: ',
                validate: firstNameInput => {
                    if (firstNameInput) {
                        return true;
                    }else {
                        console.log('Add a First Name');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'lastName', 
                message: 'Employees Last Name:',
                validate: lastNameInput => {
                    if (lastNameInput) {
                        return true;
                    }else {
                        console.log('Add a Last Name');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'roles', 
                message: 'Employees Role:',
                choices: () => {
                    var array = [];
                    for (var i=0; i < result.length; i++){
                        array.push(result[i].title)
                    }
                    var newArray = [...new Set(array)];
                    return newArray;
                }
            },

            {
                type: 'list',
                name: 'manager', 
                message: 'Employees Manager:',
                validate: managerInput => {
                    if (managerInput) {
                        return true;
                    } else {
                        console.log('Add Employee Manager');
                        return false;
                    }
                }
            }
        ]).then((answers) => {
            for (var i=0; i < result.length; i++) {
                if (result[i].title === answers.roles){
                    var roles = result[i];
                }
            }
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?)`, [answers.firstName, answers.lastName, answers.manager.id], (err,result) => {
                if(err) {
      console.log(err);
      return err;
    }
                console.log(`added ${answers.firstName} and ${answers.lastName} to db`)
                userPrompt();
            })
        })
        })
    }else if (answers.prompt === 'Update Employee Role') {
        db.query(`SELECT * FROM employee, roles`, (err,result) => {

            if(err) {
      console.log(err);
      return err;
    }
            inquirer.prompt([{
                
                type: 'input',
                name: 'employee', 
                message: 'Employees New Role: ',
                choices: () => {
                    var array = [];
                    for (var i=0; i < result.length; i++){
                        array.push(result[i].last_name)
                    }
                    var employeeArray = [...new Set(array)];
                    return employeeArray;
                }
            },
            {
                type: 'input',
                name: 'role', 
                message: 'New Role:',
                choices: () => {
                    var array = [];
                    for (var i=0; i < result.length; i++){
                        array.push(result[i].title)
                    }
                    var newArray = [...new Set(array)];
                    return newArray;
                }
            },

        ]).then((answers) => {
            for (var i=0; i < result.length; i++) {
                if (result[i].title === answers.employee){
                    var name = result[i];
                }
            }
            for (var i=0; i < result.length; i++) {
                if (result[i].title === answers.roles){
                    var roles = result[i];
                }
            }
            db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err,result) => {
                if(err) {
      console.log(err);
      return err;
    }
                console.log(`added ${answers.employee} to db`)
                userPrompt();
            });
        })
    });
} else if (answers.prompt === 'LogOut'){
    db.end();
    console.log("Later!");
        }
    })
};

// userPrompt()