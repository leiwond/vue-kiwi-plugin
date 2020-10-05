import number from './number';

describe('Filter - Date', () => {
  test('it should convert strings to integer', () => {
    expect(number('10')).toBe(10);
  });

  test('it should convert float strings to integer', () => {
    expect(number('10.50')).toBe(10);
  });
});
