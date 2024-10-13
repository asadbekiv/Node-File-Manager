import { createReadStream } from 'node:fs';
const { createHash } = await import('node:crypto');
import { join } from 'node:path';
import { catchErrors } from '../helpers/catchErrors';

export const hashCalculate = catchErrors(async (fileArgs) => {
  const [pathToFileHash] = fileArgs;
  const currentWorkingDir = process.cwd();
  const pathToCalculateHash = join(currentWorkingDir, pathToFileHash);
  const input = createReadStream(pathToCalculateHash);
  const hash = createHash('shs256');

  input.pipe(hash).on('finish', () => {
    console.log(hash.digest('hex'));
  });
}, 'Check your path , hash calculation failed !');
