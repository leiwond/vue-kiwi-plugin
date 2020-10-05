import website from './website';

describe('Validation - Website', () => {
  test('it should be valid if it is a well formatted website', () => {
    expect(website('http://www.karriere.at')).toBe(true);
  });

  test('it should be valid if it is a well formatted https website', () => {
    expect(website('https://www.karriere.at')).toBe(true);
  });

  test('it should be valid if it is a well formatted website without www', () => {
    expect(website('http://karriere.at')).toBe(true);
  });

  test('it should be invalid if the protocol is omitted', () => {
    expect(website('www.karriere.at')).toBe(false);
  });

  test('it should be valid if the url contains subdirectories', () => {
    expect(website('http://www.karriere.at/foo/bar')).toBe(true);
  });

  test('it should be valid if the url contains a port', () => {
    expect(website('http://www.karriere.at:8080')).toBe(true);
  });

  test('it should be invalid if the tld is missing', () => {
    expect(website('http://www.karriere')).toBe(false);
  });

  test('it should be invalid if the protocol is not supported', () => {
    expect(website('abc://www.karriere.at')).toBe(false);
  });

  test('it should be invalid if it is not a website at all', () => {
    expect(website('karriere.at - das Portal der Möglichkeiten')).toBe(false);
  });
});
