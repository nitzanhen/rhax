import { take } from 'Rhax';

describe('fp/number/clamp', () => {
  test('For x <= min, returns min', () => {
    expect(take(-1).clamp(1, 3)()).toBe(1);
    expect(take(-100).clamp(1, 3)()).toBe(1);
    expect(take(1).clamp(1, 3)()).toBe(1);
    expect(take(-1000).clamp(-100, 100)()).toBe(-100);
    expect(take(-Infinity).clamp(1, 3)()).toBe(1);
    expect(take(-Infinity).clamp(-Infinity, 0)()).toBe(-Infinity);
    expect(take(-Infinity).clamp(0, Infinity)()).toBe(0);
  });

  test('For x >= max, returns max', () => {
    expect(take(4).clamp(1, 3)()).toBe(3);
    expect(take(100).clamp(1, 3)()).toBe(3);
    expect(take(3).clamp(1, 3)()).toBe(3);
    expect(take(1000).clamp(-100, 100)()).toBe(100);
    expect(take(Infinity).clamp(1, 3)()).toBe(3);
    expect(take(Infinity).clamp(-Infinity, 0)()).toBe(0);
    expect(take(Infinity).clamp(0, Infinity)()).toBe(Infinity);
  });

  test('For min < x < max, returns x', () => {
    expect(take(Math.E).clamp(1, 3)()).toBe(Math.E);
    expect(take(1.0001).clamp(1, 3)()).toBe(1.0001);
    expect(take(4).clamp(-100, 100)()).toBe(4);
    expect(take(1).clamp(-Infinity, 3)()).toBe(1);
    expect(take(0).clamp(-Infinity, Infinity)()).toBe(0);
    expect(take(1_000_000).clamp(0, Infinity)()).toBe(1_000_000);
  });
});