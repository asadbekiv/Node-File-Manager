import { catchAppErrors, printError } from '../helpers/catchErrors.js';
import {
  userEOL,
  userMachineCpu,
  homeDir,
  currentSystemUserName,
  architectureCPU,
} from '../services/operatingSystem.js';

export const operatingSystemInfo = async (osArgs) => {
  const [flag] = osArgs || [];

  catchAppErrors(async () => {});

  switch (flag) {
    case '--EOL':
      userEOL();
      break;
    case '--cpus':
      userMachineCpu();
      break;
    case '--homedir':
      homeDir();
      break;
    case '--username':
      currentSystemUserName();
      break;
    case '--architecture':
      architectureCPU();
      break;
    default:
      printError('Invalid argument for  Operating System !');
  }
};
