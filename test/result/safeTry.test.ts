import { safeTry } from 'result';

describe('safeTry', () => {

  test('safeTry', () => {
    expect(() => safeTry(() => 2)).not.toThrow();
    const result1 = safeTry(() => 2);
    expect(result1.ok).toBe(true);
    expect(result1.ok && result1.data).toBe(2);

    expect(() => safeTry(() => { throw new Error(); })).not.toThrow();
    const result2 = safeTry(() => { throw new Error(); });
    expect(result2.ok).toBe(false);
    expect(result2.ok || result2.error).toBeInstanceOf(Error);
  });
});