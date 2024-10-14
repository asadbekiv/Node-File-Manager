import { createReadStream } from 'node:fs';
import crypto from 'node:crypto';
import { join } from 'node:path';
import { catchAppErrors } from '../helpers/catchErrors.js';

export const hashCalculate = async (fileArgs, currentWorkingDir) => {
  catchAppErrors(async () => {
    const [pathToFileHash] = fileArgs;
    const pathToCalculateHash = join(currentWorkingDir, pathToFileHash);
    const hash = crypto.createHash('sha256');
    const input = createReadStream(pathToCalculateHash);

    input.on('error', (err) => {
      console.error('Error reading the file:', err);
    });
    input.pipe(hash);
    hash.on('readable', () => {
      const data = hash.read();
      if (data) {
        console.log(data.toString('hex')); // Output the hash in hex format
      }
    });
  }),
    'Check your path , hash calculation failed !';
};
