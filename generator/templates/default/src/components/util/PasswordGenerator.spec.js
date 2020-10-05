import PasswortGenerator from './PasswordGenerator';

describe('Password Generator', () => {
  test('it should generate a password with default settings', () => {
    const password = PasswortGenerator.generate();

    // 10 alphanumeric characters, no special chars
    expect(password).toMatch(/^[A-Za-z0-9]{10}$/);
  });

  test('it should generate a password with given length', () => {
    const password = PasswortGenerator.generate(15);

    // 15 alphanumeric characters, no special chars
    expect(password).toMatch(/^[A-Za-z0-9]{15}$/);
  });

  test('it should generate a password with special characters', () => {
    const password = PasswortGenerator.generate(8, true, true, true);

    // at least one non-alphanumeric character
    expect(password).toMatch(/[^A-Za-z0-9]+/);
  });
});
