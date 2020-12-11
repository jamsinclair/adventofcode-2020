const part1 = require('./part1');
const part2 = require('./part2');

test('Part 1 returns 37 occupied seats for simple input', () => {
  const input = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
  `.trim();

  expect(part1.calculateOccupiedSeats(input)).toBe(37);
});

test('Part 2 returns 26 occupied seats for simple input', () => {
  const input = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
  `.trim();

  expect(part2.calculateOccupiedSeats(input)).toBe(26);
});
