import { catchAppErrors, printError } from '../helpers/catchErrors.js';
import { compress, decompress } from '../services/zipOperations.js';

export const zipOperation = async (operationType, zipArgs) => {
  catchAppErrors(async () => {
    if (operationType === 'compress') {
      await compress(zipArgs);
    } else if (operationType === 'decompress') {
      await decompress(zipArgs);
    } else {
      printError('Invalid arguments for Basic Operations!');
    }
  }, 'Error occurred in Navigation Operations!');
};
