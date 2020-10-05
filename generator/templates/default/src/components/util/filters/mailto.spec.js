import mailto from './mailto';

describe('Filter - Milto', () => {
  test('it should return mailto link', () => {
    expect(mailto('karl.kiwi@karriere.at')).toBe('mailto:karl.kiwi@karriere.at');
  });
});
