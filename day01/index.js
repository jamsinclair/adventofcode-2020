const fs = require('fs');
const path = require('path');

function getInputs () {
  return fs.readFileSync(path.resolve(__dirname, './input.txt'))
    .toString()
    .split('\n')
    .map(Number);
}

function findSumPair (target, options) {
  for (let i = 0; i < options.length; i++) {
    for (let j = i + 1; j < options.length; j++) {
      if (options[i] + options[j] === target) {
        return [options[i], options[j]];
      }
    }
  }

  return null;
}

function findSumTriplet (target, options) {
  for (let i = 0; i < options.length; i++) {
    for (let j =   i + 1; j < options.length; j++) {
      for (let k =   i + 1; k < options.length; k++) {
        if (options[i] + options[j] + options[k] === target) {
          return [options[i], options[j], options[k]];
        }
      }
    }
  }

  return null;
}

function part1 (inputs) {
  let [a, b] = findSumPair(2020, inputs);
  return a * b;
}

function part2 (inputs) {
  let [a, b, c] = findSumTriplet(2020, inputs);
  return a * b * c;
}

if (process.env.NODE_ENV !== 'test') {
  console.log(`Part 1: ${part1(getInputs())}`);
  console.log(`Part 2: ${part2(getInputs())}`);
}

module.exports = { part1, part2 };
