import currency from './currency';

describe('Filters - Currency', () => {
  test('it should format round currency values', () => {
    expect(currency(10)).toBe('€ 10,00');
  });

  test('it should format currency values with decimals', () => {
    expect(currency(9.99)).toBe('€ 9,99');
  });

  test('it should format and round currency values with many decimals', () => {
    expect(currency(9.987251)).toBe('€ 9,99');
  });

  test('it should return 0,00 for invalid values', () => {
    expect(currency('abc')).toBe('€ 0,00');
  });

  test('it should format negative values', () => {
    expect(currency(-5)).toBe('€ -5,00');
  });
});
