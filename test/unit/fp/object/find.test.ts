import { find } from 'fp/object';

import * as examples from 'test-data';

describe('find', () => {
  test('Constant false returns undefined', () => {
    expect(find(() => false, examples.basic)).toBe(undefined);
    expect(find(() => false, examples.lotsOfFields)).toBe(undefined);
    expect(find(() => false, examples.colors)).toBe(undefined);
    expect(find(() => false, examples.pairs)).toBe(undefined);
  });

  test('Constant true returns a truthy entry for non-empty record', () => {
    expect(find(() => true, examples.basic)).not.toBe(undefined);
    expect(find(() => true, examples.lotsOfFields)).not.toBe(undefined);
    expect(find(() => true, examples.colors)).not.toBe(undefined);
    expect(find(() => true, examples.pairs)).not.toBe(undefined);
  });

  test('Empty object returns `undefined` with any query', () => {
    expect(find(() => true, examples.empty)).toBe(undefined);
    expect(find(() => false, examples.empty)).toBe(undefined);
    expect(find(() => Math.random() > 0.5, examples.empty)).toBe(undefined);
    expect(find((v) => !!v, examples.empty)).toBe(undefined);
    expect(find((_, k) => !!k, examples.empty)).toBe(undefined);
  });

  test('Example - Finding color data by name', () => {
    const violet = find(v => v.name === 'Russian violet', examples.colors);
    expect(violet).toBeTruthy();
    expect(violet?.hex).toBe('#32174D');

    const cerulean = find(v => v.name === 'Cerulean', examples.colors);
    expect(cerulean).toBeTruthy();
    expect(cerulean?.highlighted).toBe(true);
  });

  test('Example - Finding contact info by email', () => {
    const contact = find(v => v.email === 'PatriciaPSmith@teleworm.us', examples.contacts);
    expect(contact).toBeTruthy();
    expect(contact?.name).toBe('Patricia P. Smith');
  });

  test('Exmaple - Finding a key containing a space character', () => {
    expect(find((_, k) => k.includes(' '), examples.pairs)).toBeTruthy();
    expect(find((_, k) => k.includes('  '), examples.pairs)).toBe(undefined);
  });

  test('Example - Using record parameter to find a field that doesnt have a pair', () => {
    expect(find((v, _, record) => !(v in record), examples.pairs)).toBeTruthy();
  });
});