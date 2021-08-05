import { reduce } from 'funcs';

import * as examples from 'test-data';

describe('funcs/reduce', () => {
  test('Empty array is reduced to initial value with any reducer', () => {
    expect(reduce((acc, v) => `${acc}${v}`, '', [])).toEqual('');
    expect(reduce((acc) => acc + 1, 0, [])).toEqual(0);
    expect(reduce(() => true, false, [])).toEqual(false);
  });

  test('Example - summing up values', () => {
    expect(reduce((acc, population) => acc + population, 0,
      [801_000, 432_892, 267_300, 224_656, 200_000]
    )).toBe(1_925_848);
  });

  test('Example - couting entries matching certain criteria', () => {
    expect(reduce(
      (acc, { highlighted }) => acc + (highlighted ? 1 : 0),
      0,
      Object.values(examples.colors))
    ).toBe(2);
    expect(
      reduce(
        (acc, { zodiac }) => acc + (zodiac.toLowerCase().startsWith('c') ? 1 : 0),
        0,
        Object.values(examples.contacts))
    ).toBe(4);
    expect(reduce(
      (acc, v) => acc + (v ? 1 : 0),
      0,
      [true, false, 1, 2, 3, 4, 'b', 'c', {}, [], null, undefined])
    ).toBe(9);
  });

  test('Example - Grouping indices by value type', () => {
    expect(reduce(
      (acc, v, k) => ({ ...acc, [typeof v]: acc[typeof v] ? [...acc[typeof v], k] : [k] }),
      {} as Record<string, unknown[]>,
      Object.values(examples.lotsOfFields))
    ).toEqual({
      string: [3, 4],
      number: [0, 1, 2, 9],
      object: [5, 6, 8, 10],
      undefined: [7],
    });
  });

  test('Example - Re-indexing contacts by ssn', () => {
    expect(reduce(
      (acc, contact) => ({ ...acc, [contact.ssn]: { name: contact.name } }),
      {},
      Object.values(examples.contacts))).toEqual({
        '522-24-XXXX': {
          name: 'Anthony A. Davidson',
        },
        '632-82-XXXX': {
          name: 'Michael W. Conway',
        },
        '354-36-XXXX': {
          name: 'Felicia C. Kyles',
        },
        '765-14-XXXX': {
          name: 'Patricia P. Smith',
        },
        '261-57-XXXX': {
          name: 'Justin C. Kaufman',
        },
        '017-24-XXXX': {
          name: 'Blake P. Scott',
        }
      });
  });

});
