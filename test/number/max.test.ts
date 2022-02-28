import { max, maxItem } from 'number';

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

describe('max', () => {

  test('max(...numbers)', () => {
    expect(max(1, 2, 3, 4)).toBe(4);
    expect(max(...numbers)).toBe(19);

    expect(max(...numbers.map(n => -n))).toBe(11);
  });

  test('max([...numbers])', () => {
    expect(max([1, 2, 3, 4])).toBe(4);
    expect(max(numbers)).toBe(19);

    expect(max(numbers.map(n => -n))).toBe(11);

  });

  test('maxItem', () => {
    expect(maxItem(items, ({ a }) => a)).toEqual({ a: 19, b: -17 });
    expect(maxItem(items, ({ b }) => b)).toEqual({ a: -1, b: 20 });
    expect(maxItem(items, ({ a, b }) => a + b)).toEqual({ a: 4, b: 19 });
    expect(maxItem(items, ({ a, b }) => Math.abs(a) + Math.abs(b))).toEqual({ a: 19, b: -17 });
  });

  test('maxItem (curried)', () => {
    expect(maxItem<Item>(({ a }) => a)(items)).toEqual({ a: 19, b: -17 });
    expect(maxItem<Item>(({ b }) => b)(items)).toEqual({ a: -1, b: 20 });
    expect(maxItem(({ a, b }) => a + b)(items)).toEqual({ a: 4, b: 19 });
    expect(maxItem(({ a, b }) => Math.abs(a) + Math.abs(b))(items)).toEqual({ a: 19, b: -17 });
  });
});