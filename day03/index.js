const fs = require('fs');
const path = require('path');

const OPEN_SPACE = '.';
const TREE = '#';

function getInputs () {
  return fs.readFileSync(path.resolve(__dirname, './input.txt'))
    .toString()
}

function getGrid (input) {
  return input.split('\n').map(row => row.split(''));
}

function getNextPosition (x, rowLength) {
  const maxIndex = rowLength - 1;
  return x > maxIndex ? x - maxIndex - 1 : x;
}

function calculateTreesForPath (grid, distanceX, distanceY) {
  let trees = 0;
  let currentPosition = 0;

  for (let i = 0; i < grid.length; i += distanceY) {
    if (grid[i][currentPosition] === TREE) {
      trees += 1;
    }
    currentPosition = getNextPosition(currentPosition + distanceX, grid[i].length);
  }

  return trees;
}

function part1 (input) {
  const grid = getGrid(input);
  return calculateTreesForPath(grid, 3, 1);
}

function part2 (input) {
  const grid = getGrid(input);
  return [
    calculateTreesForPath(grid, 1, 1),
    calculateTreesForPath(grid, 3, 1),
    calculateTreesForPath(grid, 5, 1),
    calculateTreesForPath(grid, 7, 1),
    calculateTreesForPath(grid, 1, 2),
  ].reduce((acc, x) => acc * x, 1);
}


if (process.env.NODE_ENV !== 'test') {
  console.log(`Part 1: ${part1(getInputs())}`);
  console.log(`Part 2: ${part2(getInputs())}`);
}

module.exports = { part1, part2 };
