import { Err, err, Ok, ok, Result } from 'result';

describe('Result', () => {

  test('ok', () => {
    const okResult1 = ok(3);
    expect(okResult1).toEqual<Ok<{ data: number }>>({ ok: true, data: 3 });
    expect(okResult1).toEqual<Result<{ data: number }>>({ ok: true, data: 3 });

    const okResult2 = ok('number', 3);
    expect(okResult2).toEqual<Ok<{ number: number }>>({ ok: true, number: 3 });
    expect(okResult2).toEqual<Result<{ number: number }>>({ ok: true, number: 3 });
  });

  test('err', () => {
    const errResult1 = err(null as unknown);
    expect(errResult1).toEqual<Err<{ error: unknown }>>({ ok: false, error: null });
    expect(errResult1).toEqual<Result<never, { error: unknown }>>({ ok: false, error: null });

    const errResult2 = err('badbad', new Error());
    expect(errResult2).toEqual<Err<{ badbad: Error }>>({ ok: false, badbad: new Error() });
    expect(errResult2).toEqual<Result<never, { badbad: Error }>>({ ok: false, badbad: new Error() });
  });

});