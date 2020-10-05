import name from './name';

describe('Validation - name - returns false', () => {
  test('it should be valid if there is at least one letter', () => {
    expect(name('L')).toBe(true);
  });

  test('it should be valid if there is at least one letter followed by a dot', () => {
    expect(name('L.')).toBe(true);
  });

  test('it should be valid if there is are 2 capital letters', () => {
    expect(name('HC')).toBe(true);
  });

  test('it should be valid if the name is divided by dots', () => {
    expect(name('J. R. R. Tolkien')).toBe(true);
  });

  test('it should be invalid if the name is very long', () => {
    expect(name('Danaerys Targaryan Khaleesi of the Great Grass Sea Mother of Dragons Breaker of'
            + 'Chains the Unburnt')).toBe(false);
  });

  test('it should be valid if there is one dashe', () => {
    expect(name('Jay-Z')).toBe(true);
  });

  test('it should be valid if there are multiple dashes', () => {
    expect(name('Jay-Z-Bee')).toBe(true);
  });

  test('it should be valid if there are capital letters within a word', () => {
    expect(name('MacFeegle')).toBe(true);
  });

  test('it should be valid if there is a dash between two spaces', () => {
    expect(name('The - Dude')).toBe(true);
  });

  test('it should be valid if there is a dot followed by a dash', () => {
    expect(name('Martin F.-D.')).toBe(true);
  });

  test('it should be valid if there are german special chars', () => {
    expect(name('Jürgen')).toBe(true);
  });

  test('it should be valid if there are multiple german special chars', () => {
    expect(name('Jüüürgen')).toBe(true);
  });

  test('it should be valid if there are two names divided by a dash', () => {
    expect(name('Clara-Lucia')).toBe(true);
  });

  test('it should be valid if there are multiple names divided by a dash', () => {
    expect(name('Clara-Laura-Maura')).toBe(true);
  });
});

describe('Validation - name - returns false', () => {
  test('it should be valid if there are numbers', () => {
    expect(name('2cool4school')).toBe(true);
  });

  test('it should be invalid if there are only numbers', () => {
    expect(name('12345')).toBe(false);
  });

  test('it should be invalid if there is only one space', () => {
    expect(name(' ')).toBe(false);
  });

  test('it should be invalid if there are multiple spaces', () => {
    expect(name('   ')).toBe(false);
  });

  test('it should be invalid if there are multiple dividing spaces', () => {
    expect(name('Jon   Snow')).toBe(false);
  });

  test('it should be valid if there are multiple dashes or other special chars', () => {
    expect(name('---')).toBe(true);
  });

  test('it should be valid if there are emojis', () => {
    expect(name('😎 MacFeegle')).toBe(true);
  });

  test('it should be valid if the name is all caps', () => {
    expect(name('JENKINS')).toBe(true);
  });
});
