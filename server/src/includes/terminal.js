var program = require('commander');
var inquirer = require('inquirer');

class Terminal {
    constructor() {
       // program
       //  .version('0.0.1')
       //  .description('Contact management system');


       //  program
       //    .command('addContact')
       //    .alias('a')
       //    .description('Add a contact')
       //    .action(() => {
       //      this.prompt()
       //    });
        
        // program.parse(process.argv);
    }

    prompt() {
        inquirer
          .prompt([
              {
                type : 'input',
                name : 'command',
                message : 'Enter Command: '
              },
          ])
          .then(answers => {
            console.log(eval(answers.command))
            this.prompt()
          });
    }
}


module.exports = new Terminal()