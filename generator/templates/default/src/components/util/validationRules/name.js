/**
 * Valid if value is a well formatted name
 *
 * @param value
 * @returns {boolean}
 */
const name = (value) => {
  if (!value || value.length === 0) {
    return true;
  }

  if (value.trim().length === 0) {
    return false;
  }

  return ((value.match(/\s{2,}/) === null) && value.match(/[^1-9]+$/g) !== null) && value.length <= 50;
};

export default name;
