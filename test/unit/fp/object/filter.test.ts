import { filter } from 'fp/object/filter';

import * as examples from 'test-data';


describe('filter', () => {
  test('Constant false returns an empty object', () => {
    expect(filter(() => false, examples.basic)).toEqual({});
    expect(filter(() => false, examples.lotsOfFields)).toEqual({});
    expect(filter(() => false, examples.colors)).toEqual({});
    expect(filter(() => false, examples.pairs)).toEqual({});
  });

  test('Constant true retains all fields', () => {
    expect(filter(() => true, examples.basic)).toEqual(examples.basic);
    expect(filter(() => true, examples.lotsOfFields)).toEqual(examples.lotsOfFields);
    expect(filter(() => true, examples.colors)).toEqual(examples.colors);
    expect(filter(() => true, examples.pairs)).toEqual(examples.pairs);
  });

  test('Empty object returns empty object with any predicate', () => {
    expect(filter(() => false, examples.empty)).toEqual({});
    expect(filter(() => true, examples.empty)).toEqual({});
    expect(filter(() => Math.random() > 0.5, examples.empty)).toEqual({});
    expect(filter((k) => !!k, examples.empty)).toEqual({});
  });

  test('Example - Keeping number fields', () => {
    expect(filter((v) => typeof v === 'number', examples.basic)).toEqual({ score: 5.6 });
    expect(filter((v) => typeof v === 'number', examples.lotsOfFields)).toEqual({
      a: 1,
      b: 2,
      c: 3,
      n: 1_000_000
    });
  });

  test('Example - Retaining single-character *keys*', () => {
    expect(filter((_, k) => k.length === 1, examples.basic)).toEqual({});
    expect(filter((_, k) => k.length === 1, examples.lotsOfFields)).toEqual({
      a: 1,
      b: 2,
      c: 3,
      e: null,
      n: 1_000_000,
    });
  });

  test('Exmaple - Removing falsey values', () => {
    expect(filter(v => !!v, examples.basic)).toEqual({
      firstName: 'very',
      lastName: 'nice name',
      mood: 'vibing',
      score: 5.6
    });
    expect(filter(v => !!v, examples.lotsOfFields)).toEqual({
      a: 1,
      b: 2,
      c: 3,
      key1: 'value1',
      key2: 'value2',
      arr: ['very', 'nice', 'weather'],
      brr: ['brr', 'so', 'cold'],
      n: 1_000_000,
      obj: { name: 'tamir bar' }
    });
    expect(filter(v => !!v, examples.colors)).toEqual(examples.colors);
  });

  test('Example - Extracting only "highlighted" fields', () => {
    expect(filter(v => v.highlighted, examples.colors)).toEqual({
      '58e0b450-a676-4be8-b257-4dab3febd6e1': { name: 'Cerulean', hex: '#007BA7', highlighted: true },
      'c13e71fc-69dd-4d41-a7fc-35e54cc6ba8f': { name: 'Russian violet', hex: '#32174D', highlighted: true },
    });
  });

  test('Example - Using `record` argument to extract fields dynamically', () => {
    //Extract only keys whose pairs (values) are also keys in the record:
    expect(filter((v, _, pairs) => v in pairs, examples.pairs)).toEqual({
      'yin': 'yang',
      'water boy': 'fire girl',
      'tom': 'jerry',
      'red': 'blue',
      'fire girl': 'water boy',
      'jerry': 'tom',
      'yang': 'yin',
      'blue': 'red',
    });
  });
});