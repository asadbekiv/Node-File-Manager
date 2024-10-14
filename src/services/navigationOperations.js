import { chdir, cwd } from 'node:process';
import { dirname, normalize } from 'node:path';
import { catchAppErrors } from '../helpers/catchErrors.js';
import { readdir } from 'node:fs/promises';

export const goUpper = () => {
  catchAppErrors(async () => {
    const currentWorkingDir = cwd();
    const parentDirPath = dirname(currentWorkingDir);
    chdir(parentDirPath);
  }, 'Error,Please check your path !');
};

export const navigateFolder = async (navigationOperationArguments) => {
  catchAppErrors(async () => {
    const [destinationFolder] = navigationOperationArguments;
    const destinationFolderPath = normalize(destinationFolder);
    chdir(destinationFolderPath);
  }, 'Please check your path !');
};

export const printDirectoryContents = async () => {
  catchAppErrors(async () => {
    const currentWorkingDir = cwd(); // Assuming cwd is a function to get current working directory
    const directoryContents = await readdir(currentWorkingDir, {
      withFileTypes: true,
    });

    const sortedDirectoryContents = directoryContents.sort((a, b) => {
      if (a.isFile() === b.isFile()) {
        return a.name.localeCompare(b.name);
      }
      return a.isFile() ? 1 : -1;
    });

    const res = sortedDirectoryContents.map((file) => ({
      Name: file.name,
      Type: file.isFile() ? 'file' : 'directory',
    }));

    console.table(res);
  }, 'Error reading folder structure!');
};
