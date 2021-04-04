import { mapFields } from 'fp/object/mapFields';

import * as examples from 'test-data';
import { ValueOf } from 'types';

describe('mapFields', () => {

  test('With any predicate, the keys of the output match the keys of the input', () => {
    for (const example of Object.values(examples)) {
      const mapped = mapFields(() => Math.random(), example);
      const exampleKeys = new Set(Object.keys(example));
      const mappedKeys = new Set(Object.keys(mapped));
      expect(mappedKeys).toEqual(exampleKeys);
    }
  });

  test('A constant predicate returns an array of constants', () => {
    for (const example of Object.values(examples)) {
      const mapped = mapFields(() => 1, example);
      const allOnes = Object.values(mapped).every(v => v === 1);
      expect(allOnes).toBe(true);
    }
  });

  test('Example - extracting fields out of objects', () => {
    expect(mapFields(({ name }) => name, examples.colors)).toEqual({
      '58e0b450-a676-4be8-b257-4dab3febd6e1': 'Cerulean',
      'c5c03c48-5f7b-4846-82f5-b436a3c3431d': 'Citron',
      'c13e71fc-69dd-4d41-a7fc-35e54cc6ba8f': 'Russian violet',
      '9f0e36d8-d6a4-4b1d-b68f-77025f2b752f': 'Platinum',
      'ce1bf997-9fb2-4a80-9ab7-2ee63f30cc07': 'Persian green'
    });

    expect(mapFields(({ company, occupation }) => ({ company, occupation }), examples.contacts)).toEqual({
      'c114ca96-3363-4b77-b9d7-2d2bcd35ed8d': {
        company: 'Opticomp',
        occupation: 'Commentator'
      },
      'b252d43a-9603-4a25-846b-5d490992c706': {
        company: 'Peaches',
        occupation: 'Condominium association manager'
      },
      '7ceae743-a5a9-4374-a6e3-16fac52c81f5': {
        company: 'Omni Superstore',
        occupation: 'Hotel detective'
      },
      '037b9d3b-ec82-478f-94dd-494b1b52e176': {
        company: 'Rustler Steak House',
        occupation: 'Front office manager'
      },
      '286e7e01-898c-45aa-a472-a42ee934a63e': {
        company: 'One-Up Realty',
        occupation: 'Human service worker'
      },
      'a923a8ba-99a2-4b29-8930-c3db7d594d04': {
        company: 'Packer',
        occupation: 'Department manager'
      }
    });
  });

  test('Example - wrapping values in functions and calling them', () => {
    for (const example of Object.values(examples)) {
      const callbacks = mapFields(v => () => v, example as Record<string, unknown>);
      const calledCallbacks = mapFields(cb => cb(), callbacks);
      expect(calledCallbacks).toEqual(example);
    }
  });

  test('Example - casting all fields into strings', () => {
    for (const example of Object.values(examples)) {
      const cast = mapFields(String, example);
      expect(Object.values(cast).every(s => typeof s === 'string')).toBe(true);
    }
  });
});