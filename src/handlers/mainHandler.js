import { cwd } from 'node:process';
import { basicNavigationOperations } from './basicNavigationOperationsHandler.js';
import { hashCalculate } from '../services/hashCalculation.js';
import { navigationOperations } from './navigationOperationsHandler.js';
import { operatingSystemInfo } from './operatingSystemHandler.js';
import { printError, catchAppErrors } from '../helpers/catchErrors.js';
import { zipOperation } from './zipOperationHandler.js';
import {
  fileSystemFlag,
  navigationFlag,
  zipFlags,
} from '../helpers/constants.js';

export const UserInput = async (userInput, closeReadLine) => {
  const [operationType, ...args] = userInput.trim().split(/\s+/g);
  const currentDirectory = cwd();

  catchAppErrors(
    async () => {
      if (operationType === 'os') {
        operatingSystemInfo(args);
      } else if (operationType in navigationFlag) {
        await navigationOperations(operationType, args);
      } else if (operationType in fileSystemFlag) {
        await basicNavigationOperations(operationType, args, currentDirectory);
      } else if (operationType in zipFlags) {
        await zipOperation(operationType, args);
      } else if (operationType === 'hash') {
        await hashCalculate(args, currentDirectory);
      } else if (operationType === '.exit') {
        closeReadLine();
      } else {
        printError('Invalid input');
      }
    },

    'An error occurred while processing the input:'
  );
};
