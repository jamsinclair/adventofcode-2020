const { part1, part2 } = require('.');

test('part1 finds 2 valid passwords', () => {
  const input = `
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
  `.trim();

  expect(part1(input)).toBe(2);
});

test('part2 finds 1 valid passwords', () => {
  const input = `
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
  `.trim();

  expect(part2(input)).toBe(1);
});
