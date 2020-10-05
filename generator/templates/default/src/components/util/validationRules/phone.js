/**
 * Valid if value is a well formatted phone number.
 *
 * @param value
 * @returns {boolean}
 */
const phone = (value) => {
  if (!value || value.length === 0) {
    return true;
  }

  return value.match(/^\+[0-9]{1,3} (?:[0-9]+(?: |-)?)+$/) !== null;
};

export default phone;
