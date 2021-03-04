import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import inRange from 'lodash/inRange';

import Schema from './Schema';

export default class NumberSchema extends Schema {
  static defaultOptions = {
    isRequired: false,
    isPositive: false,
    range: {
      isCheck: false,
      start: null,
      end: null,
    },
  };

  constructor(options = {}) {
    super();
    this.options = {
      ...this.constructor.defaultOptions,
      ...options,
    };
    this.errors = [];
  }

  required() {
    return new NumberSchema({ ...this.options, isRequired: true });
  }

  positive() {
    return new NumberSchema({ ...this.options, isPositive: true });
  }

  range(start, end) {
    return new NumberSchema({
      ...this.options,
      range: { isCheck: true, start, end },
    });
  }

  isValid(num) {
    const { isRequired, isPositive, range } = this.options;

    if (isRequired && isNull(num)) {
      this.errors = [...this.errors, { name: 'required' }];
    }

    if (isPositive && num < 0) {
      this.errors = [...this.errors, { name: 'positive' }];
    }

    if (range.isCheck && !inRange(num, range.start, range.end)) {
      this.errors = [...this.errors, { name: 'range' }];
    }

    return isEmpty(this.errors);
  }
}
