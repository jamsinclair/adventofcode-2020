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

function findContiguousSum (value, options) {
  for (let [i, a] of options.entries()) {
    let sum = a;
    if (a >= value) {
      continue;
    }
    
    for (let [j, b] of options.slice(i + 1).entries()) {
      sum += b;
      if (b >= value || sum > value) {
        break;
      }

      if (sum === value) {
        const absoluteIndex = i + j + 2;
        return options.slice(i, absoluteIndex);
      }
    }
  }

  return null;
}

function findEncryptionWeakness (sequence) {
  const min = Math.min(...sequence);
  const max = Math.max(...sequence);
  return min + max;
}

function init (inputs, preambleLength) {
  const invalidValue = findNonSequenceXmasValue(inputs, preambleLength);

  if (invalidValue === null) {
    throw new Error('No invalid sequence found');
  }

  console.log(`The invalid sequence value is ${invalidValue}`);

  const contiguousSumOfInvalidValue = findContiguousSum(invalidValue, inputs);
  if (contiguousSumOfInvalidValue === null) {
    throw new Error('No contiguous sequence found');
  }

  console.log(`The contiguous sequence is ${contiguousSumOfInvalidValue}`);

  const encryptionWeakness = findEncryptionWeakness(contiguousSumOfInvalidValue);

  console.log(`The XMAS encryption weakness is ${encryptionWeakness}`);
}

init(getInputs(), 25);
