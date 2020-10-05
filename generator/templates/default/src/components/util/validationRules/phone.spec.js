import phone from './phone';

describe('Validation - Phone', () => {
  test('it should be valid if it is a well formatted phone number', () => {
    expect(phone('+43 732 908200')).toBe(true);
  });

  test('it should be valid if it is a well formatted phone number with spaces', () => {
    expect(phone('+43 732 90 82 00')).toBe(true);
  });

  test('it should be invalid if it is a well formatted phone number without any spaces', () => {
    expect(phone('+43732908200')).toBe(false);
  });

  test('it should be valid if it is a well formatted phone number with direct dial', () => {
    expect(phone('+43 732 908200-10')).toBe(true);
  });

  test('it should be invalid if the country prefix is missing', () => {
    expect(phone('0732 908200')).toBe(false);
  });

  test('it should be invalid if slashes are used', () => {
    expect(phone('+43/732/908200')).toBe(false);
  });

  test('it should be invalid if forbidden characters are used', () => {
    expect(phone('+43 732 908200 oder 1234568')).toBe(false);
  });

  test('it should be valid if phone number is empty', () => {
    expect(phone('')).toBe(true);
  });
});
