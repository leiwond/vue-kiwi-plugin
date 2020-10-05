import { email } from 'vuelidate/lib/validators';

/**
 * Valid if value is valid email and value.email is not set
 *
 * @param value
 * @returns {boolean}
 */
const recipientEmail = (value) => {
  if (typeof value.email !== 'undefined') {
    // skip this if contactPerson email is set
    return true;
  }
  return value !== null && value !== '' && email(value);
};

export default recipientEmail;
