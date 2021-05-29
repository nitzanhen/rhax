import { take } from 'Rhax';

import * as testdata from 'test-data';

// Most tests in this file are copied and modified from the unit tests of `fp/object` functions,
// which RhaxObject calls. The unit tests of those functions are more in depth, the tests here
// only make sure that RhaxObject methods call those functions correctly.

describe('RhaxObject', () => {
  test('mapFields', () => {
    expect(
      take(testdata.colors).mapFields(({ name }) => name)()
    ).toEqual({
      '58e0b450-a676-4be8-b257-4dab3febd6e1': 'Cerulean',
      'c5c03c48-5f7b-4846-82f5-b436a3c3431d': 'Citron',
      'c13e71fc-69dd-4d41-a7fc-35e54cc6ba8f': 'Russian violet',
      '9f0e36d8-d6a4-4b1d-b68f-77025f2b752f': 'Platinum',
      'ce1bf997-9fb2-4a80-9ab7-2ee63f30cc07': 'Persian green'
    });
  });

  test('filter', () => {
    expect(
      take(testdata.colors)
        .filter(v => v.highlighted)
        ()
    ).toEqual({
      '58e0b450-a676-4be8-b257-4dab3febd6e1': { name: 'Cerulean', hex: '#007BA7', highlighted: true },
      'c13e71fc-69dd-4d41-a7fc-35e54cc6ba8f': { name: 'Russian violet', hex: '#32174D', highlighted: true },
    });
  });

  test('reduce', () => {
    expect(
      take(testdata.contacts)
        .reduce(
          (acc, contact, uuid) => ({ ...acc, [contact.ssn]: { uuid } }),
          {}
        )()
    ).toEqual({
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

  test('find', () => {
    const violet = take(testdata.colors).find(v => v.name === 'Russian violet')();
    expect(violet).toBeTruthy();
    expect(violet?.hex).toBe('#32174D');

    const cerulean = take(testdata.colors).find(v => v.name === 'Cerulean')();
    expect(cerulean).toBeTruthy();
    expect(cerulean?.highlighted).toBe(true);
  });

  test('findKey', () => {
    const violetKey = take(testdata.colors).findKey(v => v.name === 'Russian violet')();
    expect(violetKey).toBeTruthy();
    expect(violetKey).toBe('c13e71fc-69dd-4d41-a7fc-35e54cc6ba8f');

    const ceruleanKey = take(testdata.colors).findKey(v => v.name === 'Cerulean')();
    expect(ceruleanKey).toBeTruthy();
    expect(ceruleanKey).toBe('58e0b450-a676-4be8-b257-4dab3febd6e1');
  });

  test('groupBy', () => {
    const byZodiac = take(testdata.contacts)
      .mapFields(({ name, zodiac }) => ({ name, zodiac }))
      .groupBy(({ zodiac }) => zodiac)
      ();

    expect(byZodiac).toEqual({
      Capricorn: [{ name: 'Anthony A. Davidson', zodiac: 'Capricorn' }, { name: 'Patricia P. Smith', zodiac: 'Capricorn' }],
      Aquarius: [{ name: 'Michael W. Conway', zodiac: 'Aquarius' }],
      Cancer: [{ name: 'Felicia C. Kyles', zodiac: 'Cancer' }, { name: 'Justin C. Kaufman', zodiac: 'Cancer' }],
      Gemini: [{ name: 'Blake P. Scott', zodiac: 'Gemini' }]
    });
  });

  test('pick', () => {

    expect(
      take({ name: 'Persian green', hex: '#00A693', highlighted: false })
        .pick(['hex'])
        ()
    ).toEqual({ hex: '#00A693' });

    expect(
      take({ name: 'Platinum', hex: '#E5E4E2', highlighted: false })
        .pick(['hex'])
        ()
    ).toEqual({ hex: '#E5E4E2' });
  });

  test('omit', () => {
    expect(
      take({ name: 'Cerulean', hex: '#007BA7', highlighted: true })
        .omit(['highlighted'])
        ()
    ).toEqual({
      name: 'Cerulean',
      hex: '#007BA7',
    });

    expect(
      take({ name: 'Russian violet', hex: '#32174D', highlighted: true })
        .omit(['highlighted'])
        ()
    ).toEqual({
      name: 'Russian violet',
      hex: '#32174D',
    });
  });
});
