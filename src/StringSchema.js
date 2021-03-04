import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';

import Schema from './Schema';

export default class StringScheme extends Schema {
  static defaultOptions = {
    isRequired: false,
    minLength: 0,
    substr: '',
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
    return new StringScheme({ ...this.options, isRequired: true });
  }

  minLength(length) {
    return new StringScheme({ ...this.options, minLength: length });
  }

  contains(str) {
    return new StringScheme({ ...this.options, substr: str });
  }

  isValid(str) {
    const { isRequired, minLength, substr } = this.options;

    if (isNull(str)) {
      return false;
    }

    if (isRequired && isEmpty(str)) {
      this.errors = [...this.errors, { name: 'required' }];
    }

    if (str.length < minLength) {
      this.errors = [...this.errors, { name: 'min length' }];
    }

    if (!str.includes(substr)) {
      this.errors = [...this.errors, { name: 'contains' }];
    }

    return isEmpty(this.errors);
  }
}
