import { findKey } from 'fp/object';

import * as examples from 'test-data';

describe('fp/object/findKey', () => {
  test('Constant false returns undefined', () => {
    expect(findKey(() => false, examples.basic)).toBe(undefined);
    expect(findKey(() => false, examples.lotsOfFields)).toBe(undefined);
    expect(findKey(() => false, examples.colors)).toBe(undefined);
    expect(findKey(() => false, examples.pairs)).toBe(undefined);
  });

  test('Constant true returns a truthy entry for non-empty record', () => {
    expect(findKey(() => true, examples.basic)).not.toBe(undefined);
    expect(findKey(() => true, examples.lotsOfFields)).not.toBe(undefined);
    expect(findKey(() => true, examples.colors)).not.toBe(undefined);
    expect(findKey(() => true, examples.pairs)).not.toBe(undefined);
  });

  test('Empty object returns `undefined` with any query', () => {
    expect(findKey(() => true, examples.empty)).toBe(undefined);
    expect(findKey(() => false, examples.empty)).toBe(undefined);
    expect(findKey(() => Math.random() > 0.5, examples.empty)).toBe(undefined);
    expect(findKey((v) => !!v, examples.empty)).toBe(undefined);
    expect(findKey((_, k) => !!k, examples.empty)).toBe(undefined);
  });

  test('Example - Finding color data by name', () => {
    const violetKey = findKey(v => v.name === 'Russian violet', examples.colors);
    expect(violetKey).toBeTruthy();
    expect(violetKey).toBe('c13e71fc-69dd-4d41-a7fc-35e54cc6ba8f');

    const ceruleanKey = findKey(v => v.name === 'Cerulean', examples.colors);
    expect(ceruleanKey).toBeTruthy();
    expect(ceruleanKey).toBe('58e0b450-a676-4be8-b257-4dab3febd6e1');
  });

  test('Example - Finding contact info by email', () => {
    const contactKey = findKey(v => v.email === 'PatriciaPSmith@teleworm.us', examples.contacts);
    expect(contactKey).toBeTruthy();
    expect(contactKey).toBe('037b9d3b-ec82-478f-94dd-494b1b52e176');
  });

  test('Exmaple - Finding a key containing a space character', () => {
    expect(findKey((_, k) => k.includes(' '), examples.pairs)).toBeTruthy();
    expect(findKey((_, k) => k.includes('  '), examples.pairs)).toBe(undefined);
  });

  test('Example - Using record parameter to find a field that doesnt have a pair', () => {
    expect(findKey((v, _, record) => !(v in record), examples.pairs)).toBeTruthy();
  });
});