import httpLink from './httpLink';

describe('Validation - httpLink starting without slashes - returned link must start with http://', () => {
  test('it should be valid if the lowercase link begins with http://', () => {
    expect(httpLink('www.klara-wittibschlager.at')).toBe('http://www.klara-wittibschlager.at');
  });
  test('it should be valid if the uppercase link begins with http://', () => {
    expect(httpLink('www.klara-wittibschlager.at'.toUpperCase())).toBe('http://www.klara-wittibschlager.at');
  });
  test('it should be valid if the mixed case link begins with http://', () => {
    expect(httpLink('www.WTF')).toBe('http://www.wtf');
  });
  test('it should be valid if the link containing numbers begins with http://', () => {
    expect(httpLink('www.WTF24.de')).toBe('http://www.wtf24.de');
  });
  test('it should be valid if the link made up of only numbers begins with http://', () => {
    expect(httpLink('24')).toBe('http://24');
  });
});

describe('Validation - httpLink starting with two slashes - returned link must start with http://', () => {
  test('it should be valid if the lowercase // link begins with http://', () => {
    expect(httpLink('//www.klara-wittibschlager.at')).toBe('http://www.klara-wittibschlager.at');
  });
  test('it should be valid if the uppercase // link begins with http://', () => {
    expect(httpLink('//www.klara-wittibschlager.at'.toUpperCase())).toBe('http://www.klara-wittibschlager.at');
  });
  test('it should be valid if the mixed case // link begins with http://', () => {
    expect(httpLink('//www.WTF')).toBe('http://www.wtf');
  });
  test('it should be valid if the // link containing numbers begins with http://', () => {
    expect(httpLink('//www.WTF24.de')).toBe('http://www.wtf24.de');
  });
  test('it should be valid if the // link made up of only numbers begins with http://', () => {
    expect(httpLink('//24')).toBe('http://24');
  });
});

describe('Validation - httpsLink starting with https:// - returned link is exactly the same', () => {
  test('it should be valid if the lowercase https:// link', () => {
    expect(httpLink('https://www.klara-wittibschlager.at')).toBe('https://www.klara-wittibschlager.at');
  });
  test('it should be valid if the uppercase https:// link', () => {
    expect(httpLink('https://www.klara-wittibschlager.at'.toUpperCase()))
      .toBe('https://www.klara-wittibschlager.at');
  });
  test('it should be valid if the mixed case https:// link', () => {
    expect(httpLink('https://www.WTF')).toBe('https://www.wtf');
  });
  test('it should be valid if the https:// link containing numbers', () => {
    expect(httpLink('https://www.WTF24.de')).toBe('https://www.wtf24.de');
  });
  test('it should be valid if the https:// link made up of only numbers', () => {
    expect(httpLink('https://24')).toBe('https://24');
  });
});
