import { copyFile, createReadStream, createWriteStream } from 'node:fs';
import { rm, rename, writeFile } from 'node:fs:promises';
import { pipeline } from 'node:stream/promises';
import { join, resolve } from 'node:path';
import { catchErrors, printError } from '../helpers/catchErrors';

const fileDelete = catchErrors(async (currentWorkingDir, deleteFile) => {
  const [fileToDelete] = deleteFile;
  const filePathToDelete = join(currentWorkingDir, fileToDelete);
  await rm(filePathToDelete);
}, 'Delete file opeation failed!');

const fileCreate = catchErrors(async (currentWorkingDir, createFile) => {
  const [fileName] = createFile;
  if (!fileName) {
    return printError('Invaild file name!');
  }
  const filePathToCreate = join(currentWorkingDir, fileName);
  await writeFile(filePathToCreate, ' ', { flag: 'wx' });
}, 'Create file opeation fail!');

const fileRename = catchErrors(async (currentWorkingDir, fileToRename) => {
  const [filePathToRename, newFileName] = fileToRename;
  const fileToRenamePath = join(currentWorkingDir, filePathToRename);
  const fileNamePath = join(currentWorkingDir, newFileName);
  await rename(fileToRenamePath, fileNamePath);
}, 'Rename file operation fail !');

const fileRead = catchErrors(async (currentWorkingDir, fileToRead) => {
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
}, 'Read file operation fail !');

const fileCopy = catchErrors(async (currentWorkingDir, copyFile) => {
  const [fileNameToCopy, desFolderName] = copyFile;
  if (!fileNameToCopy || !desFolderName) {
    return printError('Invalid args to copy file !');
  }
  const filePathToCopy = join(currentWorkingDir, fileNameToCopy);
  const absDesFolderPath = resolve(currentWorkingDir, desFolderName);
  const desFilePath = join(absDesFolderPath, fileNameToCopy);

  const readStream = createReadStream(filePathToCopy, { encoding: 'utf8' });
  const writeStream = createWriteStream(desFilePath);
  await pipeline(readStream, writeStream);
}, 'Copy file operation fail !');

const fileMove = catchErrors(async (currentWorkingDir, moveFile) => {
  await fileCopy(currentWorkingDir, moveFile);
  await fileDelete(currentWorkingDir, moveFile);
}, 'Move file operation fail !');

export const basicOperations = catchErrors(
  async (operationType, basicOperations, currentWorkingDir) => {
    switch (operationType) {
      case 'cat':
        await fileRead(currentWorkingDir, basicOperations);
        break;
      case 'add':
        await fileCreate(currentWorkingDir, basicOperations);
        break;
      case 'rn':
        await fileRename(currentWorkingDir, basicOperations);
        break;
      case 'cp':
        await fileCopy(currentWorkingDir, basicOperations);
        break;
      case 'mv':
        await fileMove(currentWorkingDir, basicOperations);
        break;
      case 'rm':
        await fileDelete(currentWorkingDir, basicOperations);
        break;

      default:
        printError('Invalid arguments for Basic Operations !');
    }
  },
  'Error occurred in Basic Operation !'
);
