import { filter } from 'fp/object';

const exmaples = {
  basic: {
    firstName: 'very',
    lastName: 'nice name',
    mood: 'vibing',
    score: 5.6,
    smoking: false
  },
  lotsOfFields: {
    a: 1,
    b: 2,
    c: 3,
    key1: 'value1',
    key2: 'value2',
    arr: ['very', 'nice', 'weather'],
    brr: ['brr', 'so', 'cold'],
    undef: undefined,
    e: null,
    n: 1_000_000,
    obj: { name: 'tamir bar' }
  },
  empty: {},
  todos: {
    '58e0b450-a676-4be8-b257-4dab3febd6e1': { name: 'Cerulean', hex: '#007BA7', highlighted: true },
    'c5c03c48-5f7b-4846-82f5-b436a3c3431d': { name: 'Citron', hex: '#DDD06A', highlighted: false },
    'c13e71fc-69dd-4d41-a7fc-35e54cc6ba8f': { name: 'Russian violet', hex: '#32174D', highlighted: true },
    '9f0e36d8-d6a4-4b1d-b68f-77025f2b752f': { name: 'Platinum', hex: '#E5E4E2', highlighted: false },
    'ce1bf997-9fb2-4a80-9ab7-2ee63f30cc07': { name: 'Persian green', hex: '#00A693', highlighted: false }
  },
  pairs: {
    'yin': 'yang',
    'water boy': 'fire girl',
    'tom': 'jerry',
    'flower': 'bee',
    'red': 'blue',
    'fire girl': 'water boy',
    'shir': 'gir',
    'jerry': 'tom',
    'primary': 'secondary',
    'yang': 'yin',
    'blue': 'red',
    'yellow': 'green'
  }
};


describe('filter', () => {
  test('Constant false returns an empty object', () => {
    expect(filter(() => false, exmaples.basic)).toEqual({});
    expect(filter(() => false, exmaples.lotsOfFields)).toEqual({});
    expect(filter(() => false, exmaples.todos)).toEqual({});
    expect(filter(() => false, exmaples.pairs)).toEqual({});
  });

  test('Constant true retains all fields', () => {
    expect(filter(() => true, exmaples.basic)).toEqual(exmaples.basic);
    expect(filter(() => true, exmaples.lotsOfFields)).toEqual(exmaples.lotsOfFields);
    expect(filter(() => true, exmaples.todos)).toEqual(exmaples.todos);
    expect(filter(() => true, exmaples.pairs)).toEqual(exmaples.pairs);
  });

  test('Empty object returns empty object with any predicate', () => {
    expect(filter(() => false, exmaples.empty)).toEqual({});
    expect(filter(() => true, exmaples.empty)).toEqual({});
    expect(filter(() => Math.random() > 0.5, exmaples.empty)).toEqual({});
    expect(filter((k) => !!k, exmaples.empty)).toEqual({});
  });

  test('Example - Keeping number fields', () => {
    expect(filter((v) => typeof v === 'number', exmaples.basic)).toEqual({ score: 5.6 });
    expect(filter((v) => typeof v === 'number', exmaples.lotsOfFields)).toEqual({
      a: 1,
      b: 2,
      c: 3,
      n: 1_000_000
    });
  });

  test('Example - Retaining single-character *keys*', () => {
    expect(filter((_, k) => k.length === 1, exmaples.basic)).toEqual({});
    expect(filter((_, k) => k.length === 1, exmaples.lotsOfFields)).toEqual({
      a: 1,
      b: 2,
      c: 3,
      e: null,
      n: 1_000_000,
    });
  });

  test('Exmaple - Removing falsey values', () => {
    expect(filter(v => !!v, exmaples.basic)).toEqual({
      firstName: 'very',
      lastName: 'nice name',
      mood: 'vibing',
      score: 5.6
    });
    expect(filter(v => !!v, exmaples.lotsOfFields)).toEqual({
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
    expect(filter(v => !!v, exmaples.todos)).toEqual(exmaples.todos);
  });

  test('Example - Extracting only "highlighted" fields', () => {
    expect(filter(v => v.highlighted, exmaples.todos)).toEqual({
      '58e0b450-a676-4be8-b257-4dab3febd6e1': { name: 'Cerulean', hex: '#007BA7', highlighted: true },
      'c13e71fc-69dd-4d41-a7fc-35e54cc6ba8f': { name: 'Russian violet', hex: '#32174D', highlighted: true },
    });
  });

  test('Example - Using `record` argument to extract fields dynamically', () => {
    //Extract only keys whose pairs (values) are also keys in the record:
    expect(filter((v, _, pairs) => v in pairs, exmaples.pairs)).toEqual({
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