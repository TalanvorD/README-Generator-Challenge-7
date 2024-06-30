const inquirer = require("inquirer");
const fs = require('fs');

const writeToFile = (title, description, installation, usage, credits, testing, license, github, email, repo, screenshot) => { // Takes in name, location, email and github arguments and writes a dynamic html file utilizing them
  fs.writeFile('generated-README.md', `
# ${title}

## Description

${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)
- [Repository](#repository)
- [Screenshot](#screenshot)

## Installation

${installation}

## Usage

${usage}

## License

${license} // This will need to be an created using a comparitive statement to generate the appropriate text

## Contributing

${credits}

## Tests
${testing} // Testing framework i.e. jest?

## Questions

For any questions:
Find me on github at ![${github}]https://github.com/${github}
Send me an email at ![${email}]mailto://${email}

## Repository

![${repo}]${repo}

## Screenshot

![${screenshot}](assets/images/${screenshot})`, (err) => err ? console.error(err) : console.log('Success!'));
  return;
};

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
        message: "How can people contribute to your project?",
        name: "credits"
    },
    {
        type: "input",
        message: "Testing?", // I'm assuming something like jest is supposed to be entered here
        name: "testing"
    },
    {
        type: "list",
        message: "Choose a license:",
        choices: ["None", "MIT License", "GNU AGPLv3", "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2", "Apache License 2", "Boost Software License 1", "The Unlicense"],
        name: "license"
    },
    {
        type: "input",
        message: "What is your github username?",
        name: "github"
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email"
    },
    {
        type: "input",
        message: "What is the URL for the repository?",
        name: "link"
    },
    {
        type: "input",
        message: "Add a screenshot from the assets/image folder:",
        name: "screenshot"
    }
  ])
  .then(response => {
    writeToFile(response.title, response.description, response.installation, response.usage, response.credits, response.testing, response.license, response.github, response.email, response.link, response.screenshot); // Calls the function to write the README.md
  });