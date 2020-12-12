const { part1, part2 } = require('./');

test('multiplies pair that sum up to 2020', () => {
  const input = [
  1721,
  979,
  366,
  299,
  675,
  1456,
];

  expect(part1(input)).toBe(514579);
});

test('multiplies three entries that sum up to 2020', () => {
  const input = [
  1721,
  979,
  366,
  299,
  675,
  1456,
];

  expect(part2(input)).toBe(241861950);
});
