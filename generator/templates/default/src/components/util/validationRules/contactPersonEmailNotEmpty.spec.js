import contactPersonEmailNotEmpty from './contactPersonEmailNotEmpty';

describe('Validation - contactPersonEmailNotEmpty - returns true', () => {
  test('it should be valid to have a contact person with email not empty', () => {
    expect(contactPersonEmailNotEmpty({ email: 'foo@bar.com' })).toBe(true);
  });
});

describe('Validation - contactPersonEmailNotEmpty - returns false', () => {
  test('it should be invalid to have contact person with empty value.email', () => {
    expect(contactPersonEmailNotEmpty({ email: '' })).toBe(false);
  });
});
