import numberFormat from './numberFormat';

describe('Filter - Number Format', () => {
  test('it should format short numbers', () => {
    expect(numberFormat(1)).toBe('1');
    expect(numberFormat(12)).toBe('12');
    expect(numberFormat(123)).toBe('123');
  });

  test('it should format numbers with thousand separator', () => {
    expect(numberFormat(1234)).toBe('1.234');
    expect(numberFormat(12345)).toBe('12.345');
    expect(numberFormat(123456)).toBe('123.456');
    expect(numberFormat(1234567)).toBe('1.234.567');
  });

  test('it should format numbers with decimals', () => {
    expect(numberFormat(1.23)).toBe('1,23');
    expect(numberFormat(1234.5)).toBe('1.234,5');
    expect(numberFormat(123456.789)).toBe('123.456,789');
  });
});
