const os = require("os");

const userCPUCores = os.cpus();
const userCPUCoresCount = os.cpus().length;

console.log(userCPUCores, userCPUCoresCount)


