import { catchAppErrors, printError } from '../helpers/catchErrors.js';

import {
  fileRead,
  fileCreate,
  fileRename,
  fileCopy,
  fileMove,
  fileDelete,
} from '../services/basicNavigationOperations.js';

export const basicNavigationOperations = async (
  operationType,
  args,
  currentWorkingDir
) => {
  catchAppErrors(async () => {
    if (operationType === 'cat') {
      await fileRead(currentWorkingDir, args);
    } else if (operationType === 'add') {
      console.log('Executing fileCreate operation');
      await fileCreate(currentWorkingDir, args);
    } else if (operationType === 'rn') {
      console.log('Executing fileRename operation');
      await fileRename(currentWorkingDir, args);
    } else if (operationType === 'cp') {
      console.log('Executing fileCopy operation');
      await fileCopy(currentWorkingDir, args);
    } else if (operationType === 'mv') {
      console.log('Executing fileMove operation');
      await fileMove(currentWorkingDir, args);
    } else if (operationType === 'rm') {
      console.log('Executing fileDelete operation');
      await fileDelete(currentWorkingDir, args);
    } else {
      printError('Invalid arguments for Basic Operations!');
    }
  }),
    'Error occurred in Basic Operation!';
};
