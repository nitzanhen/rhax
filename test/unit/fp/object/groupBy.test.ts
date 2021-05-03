import { groupBy, mapFields } from 'fp/object';
import * as examples from 'test-data';

describe('groupBy', () => {
  test('Constant tagger takes all elements to single field', () => {
    for (const data of Object.entries(examples)) {
      const values = Object.values(data);
      const group = groupBy(() => 0, values)[0];

      expect(group).toBeTruthy();
      //Expect both to be equal as sets, and have the same length
      expect(new Set(group)).toEqual(new Set(values));
      expect(group?.length).toEqual(values.length);
    }
  });

  test('Empty object returns empty object with any tagger', () => {
    expect(groupBy(() => '3', {})).toEqual({});
    expect(groupBy(() => Math.random(), {})).toEqual({});
    expect(groupBy(() => Symbol(), {})).toEqual({});
  });

  test('Example - tagging contacts by zodiac', () => {
    //Keep only the names for brevity
    const trimmedContacts = mapFields(({ name, zodiac }) => ({ name, zodiac }), examples.contacts);
    const byZodiac = groupBy((contact) => contact.zodiac, trimmedContacts);

    expect(byZodiac).toEqual({
      Capricorn: [{ name: 'Anthony A. Davidson', zodiac: 'Capricorn' }, { name: 'Patricia P. Smith', zodiac: 'Capricorn' }],
      Aquarius: [{ name: 'Michael W. Conway', zodiac: 'Aquarius' }],
      Cancer: [{ name: 'Felicia C. Kyles', zodiac: 'Cancer' }, { name: 'Justin C. Kaufman', zodiac: 'Cancer' }],
      Gemini: [{ name: 'Blake P. Scott', zodiac: 'Gemini' }]
    });
  });

  test('Example - tagging contacts by domain', () => {
    const getDomain = (email: string) => email.slice(email.lastIndexOf('.') + 1);

    const trimmedContacts = mapFields(({ name, email }) => ({ name, email }), examples.contacts);
    const byDomain = groupBy(contact => getDomain(contact.email), trimmedContacts);
    expect(byDomain).toEqual({
      'com': [{
        name: 'Anthony A. Davidson',
        email: 'AnthonyADavidson@jourrapide.com',
      }, {
        name: 'Felicia C. Kyles',
        email: 'FeliciaCKyles@rhyta.com',
      }, {
        name: 'Justin C. Kaufman',
        email: 'JustinCKaufman@jourrapide.com',
      }],
      'us': [{
        name: 'Michael W. Conway',
        email: 'MichaelWConway@teleworm.us',
      }, {
        name: 'Patricia P. Smith',
        email: 'PatriciaPSmith@teleworm.us',
      }, {
        name: 'Blake P. Scott',
        email: 'BlakePScott@teleworm.us',
      }]
    });
  });

  test('Example - tagging colors by highlight status', () => {
    const byHighlight = groupBy((color) => String(color.highlighted), examples.colors);

    expect(byHighlight).toEqual({
      'true': [
        { name: 'Cerulean', hex: '#007BA7', highlighted: true },
        { name: 'Russian violet', hex: '#32174D', highlighted: true }
      ],
      'false': [
        { name: 'Citron', hex: '#DDD06A', highlighted: false },
        { name: 'Platinum', hex: '#E5E4E2', highlighted: false },
        { name: 'Persian green', hex: '#00A693', highlighted: false }
      ]
    });
  });
});