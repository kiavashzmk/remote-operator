#!/usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';

import { askHostCredentials, askOperation } from '../services/cli-helper';
import { uninstall, upload, validateCredentials } from '../services/ssh-helper';

const run = async () => {
  console.clear();
  console.log(chalk.yellow(figlet.textSync('Remote Opt', { horizontalLayout: 'full' })));
  const config = await askHostCredentials();
  console.clear();
  if (!(await validateCredentials(config))) {
    console.log(chalk.red('Invalid Credentials'));
    return;
  }
  const operation = (await askOperation()).operation;
  console.log(operation);
  switch (operation) {
    case 'Install':
      console.clear();
      return await upload(config);
    case 'Uninstall':
      console.clear();
      return uninstall(config);
  }
};

run();
