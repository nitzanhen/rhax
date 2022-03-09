import { pipe } from 'pipe';

describe('pipe', () => {

  test('pipe', () => {
    const p1 = pipe();
    expect(typeof p1).toBe('function');
    expect(p1.go()).toBe(undefined);


    const p2 = pipe(1);
    expect(typeof p2).toBe('function');
    expect(p2.go()).toBe(1);

    const v1 = pipe(1)
      (x => x + 1)
      (x => x * 2)
      .go();

    expect(v1).toBe<number>(4);

    const v2 = pipe()
      (_ => 1)
      (_ => 2)
      (x => x + 3)
      (_ => 1000)
      .go();

    expect(v2).toBe(1000);
  });

});