import { catchAppErrors, printError } from '../helpers/catchErrors.js';
import {
  goUpper,
  navigateFolder,
  printDirectoryContents,
} from '../services/navigationOperations.js';

export const navigationOperations = async (
  nArgs,
  navigationOperationArguments
) => {
  catchAppErrors(async () => {
    switch (nArgs) {
      case 'up':
        goUpper();
        break;
      case 'cd':
        navigateFolder(navigationOperationArguments);
        break;

      case 'ls':
        await printDirectoryContents();
        break;

      default:
        printError('Invalid arguments for navigation Operations !');
    }
  }),
    'Error occurred in Navigation Operations!';
};
