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
    const checker = {
      name: 'required',
      errorMsg: 'Value is required',
      validation: (value) => !isNull(value),
    };

    return new this.constructor([...this.checkers, checker]);
  }

  test(validatorName, v) {
    const customChecker = this.customCheckers[validatorName] ?? noop;
    const checker = {
      name: validatorName,
      errorMsg: 'Custom validator error.',
      validation: (value) => customChecker(value, v),
    };

    return new this.constructor([...this.checkers, checker]);
  }

  isValid(value) {
    this.errors = {};

    this.checkers.forEach(({ name, errorMsg, validation }) => {
      const isValid = validation(value);
      if (isValid) {
        return;
      }

      this.errors[name] = errorMsg;
    });

    return isEmpty(this.errors);
  }
}
