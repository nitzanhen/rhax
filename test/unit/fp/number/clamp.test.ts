import { clamp } from 'funcs';

describe('funcs/clamp', () => {
  test('For x <= min, returns min', () => {
    expect(clamp(1, 3, -1)).toBe(1);
    expect(clamp(1, 3, -100)).toBe(1);
    expect(clamp(1, 3, 1)).toBe(1);
    expect(clamp(-100, 100, -1000)).toBe(-100);
    expect(clamp(1, 3, -Infinity)).toBe(1);
    expect(clamp(-Infinity, 0, -Infinity)).toBe(-Infinity);
    expect(clamp(0, Infinity, -Infinity)).toBe(0);
  });

  test('For x >= max, returns max', () => {
    expect(clamp(1, 3, 4)).toBe(3);
    expect(clamp(1, 3, 100)).toBe(3);
    expect(clamp(1, 3, 3)).toBe(3);
    expect(clamp(-100, 100, 1000)).toBe(100);
    expect(clamp(1, 3, Infinity)).toBe(3);
    expect(clamp(-Infinity, 0, Infinity)).toBe(0);
    expect(clamp(0, Infinity, Infinity)).toBe(Infinity);
  });

  test('For min < x < max, returns x', () => {
    expect(clamp(1, 3, Math.E)).toBe(Math.E);
    expect(clamp(1, 3, 1.0001)).toBe(1.0001);
    expect(clamp(-100, 100, 4)).toBe(4);
    expect(clamp(-Infinity, 3, 1)).toBe(1);
    expect(clamp(-Infinity, Infinity, 0)).toBe(0);
    expect(clamp(0, Infinity, 1_000_000)).toBe(1_000_000);
  });
});