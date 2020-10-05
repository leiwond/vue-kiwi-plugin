import pluralize from './pluralize';

describe('Filter - Pluralize', () => {
  test('it should return the singular version for a value of 1', () => {
    expect(pluralize(1, 'kiwi', 'kiwis')).toBe('1 kiwi');
  });

  test('it should return the plural version for a value of 10', () => {
    expect(pluralize(10, 'kiwi', 'kiwis')).toBe('10 kiwis');
  });

  test('it should return the plural version for a value of 0', () => {
    expect(pluralize(0, 'kiwi', 'kiwis')).toBe('0 kiwis');
  });
});
