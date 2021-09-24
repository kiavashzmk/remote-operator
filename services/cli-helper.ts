import inquirer from 'inquirer';

async function askOperation() {
  const question = [
    {
      name: 'operation',
      type: 'list',
      message: 'Which operation should be run on your host?',
      choices: ['Install', 'Uninstall', 'Update'],
    },
  ];
  return inquirer.prompt(question);
}

async function askHostCredentials() {
  // TODO: validate entries;
  const questions = [
    {
      name: 'host',
      type: 'input',
      message: 'Enter your host ip address:',
      validate: function (value: any) {
        if (value.split('.').length === 4) {
          return true;
        } else {
          return 'Please enter valid ip.';
        }
      },
    },
    {
      name: 'port',
      type: 'input',
      message: 'Enter your host port:',
      validate: function (value: any) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter valid port number.';
        }
      },
    },
    {
      name: 'username',
      type: 'input',
      message: 'Enter your username:',
      validate: function (value: any) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your username.';
        }
      },
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password:',
      validate: function (value: any) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your password.';
        }
      },
    },
  ];
  return inquirer.prompt(questions);
}

export { askHostCredentials, askOperation };
