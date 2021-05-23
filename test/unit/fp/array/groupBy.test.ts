import { groupBy } from 'fp/array/groupBy';
import { mapFields } from 'fp/object';

describe('fp/array/groupBy', () => {
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
  const colors = [
    '#3F88C5', 'rgba(255,20,147)',
    'hsl(0, 100%, 50%)', '#FFBA08',
    '#F50000', 'rgba(138,43,226, 0.6)',
    'rgb(178,34,34)', 'rgb(32,178,170)',
    'hsl(50, 75%, 40%)', 'coral',
    'beige', 'chocolate'
  ];

  test('Constant tagger takes all elements to single field', () => {
    expect(groupBy(() => 0, zodiacs)[0]).toEqual(zodiacs);
    expect(groupBy(() => 0, months)[0]).toEqual(months);
    expect(groupBy(() => 0, colors)[0]).toEqual(colors);
  });

  test('Example - tagging zodiacs by name length', () => {

    expect(groupBy(zodiac => zodiac.length, zodiacs)).toEqual({
      3: ['Leo'],
      5: ['Aries', 'Virgo', 'Libra'],
      6: ['Taurus', 'Gemini', 'Cancer', 'Pisces'],
      8: ['Scorpius', 'Aquarius'],
      9: ['Capricorn'],
      11: ['Sagittarius']
    });
  });

  test('Example - tagging months by number of days', () => {
    const groupedMonths = groupBy((month) => month.days, months);
    const groupedNames = mapFields(group => group.map(month => month.name), groupedMonths);
    expect(groupedNames).toEqual({
      28: ['February'],
      30: ['April', 'June', 'September', 'November'],
      31: ['January', 'March', 'May', 'July', 'August', 'October', 'December']
    });
  });

  test('Example - tagging colors by scheme', () => {
    const colorSchemeOf = (color: string) => {
      if (color.startsWith('#')) {
        return 'hex';
      }
      else if (color.startsWith('rgba')) {
        return 'rgba';
      }
      else if (color.startsWith('rgb')) {
        return 'rgb';
      }
      else if (color.startsWith('hsl')) {
        return 'hsl';
      }
      return 'other';
    };

    expect(groupBy(colorSchemeOf, colors)).toEqual({
      hex: ['#3F88C5', '#FFBA08', '#F50000'],
      rgb: ['rgb(178,34,34)', 'rgb(32,178,170)'],
      rgba: ['rgba(255,20,147)', 'rgba(138,43,226, 0.6)'],
      hsl: ['hsl(0, 100%, 50%)', 'hsl(50, 75%, 40%)'],
      other: ['coral', 'beige', 'chocolate']
    });
  });
});