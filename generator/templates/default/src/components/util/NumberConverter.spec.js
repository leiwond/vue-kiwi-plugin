import NumberConverter from './NumberConverter';

describe('Number Converter', () => {
  test('it should round a string to given decimals', () => {
    const number1 = NumberConverter.round('123.45678');
    const number2 = NumberConverter.round('9872.87267563', 4);

    expect(number1).toBe(123.46);
    expect(number2).toBe(9872.8727);
  });

  test('it should round a number to given decimals', () => {
    const number1 = NumberConverter.round(123.45678);
    const number2 = NumberConverter.round(9872.87267563, 4);

    expect(number1).toBe(123.46);
    expect(number2).toBe(9872.8727);
  });

  test('it should fail when invalid input is given', () => {
    expect(() => {
      NumberConverter.round('123,45678');
    }).toThrow(Error);
  });
});
