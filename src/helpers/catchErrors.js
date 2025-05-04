export const printError = (text) => {
  console.log(`\x1b[31m${text}\x1b[0m`);
};

export const catchAppErrors = async (fn, message) => {
  try {
    await fn();
  } catch (error) {
    console.error('Error details:', error.message);
    printError(message);
  }
};

export const printLogs = (text) => {
  console.log(`\x1b[32m${text}\x1b[0m`);
};
