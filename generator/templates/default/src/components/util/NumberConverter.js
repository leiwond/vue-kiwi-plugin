import { round } from 'lodash';

class NumberConverter {
  /**
     * Round a number to given decimals
     *
     * @param number
     * @param decimals
     * @returns {number}
     */
  static round(number, decimals = 2) {
    if (typeof number === 'string' && number.includes(',')) {
      throw new Error('Strings with , are not allowed! Use . instead');
    }

    return round(number, decimals);
  }
}

export default NumberConverter;
