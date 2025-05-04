import { printLogs } from './catchErrors.js';

export const currentWorkingDir = () => {
  printLogs(`\nYou are currently in ${process.cwd()}`);
};
