/**
 * Utility for generating passwords
 */
class PasswordGenerator {
  constructor() {
    this.alphabetic = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    this.numeric = '0123456789';
    this.special = '!@#$%_+-.';
  }

  generate(length = 10, requireNumber = true, requireSpecial = false, includeSpecial = false) {
    const chars = [];
    let all = this.alphabetic + this.numeric;

    if (includeSpecial) {
      all += this.special;
    }

    // add alphabetic, numeric and special characters
    chars.push(PasswordGenerator._pick(this.alphabetic));

    if (requireNumber) {
      chars.push(PasswordGenerator._pick(this.numeric));
    }

    if (requireSpecial) {
      chars.push(PasswordGenerator._pick(this.special));
    }

    while (chars.length < length) {
      chars.push(PasswordGenerator._pick(all));
    }

    // shuffle
    chars.sort(() => 0.5 - Math.random());

    return chars.join('');
  }

  static _pick(str) {
    const i = Math.floor(Math.random() * str.length);
    return str.charAt(i);
  }
}

export default new PasswordGenerator();
