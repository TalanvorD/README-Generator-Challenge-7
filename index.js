const inquirer = require("inquirer");
const fs = require('fs');

const writeToFile = (title, description, installation, usage, credits, license, repo, screenshot) => { // Takes in name, location, email and github arguments and dynamically creates a README.md file utilizing them
    fs.writeFile('generated README.md', `
      <div class="six columns"><h3>Hello! My name is ${name}</h3></div>
      <div class="six columns"><h3>I am located in ${location}</h3></div>
    </div>
    <div class="row" style="margin-top: 5%">
      <div class="six columns"><h3>My e-mail is <a href="mailto:${email}">${email}</a></h3></div>
      <div class="six columns"><h3>My github is <a href=https://github.com/${github}> ${github} </a></h3></div>`,
       (err) => err ? console.error(err) : console.log('Success!'));
    return;
}

inquirer
  .prompt([ // Prompting the user for information regarding the README.md to be generated
    {
      type: "input",
      message: "What's the title of your project?",
      name: "title"
    },
    {
        type: "input",
        message: "Write a description for your project:",
        name: "description"
    },
    {
        type: "input",
        message: "How is your project installed?",
        name: "installation"
    },
    {
        type: "input",
        message: "How is your project used?",
        name: "usage"
    },
    {
        type: "input",
        message: "Are there any credits you would like to add?",
        name: "credits"
    },
    {
        type: "list",
        message: "Choose a license:",
        choices: ["None", "MIT License", "GNU AGPLv3", "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "Boost Software License 1.0", "The Unlicense"],
        name: "license"
    },
    {
        type: "input",
        message: "What is the URL for the repository?",
        name: "repo-link"
    },
    {
        type: "input",
        message: "Add a screenshot from the assets/image folder:",
        name: "screenshot"
    }
  ])
  .then(response => {
    writeToFile(response.title, response.description, response.installation, response.usage, response.credits, response.license, response.repo-link, response.screenshot); // Calls the function to write the README.md
});