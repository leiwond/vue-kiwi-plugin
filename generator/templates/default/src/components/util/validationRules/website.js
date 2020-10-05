/**
 * Valid if value is a URL.
 *
 * @param value
 * @returns {boolean}
 */
const website = (value) => {
  const protocols = '(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)';
  const domain = '[a-zA-Zäöüß0-9]+([\\-\\.][a-zA-Zäöüß0-9]+)*';
  const tld = '\\.[a-zA-Zäöüß]{2,24}';
  const port = '(:[\\d]+)?';
  const path = '(\\/\\S*)?';
  const regexp = new RegExp(`^${protocols}${domain}${tld}${port}${path}$`);

  // If website contains "www." it must also contain at least two dots "."
  if (value.includes('www.') && value.split('.').length < 3) {
    return false;
  }

  return !(!regexp.test(value) && !!String(value).length);
};

export default website;
