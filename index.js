const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(answers) {
  return inquirer.prompt([
    {
      type: "input",
      message: "Employee Name",
      name: "name",
    },
    {
      type: "input",
      message: "ID #",
      name: "ID",
    },
    {
      type: "input",
      message: "Email Address",
      name: "email",
    },
    {
      type: "input",
      message: "Role",
      name: "Role",
    },
    {
      type: "list",
      name: "Role",
      message: "Role?",
      choices: ["Manager", "Engineer", "Intern"],
    },
  ]);
}

