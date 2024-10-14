import { homedir, userInfo, cpus, EOL, arch } from 'node:os';

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
