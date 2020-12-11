const fs = require('fs');
const path = require('path');

function getInputs () {
  return fs.readFileSync(path.resolve(__dirname, './input.txt'))
    .toString()
    .split('\n')
    .map(Number);
}

function getJoltageDifferences (adapters) {
  const startingJoltage = 0;
  const sortedAdapters = [...adapters].sort((a, b) => a - b)
  const differences = {
    [3]: 1 // The last built-in adapter always has a difference of 3
  };

  sortedAdapters.reduce((acc, currentValue) => {
    const difference = currentValue - acc;

    if (difference > 3) {
      throw new Error('difference is greater than max of 3')
    }

    if (difference < 1) {
      throw new Error('difference is less than minimum of 1')
    }

    const currentCount = differences[difference] || 0;
    differences[difference] = currentCount + 1;
    return currentValue;
  }, startingJoltage);

  return differences;
}

// Still don't understand this problem
// Copied from https://github.com/smrq/advent-of-code/blob/master/2020/10b.js
// 😞😞😞😞😞😞😞😞😞😞😞😞😞😞😞😞😞😞😞😞😞😞😞😞
function cheat(input) {
  const adapters = [0, ...input, Math.max(...input) + 3].sort((a, b) => a - b);
  const ways = new Array(adapters.length).fill(0);
  ways[0] = 1;

  for (let i = 0; i < adapters.length; ++i) {
    for (let j = i + 1; j < adapters.length; ++j) {
      if (adapters[j] - adapters[i] > 3) break;
      ways[j] += ways[i];
    }
  }

  return ways[ways.length - 1];
}

function init (inputs) {
  const differences = getJoltageDifferences(inputs);
  console.log('Found joltage differences of', differences);

  const result = differences[1] * differences[3];
  console.log(`The multiplied joltage differences is ${result}`)

  console.log(`The total possible arrangements is ${cheat(inputs)}`);
}

init(getInputs())