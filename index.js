const inquirer = require("inquirer");
const fs = require('fs');

const writeToFile = (name, location, email, github) => { // Takes in name, location, email and github arguments and dynamically creates a README.md file utilizing them
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
      message: "What's your name?",
      name: "name"
    },
    {
        type: "input",
        message: "What's your location?",
        name: "location"
    },
    {
        type: "input",
        message: "What's your e-mail address?",
        name: "email"
    },
    {
        type: "input",
        message: "What's your github handle?",
        name: "github"
    }
  ])
  .then(response => {
    writeToFile(response.name, response.location, response.email, response.github); // Calls the function to write the README.md
});