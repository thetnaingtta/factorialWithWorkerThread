const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("node:worker_threads");

//get the array of numbers
const numbers = workerData;

const calculateFactorial = (numArray) =>
  numArray.reduce((acc, val) => acc * val, 1n);

//calculate the result
const result = calculateFactorial(numbers);
parentPort.postMessage(result);
