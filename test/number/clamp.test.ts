import { clamp } from 'number';

describe('clamp', () => {

  test('clamp', () => {
    expect(clamp(1, [0, 2])).toBe(1);

    expect(clamp(-Infinity, [0, 2])).toBe(0);
    expect(clamp(-1, [0, 2])).toBe(0);
    expect(clamp(0, [0, 2])).toBe(0);

    expect(clamp(Infinity, [0, 2])).toBe(2);
    expect(clamp(3, [0, 2])).toBe(2);
    expect(clamp(2, [0, 2])).toBe(2);
  });

  test('clamp (curried)', () => {
    expect(clamp([0, 2])(1)).toBe(1);

    expect(clamp([0, 2])(-Infinity)).toBe(0);
    expect(clamp([0, 2])(-1)).toBe(0);
    expect(clamp([0, 2])(0)).toBe(0);


    expect(clamp([0, 2])(Infinity)).toBe(2);
    expect(clamp([0, 2])(3)).toBe(2);
    expect(clamp([0, 2])(2)).toBe(2);
  });
});