import { ErrLike, errLike, OkLike, okLike, ResultLike } from 'result';

describe('ResultLike', () => {

  test('ok', () => {
    const okResult2 = okLike({ 'number': 3 });
    expect(okResult2).toEqual<OkLike<{ number: number }>>({ ok: true, number: 3 });
    expect(okResult2).toEqual<ResultLike<{ number: number }, never>>({ ok: true, number: 3 });
  });

  test('errLike', () => {
    const errResult2 = errLike({ badbad: new Error() });
    expect(errResult2).toEqual<ErrLike<{ badbad: Error }>>({ ok: false, badbad: new Error() });
    expect(errResult2).toEqual<ResultLike<never, { badbad: Error }>>({ ok: false, badbad: new Error() });
  });

});