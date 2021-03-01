import { clamp } from '../utils';

describe('utils', () => {
  test('clamp', () => {
    const data: [number, number, number, number][] = [
      [1, 3, 2, 2],
      [1, 3, 0, 1],
      [1, 3, 4, 3],
      [1, 3, 1, 1],
      [1, 3, 3, 3],
      [1, 3, Math.PI, 3],
      [1, 3, Math.PI / 2, Math.PI / 2]
    ];

    for (const [min, max, x, result] of data) {
      expect(clamp(min, max, x)).toBe(result);
    }
  });
});