import { indexBy } from 'funcs';
import { contacts as contactsRecord, } from 'test-data';

const contacts = Object.values(contactsRecord);
const colors = [
  { name: 'Cerulean', hex: '#007BA7', highlighted: true },
  { name: 'Citron', hex: '#DDD06A', highlighted: false },
  { name: 'Russian violet', hex: '#32174D', highlighted: true },
  { name: 'Platinum', hex: '#E5E4E2', highlighted: false },
  { name: 'Persian green', hex: '#00A693', highlighted: false }
];

describe('funcs/indexBy', () => {

  test('Empty array gives empty object with any indexer', () => {
    expect(indexBy((el) => el, [])).toEqual({});
    expect(indexBy((_, i) => i, [])).toEqual({});
    expect(indexBy((el, i) => `${i}: ${el}`, [])).toEqual({});
  });

  test('Example - indexing colors by name', () => {
    const indexed = indexBy(({ name }) => name, colors);

    expect(indexed).toEqual({
      'Cerulean': { name: 'Cerulean', hex: '#007BA7', highlighted: true },
      'Citron': { name: 'Citron', hex: '#DDD06A', highlighted: false },
      'Russian violet': { name: 'Russian violet', hex: '#32174D', highlighted: true },
      'Platinum': { name: 'Platinum', hex: '#E5E4E2', highlighted: false },
      'Persian green': { name: 'Persian green', hex: '#00A693', highlighted: false }
    });
  });

  test('Example - indexing colors by hex', () => {
    const indexed = indexBy(({ hex }) => hex, colors);

    expect(indexed).toEqual({
      '#007BA7': { name: 'Cerulean', hex: '#007BA7', highlighted: true },
      '#DDD06A': { name: 'Citron', hex: '#DDD06A', highlighted: false },
      '#32174D': { name: 'Russian violet', hex: '#32174D', highlighted: true },
      '#E5E4E2': { name: 'Platinum', hex: '#E5E4E2', highlighted: false },
      '#00A693': { name: 'Persian green', hex: '#00A693', highlighted: false }
    });
  });

  test('Exmaple - indexing contacts by ssn', () => {
    const trimmedContacts = contacts.map(({ name, ssn }) => ({ name, ssn }));
    const indexed = indexBy(({ ssn }) => ssn, trimmedContacts);

    expect(indexed).toEqual({
      '522-24-XXXX': {
        ssn: '522-24-XXXX',
        name: 'Anthony A. Davidson',
      },
      '632-82-XXXX': {
        ssn: '632-82-XXXX',
        name: 'Michael W. Conway',
      },
      '354-36-XXXX': {
        ssn: '354-36-XXXX',
        name: 'Felicia C. Kyles',
      },
      '765-14-XXXX': {
        ssn: '765-14-XXXX',
        name: 'Patricia P. Smith',
      },
      '261-57-XXXX': {
        ssn: '261-57-XXXX',
        name: 'Justin C. Kaufman',
      },
      '017-24-XXXX': {
        ssn: '017-24-XXXX',
        name: 'Blake P. Scott',
      },
    });
  });
});