export const printError = (text) => {
  console.log(text);
};

export const catchAppErrors = async (fn, message) => {
  try {
    await fn();
  } catch (error) {
    console.error('Error details', error);
    printError(message);
  }
};
