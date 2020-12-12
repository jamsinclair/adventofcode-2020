const fs = require('fs');
const path = require('path');

function getInputs () {
  return fs.readFileSync(path.resolve(__dirname, './input.txt'))
    .toString()
}

function getLimit (line) {
  return line.split(' ')[0].split('-').map(Number);
}

function getPositions (line) {
  return line.split(' ')[0].split('-').map(Number);
}

function getLetter (line) {
  return line.split(' ')[1].replace(':', '');
}

function getPassword (line) {
  return line.split(' ')[2];
}

function isValidPassword (password, letter, limit) {
  const letterCount = [...password].reduce((count, currentLetter) => {
    return currentLetter === letter ? count + 1 : count;
  }, 0);

  const [min, max] = limit;

  return letterCount >= min && letterCount <= max;
}

function isValidPasswordWithPositions (password, letter, positions) {
  const [pos1, pos2] = positions;
  const hasLetterAtPos1 = password[pos1-1] === letter;
  const hasLetterAtPos2 = password[pos2-1] === letter;
  return hasLetterAtPos1 !== hasLetterAtPos2;
}

function part1 (input) {
  const lines = input.split('\n');
  return lines.map(line => {
    const password = getPassword(line);
    const letter = getLetter(line);
    const limit = getLimit(line);
    return isValidPassword(password, letter, limit);
  }).reduce((count, result) => result ? count + 1 : count, 0);
}

function part2 (input) {
  const lines = input.split('\n');
  return lines.map(line => {
    const password = getPassword(line);
    const letter = getLetter(line);
    const positions = getPositions(line);
    return isValidPasswordWithPositions(password, letter, positions);
  }).reduce((count, result) => result ? count + 1 : count, 0);
}


if (process.env.NODE_ENV !== 'test') {
  console.log(`Part 1: ${part1(getInputs())}`);
  console.log(`Part 2: ${part2(getInputs())}`);
}

module.exports = { part1, part2 };
