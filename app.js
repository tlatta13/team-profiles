const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

employeeArray = [];

function teamBuidler() {
    // Add Manager Prompt
    function addManager() {
        inquirer.prompt([
            {
            type: "input",
            message: "Enter Manager Name:",
            name: "name",
            },
            {
            type: "input",
            message: "Enter Manager ID #:",
            name: "id",
            },
            {
            type: "input",
            message: "Enter Employee Email:",
            name: "email",
            },
            {
            type: "input",
            name: "officeNumber",
            message: "Enter Your Office Number:",
            }
        ]).then(answer => {
                const newManager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
                employeeArray.push(newManager);
                console.log(newManager);
                addTeam();
        });
    }

    // Chose employee role
    function addTeam() {
        inquirer
        .prompt([
            {
            type: "list",
            message: "What is the Employees Role?",
            name: "role",
            choices: [
                "Engineer",
                "Intern",
                "Finished adding team members",
            ]
            },
        ]).then(roleChoice => {
            switch(roleChoice.role) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    generate();
            };
        });
    } 
    
    // Add Engineer Prompt
    function addEngineer() {
        inquirer.prompt([    
            {
            type: "input",
            message: "Enter Engineer Name:",
            name: "name",
            },
            {
            type: "input",
            message: "Enter Engineer ID #:",
            name: "id",
            },
            {
            type: "input",
            message: "Enter Engineer Email:",
            name: "email",
            },
            {
            type: "input",
            name: "github",
            message: "Enter Engineer's GitHub Username:",
            },
        ]).then(answer => {           
            const newEngineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
            employeeArray.push(newEngineer);
            console.log(newEngineer);         
            addTeam();
        });
    }

    // Add Intern Prompt
    function addIntern() {
        inquirer.prompt([    
            {
            type: "input",
            message: "Enter Intern Name:",
            name: "name",
            },
            {
            type: "input",
            message: "Enter Intern ID #:",
            name: "id",
            },
            {
            type: "input",
            message: "Enter Intern Email:",
            name: "email",
            },
            {
            type: "input",
            name: "school",
            message: "What school does intern attend?",
            },
        ]).then(answer => {
            const newIntern = new Intern(answer.name, answer.id, answer.email, answer.school)
            employeeArray.push(newIntern);
            console.log(newIntern);            
            addTeam();
        });
    }

    // Write HTML file with team members
    function generate() {
        fs.writeFileSync(outputPath, render(employeeArray), "utf-8");
    }

    addManager();
}

teamBuidler();
