import { Rhax, take } from 'Rhax';


describe('temp', () => {
  test('tempt', () => {
    const val = 3;
    const start = process.hrtime.bigint();
    for (let i = 0; i < 1_000_000; i++) {
      take(val)();
    }
    const end = process.hrtime.bigint();
    console.log(`Current benchmark took ${(end - start) / 1_000_000n} milliseconds`);
  });

  test('tempt2', () => {
    const val = 3;
    const start = process.hrtime.bigint();
    for (let i = 0; i < 1_000_000; i++) {
      new Rhax(val)();
    }
    const end = process.hrtime.bigint();
    console.log(`New benchmark took ${(end - start) / 1_000_000n} milliseconds`);
  });
});