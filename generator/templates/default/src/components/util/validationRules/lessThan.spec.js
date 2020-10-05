import lessThan from './lessThan';

describe('Validation - lessThan', () => {
  test('it should be valid if the value is less than the reference value', () => {
    const value = 10;
    const data = {
      age: 18,
    };

    expect(lessThan('age')(value, data)).toBe(true);
  });

  test('it should be invalid if the value is greater than the reference value', () => {
    const value = 20;
    const data = {
      age: 18,
    };

    expect(lessThan('age')(value, data)).toBe(false);
  });

  test('it should be invalid if the value is equal to the reference value', () => {
    const value = 18;
    const data = {
      age: 18,
    };
    expect(lessThan('age')(value, data)).toBe(false);
  });

  test('it should be valid if date is less', () => {
    const value = new Date(2015, 11, 7);
    const data = {
      lastChristmas: new Date(2016, 11, 24),
    };
    expect(lessThan('lastChristmas')(value, data)).toBe(true);
  });

  test('it should be invalid if date is greater', () => {
    const value = new Date(2017, 11, 7);
    const data = {
      lastChristmas: new Date(2016, 11, 24),
    };
    expect(lessThan('lastChristmas')(value, data)).toBe(false);
  });
});
