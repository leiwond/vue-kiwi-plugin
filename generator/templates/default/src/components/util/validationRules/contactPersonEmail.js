import { email } from 'vuelidate/lib/validators';

/**
 * Valid if value is object with valid email field
 *
 * @param value
 * @returns {boolean}
 */
const contactPersonEmail = (value) => {
  if (value !== null && typeof value.email !== 'undefined') {
    return value.email !== '' && email(value.email);
  }
  return true;
};

export default contactPersonEmail;
