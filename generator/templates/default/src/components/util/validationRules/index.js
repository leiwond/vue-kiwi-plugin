// Import default validation rules
import {
  alpha, alphaNum, numeric, between, email, maxLength, minLength,
  minValue, required, sameAs, or, and, requiredIf, requiredUnless,
} from 'vuelidate/lib/validators';

// Import custom validation rules
import website from './website';
import phone from './phone';
import invalidIf from './invalidIf';
import greaterThan from './greaterThan';
import lessThan from './lessThan';
import name from './name';
import recipientEmail from './recipientEmail';
import contactPersonEmail from './contactPersonEmail';
import contactPersonEmailNotEmpty from './contactPersonEmailNotEmpty';
import absoluteDiscount from './absoluteDiscount';
import listPrice from './listPrice';

export {
  // Default validation
  alpha, alphaNum, numeric, between, email, maxLength, minLength,
  minValue, required, sameAs, or, and, requiredIf, requiredUnless,

  // Custom validation
  website,
  phone,
  invalidIf,
  lessThan,
  greaterThan,
  name,
  recipientEmail,
  contactPersonEmail,
  contactPersonEmailNotEmpty,
  absoluteDiscount,
  listPrice,
};
