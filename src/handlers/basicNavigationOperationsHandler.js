import {
  catchAppErrors,
  printError,
  printLogs,
} from '../helpers/catchErrors.js';

import {
  fileRead,
  fileCreate,
  fileRename,
  fileCopy,
  fileMove,
  fileDelete,
  directoryCreate,
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
      printLogs('Executing fileCreate operation');
      await fileCreate(currentWorkingDir, args);
    } else if (operationType === 'mkdir') {
      printLogs('Executing directoryCreate operation');
      await directoryCreate(currentWorkingDir, args);
    } else if (operationType === 'rn') {
      printLogs('Executing fileRename operation');
      await fileRename(currentWorkingDir, args);
    } else if (operationType === 'cp') {
      printLogs('Executing fileCopy operation');
      await fileCopy(currentWorkingDir, args);
    } else if (operationType === 'mv') {
      printLogs('Executing fileMove operation');
      await fileMove(currentWorkingDir, args);
    } else if (operationType === 'rm') {
      printLogs('Executing fileDelete operation');
      await fileDelete(currentWorkingDir, args);
    } else {
      printError('Invalid arguments for Basic Operations!');
    }
  }),
    'Error occurred in Basic Operation!';
};
