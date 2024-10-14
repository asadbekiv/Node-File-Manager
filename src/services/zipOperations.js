import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { catchAppErrors } from '../helpers/catchErrors.js';

export const compress = async (fileArgs) => {
  catchAppErrors(async () => {
    const currentWorkingDir = process.cwd();
    const [fileName, pathToDestination] = fileArgs;
    const pathFileToCompress = join(currentWorkingDir, fileName);
    const pathFileToCompressedFile = join(
      currentWorkingDir,
      pathToDestination,
      `${fileName}.br`
    );

    const input = createReadStream(pathFileToCompress);
    const output = createWriteStream(pathFileToCompressedFile);
    const brotli = createBrotliCompress();

    await pipeline(input, brotli, output);
  }, 'Compression failed, please check your file paths!');
};

export const decompress = async (fileArgs) => {
  catchAppErrors(async () => {
    const currentWorkingDir = process.cwd();
    const [compressedFileName, pathToDestination] = fileArgs;
    const pathFileToDecompress = join(currentWorkingDir, compressedFileName);
    const originalFileName = compressedFileName.replace(/\.br$/, '');
    const pathToDecompressedFile = join(
      currentWorkingDir,
      pathToDestination,
      originalFileName
    );

    const input = createReadStream(pathFileToDecompress);
    const output = createWriteStream(pathToDecompressedFile);
    const brotli = createBrotliDecompress();

    await pipeline(input, brotli, output);
  }, 'Decompression failed, please check your file paths!');
};
