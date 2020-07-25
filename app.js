const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
var team = [];

getManagerInfo();

function getManagerInfo() {
    prompt([
    {
        type: "input",
        name: "managerName",
        message: "Please enter the manager's name: "
    },{
        type: "input",
        name: "managerId",
        message: "Enter the manager's id: "
    },
    {
        type: "input",
        name: "managerEmail",
        message: "Enter the manager's email: "
    },
    {
        type: "input",
        name: "managerOfficeNumber",
        message: "Enter the manager's office number: "
    }
]).then(function(answers) {
    const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
    team.push(manager)
    buildTeam()
})
}





