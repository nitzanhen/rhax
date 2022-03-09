
import { sum, sumItems } from 'number';

const numbers = [-11, -10, 19, 11, 8, -5, -7, 15];
const items = [
  { a: 6, b: -13 },
  { a: 4, b: 19 },
  { a: 19, b: -17 },
  { a: -7, b: -6 },
  { a: -6, b: 8 },
  { a: -13, b: -14 },
  { a: -1, b: 20 },
  { a: -16, b: 3 },
];
type Item = typeof items[0]

describe('sum', () => {

  test('sum(...numbers)', () => {
    expect(sum(1, 2, 3, 4)).toBe(10);
    expect(sum(...numbers)).toBe(20);

    expect(sum(...numbers.map(n => -n))).toBe(-20);
  });

  test('sum([...numbers])', () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
    expect(sum(numbers)).toBe(20);

    expect(sum(numbers.map(n => -n))).toBe(-20);

  });

  test('sumItems', () => {
    expect(sumItems(items, ({ a }) => a)).toEqual(-14);
    expect(sumItems(items, ({ b }) => b)).toEqual(0);
    expect(sumItems(items, ({ a, b }) => a + b)).toEqual(-14);
    expect(sumItems(items, ({ a, b }) => Math.abs(a) + Math.abs(b))).toEqual(172);
  });

  test('sumItems (curried)', () => {
    expect(sumItems<Item>(({ a }) => a)(items)).toEqual(-14);
    expect(sumItems<Item>(({ b }) => b)(items)).toEqual(0);
    expect(sumItems(({ a, b }) => a + b)(items)).toEqual(-14);
    expect(sumItems(({ a, b }) => Math.abs(a) + Math.abs(b))(items)).toEqual(172);
  });
});