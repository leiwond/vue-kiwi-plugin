import datetime from './datetime';

describe('Filter - Datetime', () => {
  test('it should format dates with times', () => {
    expect(datetime(new Date(2017, 11, 24, 18, 0))).toBe('24.12.2017 18:00');
  });
});
