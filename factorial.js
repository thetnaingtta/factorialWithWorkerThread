const calculateFactorial = (number) => {
    if (number === 0) {
        return 1;
      }
    else {
    const numbers = [];
    for (let i = 1n; i <= number; i++)
    {
      numbers.push(i)
    }
        const result = numbers.reduce((acc,val) => acc * val, 1n);
        return result;
    } 
}

console.time('Calculated in')
const result = calculateFactorial(BigInt(10));
console.log(result);
console.timeEnd('Calculated in')