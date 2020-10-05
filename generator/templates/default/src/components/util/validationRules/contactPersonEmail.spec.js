import contactPersonEmail from './contactPersonEmail';

describe('Validation - contactPersonEmail - returns true', () => {
  test('it should be valid to have a contact person with valid email', () => {
    expect(contactPersonEmail({ email: 'foo@bar.com' })).toBe(true);
  });
});

describe('Validation - contactPersonEmail - returns false', () => {
  test('it should be invalid to have contact person with invalid value.email', () => {
    expect(contactPersonEmail({ email: 'foo@bar' })).toBe(false);
  });
});
