import recipientEmail from './recipientEmail';

describe('Validation - recipientEmail - returns true', () => {
  test('it should be valid to enter an email address as string', () => {
    expect(recipientEmail('foo@bar.com')).toBe(true);
  });
});

describe('Validation - recipientEmail - returns false', () => {
  test('it should be invalid to enter an empty email address as value', () => {
    expect(recipientEmail('')).toBe(false);
  });
});
