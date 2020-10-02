const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const teamMembers = [];


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

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
          addEngineer();
        } else if (answers.role === "Intern") {
          addIntern();
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


function buildTeam() {
    buildManager()
    buildEMployee....
}

buildTeam();

render(teamMembers)