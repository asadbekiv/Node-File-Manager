import { homedir } from 'node:os';
import { currentWorkingDir } from '../helpers/pathUtils.js';

function getUserName(args) {
  const usernameArg = args.find((arg) => arg.startsWith('--username='));
  return usernameArg ? usernameArg.split('=')[1] : null;
}
export const initApp = () => {
  const userName = getUserName(process.argv.slice(2));

  try {
    if (!userName) {
      throw new invalidUserNameError();
    }

    console.log(`Welcome to the File Manager, ${userName}!`);
    const homeDir = homedir();
    process.chdir(homeDir);
    currentWorkingDir();

    return userName;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

class invalidUserNameError extends Error {
  constructor() {
    super(
      `\n Invalid username argument.\n Please start File Manager with comman: \n 'npm run start -- --username=your_username' `
    );
    this.name = `invalidUserNameError`;
  }
}
