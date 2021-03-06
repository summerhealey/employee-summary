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

function addIntern() {
    prompt([
    {
        type: "input",
        name: "internName",
        message: "Please enter the intern's name: "
    },{
        type: "input",
        name: "internId",
        message: "Enter the intern's id: "
    },
    {
        type: "input",
        name: "internEmail",
        message: "Enter the intern's email: "
    },
    {
        type: "input",
        name: "internSchool",
        message: "Enter the intern's educational institution: "
    }
]).then(function(answers) {
    const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
    team.push(intern)
    buildTeam()
})
}

function addEngineer () {
    prompt([
    {
        type: "input",
        name: "engineerName",
        message: "Please enter the engineer's name: "
    },
    {
        type: "input",
        name: "engineerId",
        message: "Enter the engineer's id: "
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "Enter the engineer's email: "
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "Enter the engineer's GitHub: "
    }
]).then(function(answers) {
    const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
    team.push(engineer)
    buildTeam()
})
}

function buildTeam() {
    prompt([{
        type: "list",
        name: "teamRoles",
        choices: [
            "Manager",
            "Intern",
            "Engineer", 
            "None",
        ],
        message: "Please choose the team member's role." 
    }]).then(function(answers) {
        switch(answers.teamRoles) {
            case "Intern":
             addIntern()
              break;
            case "Engineer":
              addEngineer()
              break;
            default:
              generateTeam()
          }
    }
)};

function generateTeam() {
    const employees = render(team);
    fs.writeFile(outputPath, employees, function(err) {
        if(err){
            console.log(err);
        }
            console.log("Data entered!");
    })
      
};





