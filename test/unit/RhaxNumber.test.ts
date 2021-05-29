import { take } from 'Rhax';

describe('RhaxNumber', () => {
  test('clamp', () => {
    expect(take(-1).clamp(1, 3)()).toBe(1);
    expect(take(-1000).clamp(-100, 100)()).toBe(-100);
    expect(take(-Infinity).clamp(1, 3)()).toBe(1);

    expect(take(Math.E).clamp(1, 3)()).toBe(Math.E);
    expect(take(4).clamp(-100, 100)()).toBe(4);
    expect(take(0).clamp(-Infinity, Infinity)()).toBe(0);

    expect(take(4).clamp(1, 3)()).toBe(3);
    expect(take(Infinity).clamp(1, 3)()).toBe(3);
    expect(take(Infinity).clamp(-Infinity, 0)()).toBe(0);
  });
});