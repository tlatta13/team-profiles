const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
employeeArray = [];

function teamBuidler() {
    
    function addManager() {
        inquirer.prompt([
            {
            type: "input",
            message: "Enter Manager Name",
            name: "name",
            },
            {
            type: "input",
            message: "Enter Manager ID #",
            name: "id",
            },
            {
            type: "input",
            message: "Enter Employee Email",
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
    function addEngineer() {
        inquirer.prompt([    
            {
            type: "input",
            message: "Enter Engineer Name:",
            name: "name",
            },
            {
            type: "input",
            message: "Enter Engineer ID #",
            name: "id",
            },
            {
            type: "input",
            message: "Enter Engineer Email",
            name: "email",
            },
            {
            type: "input",
            name: "github",
            message: "Enter Engineer's GitHub Username",
            },
        ]).then(answer => {           
            const newEngineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
            employeeArray.push(newEngineer);
            console.log(newEngineer);         
            addTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([    
            {
            type: "input",
            message: "Enter Intern Name:",
            name: "name",
            },
            {
            type: "input",
            message: "Enter Intern ID #",
            name: "id",
            },
            {
            type: "input",
            message: "Enter Intern Email",
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

    function generate() {
        fs.writeFileSync(outputPath, render(employeeArray), "utf-8");
    }

    addManager();
}

teamBuidler();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!
