const os = require("os");
const path = require("path");
const { Worker } = require("node:worker_threads");

const userCPUCount = os.cpus().length;

const workerPath = path.resolve("factorial-worker.js");

const calculateFactorial = (number) => {
  if (number === 0) {
    return 1;
  }
  return new Promise(async (parentResolve, parentReject) => {
    const numbers = [];
    for (let i = 1n; i <= number; i++) {
      numbers.push(i);
    }

    const segmentSize = Math.ceil(numbers.length / userCPUCount);
    const segments = [];

    for (let segmentIndex = 0; segmentIndex < userCPUCount; segmentIndex++) {
      const start = segmentIndex * segmentSize;
      const end = start + segmentSize;
      const segment = numbers.slice(start, end);
      segments.push(segment);
    }

    try {
      const results = await Promise.all(
        segments.map(
          (segment) =>
            new Promise((resolve, reject) => {
              const worker = new Worker(workerPath, {
                workerData: segment,
              });
              worker.on("message", resolve);
              worker.on("error", reject);
              worker.on("exit", (code) => {
                if (code !== 0)
                  reject(new Error(`Worker stopped with exit code ${code}`));
              });
            })
        )
      );
      const finalResult = results.reduce((acc, val) => acc * val, 1n);
      parentResolve(finalResult);
    } catch (e) {
      parentReject(e);
    }
  });
};

const run = async (number) => {
  console.time("Calculated in");
  const result = await calculateFactorial(BigInt(number));
  console.timeEnd("Calculated in");
};

run(150000);
