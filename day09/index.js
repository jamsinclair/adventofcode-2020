const fs = require('fs');
const path = require('path');

function getInputs () {
  return fs.readFileSync(path.resolve(__dirname, './input.txt'))
    .toString()
    .split('\n')
    .map(Number);
}

function findSumPair (value, options) {
  for (let [i, a] of options.entries()) {
    for (let [j, b] of options.entries()) {
      if (i === j) {
        continue;
      }
      if (a + b === value) {
        return [a,b];
      }
    }
  }

  return null;
}

function findNonSequenceXmasValue (inputs, preambleLength) {
  for (let i = preambleLength; i < inputs.length; i++) {
    const currentValue = inputs[i];
    const availableOptions = inputs.slice(i - preambleLength, i);
    const sumPair = findSumPair(currentValue, availableOptions);

    if (sumPair === null) {
      return currentValue;
    }
  }

  return null;
}

function init (inputs, preambleLength) {
  const invalidValue = findNonSequenceXmasValue(inputs, preambleLength);

  if (invalidValue === null) {
    throw new Error('No invalid sequence found');
  }

  console.log(`The invalid sequence value is ${invalidValue}`);
}

init(getInputs(), 25);
