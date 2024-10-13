import { homedir, userInfo, cpus, EOL, arch } from 'node:os';
import { catchErrors, printError } from '../helpers/catchErrors.js';

export const userEOL = () => {
  console.log(`EOL : ${JSON.stringify(EOL)}`);
};

export const userMachineCpu = () => {
  console.log(`Number of CPU cores: ${cpus().length}`);
  cpus().forEach((cpu, index) => {
    const clockRateInGHz = cpu.speed / 1000;
    console.log(
      `CPU Model:  ${cpu.model}, Clock rate : ${clockRateInGHz.toFixed(2)} GHz`
    );
  });
};

export const homeDir = () => {
  console.log(`Home directory: ${homedir()}`);
};

export const currentSystemUserName = () => {
  console.log(`User name: ${userInfo().username}`);
};

export const architectureCPU = () => {
  console.log(`CPU architecture: ${arch()}`);
};

const osActions = {
  '--EOL': userEOL,
  '--cpus': userMachineCpu,
  '--homedir': homeDir,
  '--username': currentSystemUserName,
  '--architecture': architectureCPU,
  default: () => printError('Invalid argument for Operating System!'),
};

const operatingSystemInfo = catchErrors(async (osArgs) => {
  const [flag] = osArgs || [];
  const action = osActions[flag] || osActions.default;
  action();
}, 'Error occurred in Operating System !');

// const operatingSystemInfo = catchErrors(async (osArgs) => {
//   const [flag] = osArgs || [];
//   switch (flag) {
//     case '--EOL':
//       userEOL();

//       break;

//     case '--cpus':
//       userMachineCpu();
//       break;

//     case '--homedir':
//       homeDir();
//       break;

//     case '--username':
//       currentSystemUserName();
//       break;

//     case '--architecture':
//       architectureCPU();
//       break;

//     default:
//       printError('Invalid argument for  Operating System !');
//   }
// }, 'Error occurred in Operating System !');
