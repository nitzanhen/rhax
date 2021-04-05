import { reduce } from 'fp/object/reduce';

import * as examples from 'test-data';

describe('reduce', () => {

  test('Empty object is reduced to initial value with any reducer', () => {
    expect(reduce((acc, v) => `${acc}${v}`, '', examples.empty)).toEqual('');
    expect(reduce((acc) => acc + 1, 0, examples.empty)).toEqual(0);
    expect(reduce(() => true, false, examples.empty)).toEqual(false);
  });

  test('Example - summing up values', () => {
    expect(reduce((acc, population) => acc + population, 0, examples.population)).toBe(1_925_848);
  });

  test('Example - couting entries matching certain criteria', () => {
    expect(reduce((acc, { highlighted }) => acc + (highlighted ? 1 : 0), 0, examples.colors)).toBe(2);
    expect(reduce((acc, { zodiac }) => acc + (zodiac.toLowerCase().startsWith('c') ? 1 : 0), 0, examples.contacts)).toBe(4);
    expect(reduce((acc, v) => acc + (v ? 1 : 0), 0, examples.lotsOfFields)).toBe(9);
  });

  test('Example - Grouping keys by value type', () => {
    expect(reduce((acc, v, k) => ({ ...acc, [typeof v]: acc[typeof v] ? [...acc[typeof v], k] : [k] }), {} as Record<string, unknown[]>, examples.lotsOfFields)).toEqual({
      string: ['key1', 'key2'],
      number: ['a', 'b', 'c', 'n'],
      object: ['arr', 'brr', 'e', 'obj'],
      undefined: ['undef'],
    });
  });

  test('Example - Re-indexing contacts by ssn', () => {
    expect(reduce((acc, contact, uuid) => ({ ...acc, [contact.ssn]: { uuid } }), {}, examples.contacts)).toEqual({
      '522-24-XXXX': {
        uuid: 'c114ca96-3363-4b77-b9d7-2d2bcd35ed8d'
      },
      '632-82-XXXX': {
        uuid: 'b252d43a-9603-4a25-846b-5d490992c706'
      },
      '354-36-XXXX': {
        uuid: '7ceae743-a5a9-4374-a6e3-16fac52c81f5'
      },
      '765-14-XXXX': {
        uuid: '037b9d3b-ec82-478f-94dd-494b1b52e176'
      },
      '261-57-XXXX': {
        uuid: '286e7e01-898c-45aa-a472-a42ee934a63e'
      },
      '017-24-XXXX': {
        uuid: 'a923a8ba-99a2-4b29-8930-c3db7d594d04'
      }
    });
  });

});
