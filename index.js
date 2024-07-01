const inquirer = require("inquirer");
const fs = require('fs');
const licenseArray = 
  [{
    licenseName: "None",
    licenseBadge: "",
    licenseURL: ""
  },
  {
    licenseName: "MIT License",
    licenseBadge: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    licenseURL: "https://spdx.org/licenses/MIT.html"
  },
  {
    licenseName: "GNU AGPLv3",
    licenseBadge: "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)",
    licenseURL: "https://spdx.org/licenses/AGPL-3.0-or-later.html"
  },
  {
    licenseName: "GNU General Public License v3.0",
    licenseBadge: "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
    licenseURL: "https://spdx.org/licenses/GPL-3.0-or-later.html"
  },
  {
    licenseName: "Mozilla Public License 2",
    licenseBadge: "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
    licenseURL: "https://spdx.org/licenses/MPL-2.0.html"
  },
  {
    licenseName: "Apache License 2",
    licenseBadge: "",
    licenseURL: "https://spdx.org/licenses/Apache-2.0.html"
  },
  {
    licenseName: "The Unlicense",
    licenseBadge: "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
    licenseURL: "https://spdx.org/licenses/Unlicense.html"
  },
  {
    licenseName: "Boost Software License 1",
    licenseBadge: "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
    licenseURL: "https://spdx.org/licenses/BSL-1.0.html"
  }
];

const writeToFile = (title, description, installation, usage, credits, testing, license, github, email, repo, screenshot) => { // Takes in name, location, email and github arguments and writes a dynamic html file utilizing them
  const licenseObject = licenseArray.find(({ licenseName }) => licenseName === license); // Finding the specific object in the licenseArray
  
  fs.writeFile('generated-README.md', `
# ${title} ${licenseObject.licenseBadge}

## Description

${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)
- [Repository](#repository)

## Installation

${installation}

## Usage

${usage}

## License

[${licenseObject.licenseName}](${licenseObject.licenseURL})

## Contributing

${credits}

## Tests
${testing}

## Questions

For any questions:

Find me on [github](https://github.com/${github})!

Send me an [email](mailto://${email})!

## Repository

[${repo}](${repo})`, (err) => err ? console.error(err) : console.log('Success!'));
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
        type: "editor",
        message: "Write a description for your project.",
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
        message: "Testing done?",
        name: "testing"
    },
    {
        type: "list",
        loop: false,
        message: "Choose a license:",
        choices: licenseArray.map(it => it.licenseName), // Pulling the licenseName property of each object to use as a list of choices
        name: "license",
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
    }
  ])
  .then(response => {
    writeToFile(response.title, response.description, response.installation, response.usage, response.credits, response.testing, response.license, response.github, response.email, response.link, response.screenshot); // Calls the function to write the README.md
  });