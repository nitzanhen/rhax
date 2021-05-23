import { omit } from 'fp/object/omit';

import * as testdata from 'test-data';


describe('fp/object/omit', () => {
  test('omit with empty array gives an equal object', () => {
    expect(omit([], testdata.basic)).toEqual(testdata.basic);
    expect(omit([], testdata.colors)).toEqual(testdata.colors);
    expect(omit([], testdata.contacts)).toEqual(testdata.contacts);
  });

  test('exmaple - omitting highlight state out of color object', () => {

    expect(omit(['highlighted'], {
      name: 'Cerulean',
      hex: '#007BA7',
      highlighted: true
    }
    )).toEqual({
      name: 'Cerulean',
      hex: '#007BA7',
    });

    expect(omit(['highlighted'], {
      name: 'Russian violet',
      hex: '#32174D',
      highlighted: true
    }
    )).toEqual({
      name: 'Russian violet',
      hex: '#32174D',
    });
  });

  test('example - redacting personal information', () => {
    const contact1 = {
      ssn: '522-24-XXXX',
      name: 'Anthony A. Davidson',
      email: 'AnthonyADavidson@jourrapide.com',
      birthDate: 'December 23, 1970',
      zodiac: 'Capricorn',
      company: 'Opticomp',
      occupation: 'Commentator'
    };

    expect(omit(['ssn', 'name', 'email'], contact1)).toEqual({
      birthDate: 'December 23, 1970',
      zodiac: 'Capricorn',
      company: 'Opticomp',
      occupation: 'Commentator'
    });


    const contact2 = {
      ssn: '765-14-XXXX',
      name: 'Patricia P. Smith',
      email: 'PatriciaPSmith@teleworm.us',
      birthDate: 'January 8, 1988',
      zodiac: 'Capricorn',
      company: 'Rustler Steak House',
      occupation: 'Front office manager'
    };

    expect(omit(['ssn', 'name', 'email'], contact2)).toEqual({
      birthDate: 'January 8, 1988',
      zodiac: 'Capricorn',
      company: 'Rustler Steak House',
      occupation: 'Front office manager'
    });
  });
});