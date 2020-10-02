const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Employee = [];


const render = require("./lib/htmlRenderer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(answers) {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "Role?",
          choices: ["Manager", "Engineer", "Intern"],
        },
      ])
      .then((answers) => {
        if (answers.role === "Manager") {
          buildManager();
        } else if (answers.role === "Engineer") {
          buildEngineer();
        } else if (answers.role === "Intern") {
          buildIntern();
        }
      });
  }



function buildManager(answers) {
    console.log("Please build your manager")
    inquirer.prompt([
        // ask for manager name
        {
            type: "input",
            name: "managerName",
            message: "What is the manager's name?",
            validate: function (answer) {
                if (answer !== "") {
                    return true;
                } else {
                    return "Must input a name!"
                }
            }
        },
        // ask for manager id
        {
            type: "input",
            name: "managerId",
            message: "What is the manager's id?",
            validate: function (answer) {
                if (answer !== "") {
                    return true;
                } else {
                    return "Must input an id"
                }
            }
        },
        // ask for manager email
        {
            type: "input",
            name: "managerEmail",
            message: "What is the manager's email?",
            validate: function (answer) {
                if (answer !== "") {
                    return true;
                } else {
                    return "Must input an email!"
                }
            }
        },

        {
            type: "input",
            message: "What is the manager's office number?",
            name: "officeNumber",
            validate: function (answer) {
                if (answer !== "") {
                    return true;
                } else {
                    return "Must input a offcie number!"
                }
            }
        },
        {
            type: "list",
            message: "Would you like to add another employee?",
            name: "addEmployee",
            choices: ["yes", "no"],
        },
    ])

       .then((answers) => {
            let manager = new Manager(
                answers.managerName,
                answers.managerid,
                answers.managerEmail,
                answers.officeNumber
            );
            employees.push(manager);
            console.log(employees);
            if (answers.addEmployee === "yes") {
                promptUser();
            } else {
                renderHTML();
            }
        })
            .catch(function (err) {
                console.log(err);
            });
}

function buildEngineer(answers) {
    console.log("Please build your engineer")
    inquirer.prompt([
        {
          type: "input",
          message: "What is the engineer's name?",
          name: "engineerName",
          validate: function (answer) {
            if (answer !== "") {
                return true;
            } else {
                return "Must input a name!"
            }
        }
        },
        {
          type: "input",
          message: "What is the engineer's ID #?",
          name: "engineerid",
          validate: function (answer) {
            if (answer !== "") {
                return true;
            } else {
                return "Must input an ID #!"
            }
        }
        },
        {
          type: "input",
          message: "What is the engineer's email address?",
          name: "engineerEmail",
          validate: function (answer) {
            if (answer !== "") {
                return true;
            } else {
                return "Must input an email!"
            }
        }
        },
        {
          type: "input",
          message: "What is the their github link?",
          name: "github",
          validate: function (answer) {
            if (answer !== "") {
                return true;
            } else {
                return "Must input a github link!"
            }
        }
        },
        {
          type: "list",
          message: "Would you like to add another employee?",
          name: "addEmployee",
          choices: ["yes", "no"],
        },
      ])
      .then((answers) => {
        let engineer = new Engineer(
          answers.engineerName,
          answers.engineerid,
          answers.engineerEmail,
          answers.github
        );
        employees.push(engineer);
        console.log(employees);
        if (answers.addEmployee === "yes") {
          promptUser();
        } else {
          renderHTML();
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  
  function buildIntern(answers) {
    console.log("Please build your intern")
    inquirer.prompt([
        {
          type: "input",
          message: "What is the Intern's name?",
          name: "internName",
          validate: function (answer) {
            if (answer !== "") {
                return true;
            } else {
                return "Must input a name!"
            }
        }
        },
        {
          type: "input",
          message: "What is the intern's ID #?",
          name: "internid",
          validate: function (answer) {
            if (answer !== "") {
                return true;
            } else {
                return "Must input an ID #!"
            }
        }
        },
        {
          type: "input",
          message: "What is the intern's email address?",
          name: "internEmail",
          validate: function (answer) {
            if (answer !== "") {
                return true;
            } else {
                return "Must input an email!"
            }
        }
        },
        {
          type: "input",
          message: "What school does the intern attend?",
          name: "school",
        },
        {
          type: "list",
          message: "Would you like to add another employee?",
          name: "addEmployee",
          choices: ["yes", "no"],
        },
      ])
      .then((answers) => {
        let intern = new Intern(
          answers.internName,
          answers.internid,
          answers.internEmail,
          answers.school
        );
        employees.push(intern);
        console.log(employees);
        if (answers.addEmployee === "yes") {
          promptUser();
        } else {
          renderHTML();
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  
  function renderHTML() {
    return writeFileAsync("team.html", render(employees), "utf-8");
  }
  
  promptUser();