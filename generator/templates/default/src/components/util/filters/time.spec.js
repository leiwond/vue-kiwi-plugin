import time from './time';

describe('Filter - Time', () => {
  test('it should format times with two digit hours', () => {
    expect(time(new Date(2017, 11, 24, 11, 11))).toBe('11:11');
  });

  test('it should format times with one digit hours', () => {
    expect(time(new Date(2017, 11, 24, 9, 11))).toBe('09:11');
  });

  test('it should format times with one digit minutes', () => {
    expect(time(new Date(2017, 11, 24, 9, 9))).toBe('09:09');
  });
});
