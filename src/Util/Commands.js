const { exec, execSync } = require('child_process');

const ERRORS = {
  busy: 'Another active Homebrew update process is already in progress.',
};

export const installati = () => {
  const comando = 'brew list --cask';

  let ris = execSync(comando).toString();

  return ris.split('\n');
};

export const run = (str) => {
  console.log('eseguo ', str);
  let comando = exec(str);

  comando.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  comando.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);

    if (data.includes(ERRORS.busy)) {
      alert('is busy, pls try again later');
      comando = null;
    }
  });

  comando.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  return comando;
};

export const install = (nome) => {
  let comando = exec(`brew install ${nome}`);

  comando.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  comando.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);

    if (data.includes(ERRORS.busy)) {
      alert('is busy, pls try again later');
      comando = null;
    }
  });

  comando.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  return comando;
};
