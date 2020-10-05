/**
 * A mixin that provides error messages when validating with Vuelidate
 *
 * Use the keys of your validation definition object to define error messages.
 * If no explicit keys are given, the validator type determines a default error message.
 *
 * Use `validationError($validator)` and pass the validator node of the current form field.
 *
 * Defintion examle:
 *
 * validations: {
 *   name: {
 *     'Please enter your name': required
 *   },
 *   email: {
 *     required // the default 'required' message will appear if validation fails
 *     'This is not a valid e-mail: email // 'This is not a valid e-mail' will appear
 *     if validation fails
 *   }
 * }
 *
 * Usage example:
 *
 * <div class="error">
 *   {{ validationError($v.name) }}
 * </div>
 */

import Vue from 'vue';

const validationErrorMixin = {
  methods: {
    validationError(v) {
      let msg = '';

      if (v.$error) {
        Object.keys(v.$params).some((key) => {
          if (!v[key]) {
            msg = this._getDefaultErrorMessage(key, v.$params[key]) || key;
            return true;
          }
          return false;
        });
      }

      return msg;
    },

    focusFirstInvalidField() {
      Vue.nextTick(() => {
        const invalidInput = document.querySelector('.v-label.error--text');
        if (invalidInput) {
          invalidInput.scrollIntoView();
          const invalidControl = invalidInput.parentNode.querySelector('input, textarea');
          if (invalidControl) {
            invalidControl.focus();
          }
        }
      });
    },

    _getDefaultErrorMessage(type, params) {
      switch (type) {
        // builtin Vuelidate validators
        case 'alpha': return 'Es sind nur Buchstaben erlaubt!';
        case 'alphaNum': return 'Es sind nur Buchstaben und Zahlen erlaubt!';
        case 'between': return `Bitte gib einen Wert zwischen ${params.min} und ${params.max} ein!`;
        case 'email': return 'Das ist keine gültige E-Mail-Adresse!';
        case 'maxLength': return `Es sind maximal ${params.max} Zeichen erlaubt!`;
        case 'maxValue': return `Bitte wähle einen Wert kleiner oder gleich ${params.max}`;
        case 'minLength': return `Bitte gib mindestens ${params.min} Zeichen ein!`;
        case 'minValue': return `Bitte wähle einen Wert größer oder gleich ${params.min}`;
        case 'numeric': return 'Es sind nur Zahlen erlaubt!';
        case 'required': return 'Bitte fülle dieses Feld aus!';
        case 'requiredIf': return 'Bitte fülle dieses Feld aus!';
        case 'requiredUnless': return 'Bitte fülle dieses Feld aus!';
        case 'url': return 'Das ist keine gültige URL!';

          // custom validators
        case 'phone': return 'Bitte gib eine Telefonnummer im Format +43 123 456789 ein!';
        case 'website': return 'Bitte gib eine Website inkl. Protokoll (http://, ...) ein!';
        case 'isUnique': return 'Dieser Wert existiert bereits!';

          // unsupported validators:
          // sameAs
          // greaterThan
          // lessThan
          // invalidIf
        default: return null;
      }
    },
  },
};

export default validationErrorMixin;
