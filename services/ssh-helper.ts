import { NodeSSH } from 'node-ssh';
import { Client } from 'ssh2';
import cliProgress from 'cli-progress';
import chalk from 'chalk';
const ssh = new NodeSSH();

interface sshConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  passphrase?: string;
  privateKey?: string;
}

// connects and upload file to remote over SSH connection.
async function validateCredentials(config: sshConfig) {
  try {
    await ssh.connect(config);
    if (ssh.isConnected()) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

async function upload(config: sshConfig) {
  try {
    await ssh.connect(config);
    await ssh.requestShell();
    await ssh.putFile(
      '/Users/apple/node-projects/remote-operator.tar.gz',
      '/root/remote-operator.tar.gz'
    );
    console.log(chalk.blue('Uploaded to resource'));
    ssh.execCommand('tar -xf remote-operator.tar.gz', { cwd: '/root' });
    install(config);
  } catch (error) {
    console.log(chalk.red(error));
    throw Error('something went wrong');
  }
}

function install(config: sshConfig) {
  const conn = new Client();
  conn
    .on('ready', () => {
      console.log(chalk.blue('installing...'));
      const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
      let bar = 0;
      bar1.start(100, bar);

      conn.shell((err: any, stream: any) => {
        if (err) throw err;
        stream
          .on('close', () => {
            bar1.update(100);
            bar1.stop();
            console.log(chalk.green('application intalled'));
            conn.end();
          })
          .on('data', (data: any) => {
            bar1.increment(1);
          });
        stream.end('rm -rf remote-operator.tar.gz\ncd remote-operator\nnpm i\nexit\n');
      });
    })
    .connect(config);
}

async function uninstall(config: sshConfig) {
  try {
    await ssh.connect(config);
    await ssh.requestShell();
    await ssh.execCommand('rm -rf remote-operator', { cwd: '/root' });
    console.log(chalk.green('application removed'));
    // console.log(chalk.grey('application Unintalled'));
  } catch (error) {
    throw Error('something went wrong');
  }
}

export { validateCredentials, upload, uninstall };
