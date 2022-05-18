import { Err, err, Ok, ok, Result } from 'result';

describe('Result', () => {

  test('ok', () => {
    const okResult1 = ok(3);
    expect(okResult1).toEqual<Ok<number>>({ ok: true, data: 3 });
    expect(okResult1).toEqual<Result<number>>({ ok: true, data: 3 });
  });

  test('err', () => {
    const errResult1 = err(null as unknown);
    expect(errResult1).toEqual<Err<unknown>>({ ok: false, error: null });
    expect(errResult1).toEqual<Result<never, unknown>>({ ok: false, error: null });
  });

});