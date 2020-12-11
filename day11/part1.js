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

function countAdjacentOccupiedSeatsInRow (row, seatNumber) {
  if (!Array.isArray(row)) {
    return 0;
  }
  let count = 0;
  if (row[seatNumber] === OCCUPIED_SEAT) {
    count += 1;
  }
  if (row[seatNumber - 1] === OCCUPIED_SEAT) {
    count += 1;
  }
  if (row[seatNumber + 1] === OCCUPIED_SEAT) {
    count += 1;
  }
  return count;
}

function countAdjacentOccupiedSeats (seatingArray, rowNumber, seatNumber) {
  const mod = seatingArray[rowNumber][seatNumber] === OCCUPIED_SEAT ? -1 : 0;
  return countAdjacentOccupiedSeatsInRow(seatingArray[rowNumber-1], seatNumber)
    + countAdjacentOccupiedSeatsInRow(seatingArray[rowNumber], seatNumber)
    + countAdjacentOccupiedSeatsInRow(seatingArray[rowNumber + 1], seatNumber)
    + mod;
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

      if (seat === OCCUPIED_SEAT && occupiedAdjacentSeats >= 4) {
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

  return countOccupiedSeats(currentSeatingArray);
}

if (process.env.NODE_ENV !== 'test') {
  console.log(`The seats occupied would be ${calculateOccupiedSeats(getInput())}`);
}

module.exports = { calculateOccupiedSeats };
