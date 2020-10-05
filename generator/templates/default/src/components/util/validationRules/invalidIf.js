import { helpers } from 'vuelidate/lib/validators';

/**
 * Invalid if field matches condition.
 *
 * @param prop
 */
export default (prop) => helpers.withParams(
  { type: 'invalidIf', value: prop },
  function (value, parentVm) {
    const result = helpers.ref(prop, this, parentVm);
    return typeof result === 'boolean' ? !result : false;
  },
);
