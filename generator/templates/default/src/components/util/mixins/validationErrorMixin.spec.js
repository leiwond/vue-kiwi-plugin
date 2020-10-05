import validationErrorMixin from './validationErrorMixin';

describe('Mixin for validation errors', () => {
  test('it should return a default error message if no message is defined', () => {
    const $v = {
      $error: true,
      $params: {
        required: {},
      },
    };

    const msg = validationErrorMixin.methods.validationError($v);

    expect(msg).toEqual('Bitte fülle dieses Feld aus!');
  });

  test('it should return the error message that was defined as key in the validations object', () => {
    const $v = {
      $error: true,
      $params: {
        'Dies ist ein Pflichtfeld!': {},
      },
    };

    const msg = validationErrorMixin.methods.validationError($v);

    expect(msg).toEqual('Dies ist ein Pflichtfeld!');
  });

  test('it should return an empty string if no error occurred', () => {
    const $v = {
      $error: false,
      $params: {
        required: {},
      },
    };

    const msg = validationErrorMixin.methods.validationError($v);

    expect(msg).toEqual('');
  });
});
