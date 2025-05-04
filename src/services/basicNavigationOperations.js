import { createReadStream, createWriteStream } from 'node:fs';
import { rm, rename, writeFile, mkdir } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { join, resolve } from 'node:path';
import { catchAppErrors, printError } from '../helpers/catchErrors.js';

export const fileDelete = async (currentWorkingDir, deleteFile) => {
  catchAppErrors(async () => {
    const [fileToDelete] = deleteFile;
    const filePathToDelete = join(currentWorkingDir, fileToDelete);
    await rm(filePathToDelete);
  }),
    'Delete file opeation failed!';
};
export const fileCreate = async (currentWorkingDir, createFile) => {
  catchAppErrors(async () => {
    const [fileName] = createFile;
    if (!fileName) {
      return printError('Invaild file name!');
    }
    const filePathToCreate = join(currentWorkingDir, fileName);
    await writeFile(filePathToCreate, ' ', { flag: 'wx' });
  }),
    'Create file opeation fail!';
};

export const directoryCreate = async (currentWorkingDir, createDir) => {
  catchAppErrors(async () => {
    const [dirName] = createDir;

    if (!dirName) {
      console.error('Invalid directory name!.Please provide directory name');
    }
    const dirPathToCreate = join(currentWorkingDir, dirName);
    await mkdir(dirPathToCreate);
  }),
    'Create directory operation fail !';
};

export const fileRename = async (currentWorkingDir, fileToRename) => {
  catchAppErrors(async () => {
    const [filePathToRename, newFileName] = fileToRename;
    const fileToRenamePath = join(currentWorkingDir, filePathToRename);
    const fileNamePath = join(currentWorkingDir, newFileName);
    await rename(fileToRenamePath, fileNamePath);
  }),
    'Rename file operation fail !';
};

export const fileRead = async (currentWorkingDir, fileToRead) => {
  catchAppErrors(async () => {
    const [fileNameToRead] = fileToRead;
    const filePathToRead = join(currentWorkingDir, fileNameToRead);
    const fileData = await new Promise((resolve, reject) => {
      let readStream = createReadStream(filePathToRead, 'utf8');
      let s = '';

      readStream.on('data', (data) => {
        s = s + data;
      });
      readStream.on('close', () => {
        resolve(s);
      });
      readStream.on('error', (e) => {
        reject(e);
      });
    });
    process.stdout.write(fileData);
  }),
    'Read file operation fail !';
};

export const fileCopy = async (currentWorkingDir, copyFile) => {
  catchAppErrors(async () => {
    const [fileNameToCopy, desFolderName] = copyFile;

    if (!fileNameToCopy || !desFolderName) {
      return printError('Invalid file name or folder name!');
    }
    const filePathToCopy = join(currentWorkingDir, fileNameToCopy);
    const absDesFolderPath = resolve(currentWorkingDir, desFolderName);
    const desFilePath = join(absDesFolderPath, fileNameToCopy);

    const readStream = createReadStream(filePathToCopy, { encoding: 'utf8' });
    const writeStream = createWriteStream(desFilePath);
    await pipeline(readStream, writeStream);
  }),
    'Copy file operation fail !';
};

export const fileMove = async (currentWorkingDir, moveFile) => {
  catchAppErrors(async () => {
    const [fileNameToMove, destinationFolderName] = moveFile;
    if (!fileNameToMove || !destinationFolderName) {
      return printError('Invalid file name or folder name !');
    }
    const filePathToMove = join(currentWorkingDir, fileNameToMove);
    const absDesFolderPath = resolve(currentWorkingDir, destinationFolderName);
    const desFilePath = join(absDesFolderPath, fileNameToMove);
    const readStream = createReadStream(filePathToMove);
    const writeStream = createWriteStream(desFilePath);
    await pipeline(readStream, writeStream);
    await rm(join(currentWorkingDir, fileNameToMove));
  }),
    'Move file operation fail !';
};
