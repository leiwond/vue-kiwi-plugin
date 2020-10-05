import MockDate from 'mockdate';
import date from './date';

describe('Filter - Date', () => {
  test('it should format dates', () => {
    expect(date(new Date(2017, 11, 24))).toBe('24.12.2017');
  });

  test('it should pad single-digit month and day values', () => {
    expect(date(new Date(2017, 1, 2))).toBe('02.02.2017');
  });

  test('it should omit for dates with unknown year if flag is set', () => {
    const unknown = 1910;
    expect(date(new Date(unknown, 11, 24), true)).toBe('24.12.');
  });

  test('it should not omit for dates from 1910 if flag is not set', () => {
    const unknown = 1910;
    expect(date(new Date(unknown, 11, 24), false)).toBe('24.12.1910');
  });

  test('it should verbalize dates', () => {
    MockDate.set(new Date('2016-04-21'));

    expect(date(new Date(2016, 3, 21), false, true)).toBe('heute');
    expect(date(new Date(2016, 3, 20), false, true)).toBe('gestern');
    expect(date(new Date(2016, 3, 22), false, true)).toBe('morgen');
    expect(date(new Date(2016, 2, 21), false, true)).toBe('früher');
    expect(date(new Date(2016, 4, 21), false, true)).toBe('später');

    MockDate.reset();
  });

  test('it should not verbalize dates if year is unknown', () => {
    expect(date(new Date(1910, 3, 21), true, true)).toBe('21.04.');
  });
});
