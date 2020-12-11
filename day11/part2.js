const fs = require('fs');
const path = require('path');

const EMPTY_SEAT = 'L';
const OCCUPIED_SEAT = '#';
const FLOOR = '.';

function getInput () {
  return fs.readFileSync(path.resolve(__dirname, './input.txt')).toString();
}

function getSeatingArray (input) {
  return input.split('\n').map(str => str.split(''));
}

function hasDifference (a, b) {
  return a.some((value, index) => {
    if (Array.isArray(value)) {
      return hasDifference(value, b[index]);
    }
    return value !== b[index];
  });
}

function getHorizontalOccupiedSeat (row, seatNumber, direction) {
  seatNumber += direction === 'left' ? -1 : 1;

  if (seatNumber < 0 || seatNumber === row.length) {
    return 0;
  }

  if (row[seatNumber] === OCCUPIED_SEAT) {
    return 1;
  }

  if (row[seatNumber] === EMPTY_SEAT) {
    return 0;
  }

  return getHorizontalOccupiedSeat(row, seatNumber, direction);
}

function getVerticalOccupiedSeat (seatingArray, rowNumber, seatNumber, direction) {
  rowNumber += direction === 'down' ? -1 : 1;

  if (rowNumber < 0 || rowNumber === seatingArray.length) {
    return 0;
  }

  if (seatingArray[rowNumber][seatNumber] === OCCUPIED_SEAT) {
    return 1;
  }

  if (seatingArray[rowNumber][seatNumber] === EMPTY_SEAT) {
    return 0;
  }

  return getVerticalOccupiedSeat(seatingArray, rowNumber, seatNumber, direction);
}

function getDiagonalOccupiedSeat (seatingArray, rowNumber, seatNumber, directionX, directionY) {
  rowNumber += directionY === 'down' ? -1 : 1;
  seatNumber += directionX === 'left' ? -1 : 1;

  if (rowNumber < 0 || rowNumber === seatingArray.length) {
    return 0;
  }

  if (seatNumber < 0 || seatNumber === seatingArray[rowNumber].length) {
    return 0;
  }

  if (seatingArray[rowNumber][seatNumber] === OCCUPIED_SEAT) {
    return 1;
  }

  if (seatingArray[rowNumber][seatNumber] === EMPTY_SEAT) {
    return 0;
  }

  return getDiagonalOccupiedSeat(seatingArray, rowNumber, seatNumber, directionX, directionY);
}

function countAdjacentOccupiedSeats (seatingArray, rowNumber, seatNumber) {
  return getHorizontalOccupiedSeat(seatingArray[rowNumber], seatNumber, 'left')
    + getHorizontalOccupiedSeat(seatingArray[rowNumber], seatNumber, 'right')
    + getVerticalOccupiedSeat(seatingArray, rowNumber, seatNumber, 'up')
    + getVerticalOccupiedSeat(seatingArray, rowNumber, seatNumber, 'down')
    + getDiagonalOccupiedSeat(seatingArray, rowNumber, seatNumber, 'left', 'up')
    + getDiagonalOccupiedSeat(seatingArray, rowNumber, seatNumber, 'left', 'down')
    + getDiagonalOccupiedSeat(seatingArray, rowNumber, seatNumber, 'right', 'up')
    + getDiagonalOccupiedSeat(seatingArray, rowNumber, seatNumber, 'right', 'down')
}

function seatUpdateRound (seatingArray) {
  return seatingArray.map((row, rowNumber) => {
    return row.map((seat, seatNumber) => {
      if (seat === FLOOR) {
        return FLOOR;
      }

      let occupiedAdjacentSeats = countAdjacentOccupiedSeats(seatingArray, rowNumber, seatNumber);

      if (seat === EMPTY_SEAT && occupiedAdjacentSeats === 0) {
        return OCCUPIED_SEAT;
      }

      if (seat === OCCUPIED_SEAT && occupiedAdjacentSeats >= 5) {
        return EMPTY_SEAT;
      }

      return seat;
    });
  });
}

function countOccupiedSeats (seatingArray) {
  let count = 0;
  seatingArray.forEach(row => {
    row.forEach(seat => {
      if (seat === OCCUPIED_SEAT) {
        count += 1;
      }
    });
  });
  return count;
}

function calculateOccupiedSeats (input) {
  let previousSeatingArray = getSeatingArray(input);
  let currentSeatingArray = getSeatingArray(input);
  let hasSeatingArrayChanged = true;

  while (hasSeatingArrayChanged) {
    previousSeatingArray = currentSeatingArray
    currentSeatingArray = seatUpdateRound(currentSeatingArray);
    hasSeatingArrayChanged = hasDifference(previousSeatingArray, currentSeatingArray);
  }

  return countOccupiedSeats(seatUpdateRound(currentSeatingArray));
}

if (process.env.NODE_ENV !== 'test') {
  console.log(`The seats occupied would be ${calculateOccupiedSeats(getInput())}`);
}

module.exports = { calculateOccupiedSeats };
