/**
 * Valid if value is object with email field not empty
 *
 * @param value
 * @returns {boolean}
 */
const contactPersonEmailNotEmpty = (value) => {
  if (value !== null && typeof value.email !== 'undefined') {
    return value.email.length > 0;
  }
  return true;
};

export default contactPersonEmailNotEmpty;
