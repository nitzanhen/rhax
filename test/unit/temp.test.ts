import { take } from 'RhaxCore';

describe('temp', () => {
  test('tempt', () => {
    const val = 3;
    const start = process.hrtime.bigint();
    for (let i = 0; i < 10_000; i++) {
      //take(val)();
    }
    const end = process.hrtime.bigint();
    console.log(`Benchmark took ${(end - start) / 1_000_000n} milliseconds`);
  });
});