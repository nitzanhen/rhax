import { min, minItem } from 'number';

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

describe('min', () => {

  test('min(...numbers)', () => {
    expect(min(1, 2, 3, 4)).toBe(1);
    expect(min(...numbers)).toBe(-11);

    expect(min(...numbers.map(n => -n))).toBe(-19);
  });

  test('min([...numbers])', () => {
    expect(min([1, 2, 3, 4])).toBe(1);
    expect(min(numbers)).toBe(-11);

    expect(min(numbers.map(n => -n))).toBe(-19);

  });

  test('minItem', () => {
    expect(minItem(items, ({ a }) => a)).toEqual({ a: -16, b: 3 });
    expect(minItem(items, ({ b }) => b)).toEqual({ a: 19, b: -17 });
    expect(minItem(items, ({ a, b }) => a + b)).toEqual({ a: -13, b: -14 });
    expect(minItem(items, ({ a, b }) => Math.abs(a) + Math.abs(b))).toEqual({ a: -7, b: -6 });
  });

  test('minItem (curried)', () => {
    expect(minItem<Item>(({ a }) => a)(items)).toEqual({ a: -16, b: 3 });
    expect(minItem<Item>(({ b }) => b)(items)).toEqual({ a: 19, b: -17 });
    expect(minItem(({ a, b }) => a + b)(items)).toEqual({ a: -13, b: -14 });
    expect(minItem(({ a, b }) => Math.abs(a) + Math.abs(b))(items)).toEqual({ a: -7, b: -6 });
  });
});