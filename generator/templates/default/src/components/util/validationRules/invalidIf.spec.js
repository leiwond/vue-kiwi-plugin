import invalidIf from './invalidIf';

describe('Validation - InvalidIf', () => {
  test('it should be valid if the reference value does not match the condition', () => {
    expect(invalidIf(() => false)()).toBe(true);
  });

  test('it should be invalid if the reference value matches the condition', () => {
    expect(invalidIf(() => true)()).toBe(false);
  });
});
