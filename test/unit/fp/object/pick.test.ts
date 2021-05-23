import { pick } from 'fp/object/pick';

import * as testdata from 'test-data';

describe('fp/object/pick', () => {
  test('pick with empty array gives an empty object', () => {
    expect(pick([], testdata.basic)).toEqual({});
    expect(pick([], testdata.colors)).toEqual({});
    expect(pick([], testdata.contacts)).toEqual({});
  });

  test('exmaple - picking hex out of color object', () => {
    const persianGreen = { name: 'Persian green', hex: '#00A693', highlighted: false };
    expect(pick(['hex'], persianGreen)).toEqual({ hex: '#00A693' });

    const platinum = { name: 'Platinum', hex: '#E5E4E2', highlighted: false };
    expect(pick(['hex'], platinum)).toEqual({ hex: '#E5E4E2' });
  });

  test('example - picking identifying information', () => {
    const contact1 = {
      ssn: '765-14-XXXX',
      name: 'Patricia P. Smith',
      email: 'PatriciaPSmith@teleworm.us',
      birthDate: 'January 8, 1988',
      zodiac: 'Capricorn',
      company: 'Rustler Steak House',
      occupation: 'Front office manager'
    };

    expect(pick(['ssn', 'name', 'email'], contact1)).toEqual({
      ssn: '765-14-XXXX',
      name: 'Patricia P. Smith',
      email: 'PatriciaPSmith@teleworm.us',
    });


    const contact2 = {
      ssn: '261-57-XXXX',
      name: 'Justin C. Kaufman',
      email: 'JustinCKaufman@jourrapide.com',
      birthDate: 'July 15, 1978',
      zodiac: 'Cancer',
      company: 'One-Up Realty',
      occupation: 'Human service worker'
    };

    expect(pick(['ssn', 'name', 'email'], contact2)).toEqual({
      ssn: '261-57-XXXX',
      name: 'Justin C. Kaufman',
      email: 'JustinCKaufman@jourrapide.com'
    });
  });
});