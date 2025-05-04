import * as readline from 'node:readline/promises';
import { initApp } from './handlers/initApp.js';
import { UserInput } from './handlers/mainHandler.js';
import { currentWorkingDir } from './helpers/pathUtils.js';

const startFileMnager = async () => {
  try {
    const userName = await initApp();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const closeReadLine = () => {
      rl.close();
    };
    rl.on('line', async (line) => {
      await UserInput(line, closeReadLine);
      currentWorkingDir();
    });

    rl.on('close', () => {
      console.log(`\x1b[33mThank you for using File Manager, ${userName}, goodbye!\x1b[0m`);
    });

    rl.on('error', () => {
      console.log('Error happened !');
    });
  } catch (error) {
    console.error('Failed to initialize the app:', error);
  }
};

startFileMnager();
