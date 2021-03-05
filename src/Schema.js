import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import noop from 'lodash/noop';

export default class Schema {
  constructor(checkers = [], customCheckers = {}) {
    this.checkers = checkers;
    this.customCheckers = customCheckers;
    this.errors = {};
  }

  required() {
    const fn = (value) => !isNull(value);
    this.addChecker('required', fn, 'Value is required');

    return this;
  }

  test(validatorName, ...args) {
    const customValidator = this.customCheckers[validatorName] ?? noop;
    const fn = (value) => customValidator(value, ...args);
    this.addChecker(validatorName, fn, 'Custom validator error');

    return this;
  }

  isValid(value) {
    this.errors = {};

    this.checkers.forEach(({ name, errorMessage, validator }) => {
      const isValid = validator(value);
      if (isValid) {
        return;
      }

      this.errors[name] = errorMessage;
    });

    return isEmpty(this.errors);
  }

  addChecker(name, validator, errorMessage = 'Error') {
    this.checkers = [
      ...this.checkers,
      { name, validator, errorMessage },
    ];
  }
}
