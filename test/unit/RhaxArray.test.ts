import { take } from 'Rhax';
import { contacts as contactsRecord } from 'test-data';

const contacts = Object.values(contactsRecord);

const zodiacs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpius', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const months = [
  { name: 'January', days: 31 },
  { name: 'February', days: 28 },
  { name: 'March', days: 31 },
  { name: 'April', days: 30 },
  { name: 'May', days: 31 },
  { name: 'June', days: 30 },
  { name: 'July', days: 31 },
  { name: 'August', days: 31 },
  { name: 'September', days: 30 },
  { name: 'October', days: 31 },
  { name: 'November', days: 30 },
  { name: 'December', days: 31 },
];

describe('RhaxArray', () => {

  test('groupBy - tagging zodiacs by name length', () => {
    expect(
      take(zodiacs).groupBy(zodiac => zodiac.length)()
    ).toEqual({
      3: ['Leo'],
      5: ['Aries', 'Virgo', 'Libra'],
      6: ['Taurus', 'Gemini', 'Cancer', 'Pisces'],
      8: ['Scorpius', 'Aquarius'],
      9: ['Capricorn'],
      11: ['Sagittarius']
    });
  });

  test('groupBy - tagging months by number of days', () => {
    expect(
      take(months)
        .groupBy(month => month.days)
        .mapFields(group => group.map(month => month.name))
        ()
    ).toEqual({
      28: ['February'],
      30: ['April', 'June', 'September', 'November'],
      31: ['January', 'March', 'May', 'July', 'August', 'October', 'December']
    });
  });

  test('indexBy - indexing contacts by ssn', () => {
    const trimmedContacts = contacts.map(({ name, ssn }) => ({ name, ssn }));
    const indexed = take(trimmedContacts).indexBy(({ ssn }) => ssn)();

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

  test('indexBy - indexing months by name', () => {
    expect(
      take(months)
        .indexBy(month => month.name)
        .mapFields(month => month.days)
        ()
    ).toEqual({
      January: 31,
      February: 28,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31,
    });
  });
});