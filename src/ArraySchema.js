import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';

import Schema from './Schema';

export default class ArrayScheme extends Schema {
  static defaultOptions = {
    isRequired: false,
    size: null,
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
    return new ArrayScheme({ ...this.options, isRequired: true });
  }

  sizeof(size) {
    return new ArrayScheme({ ...this.options, size });
  }

  isValid(arr) {
    const { isRequired, size } = this.options;

    if (isRequired && !Array.isArray(arr)) {
      this.errors = [...this.errors, { name: 'required' }];
    }

    if (!isNull(size) && arr.length < size) {
      this.errors = [...this.errors, { name: 'sizeof' }];
    }

    return isEmpty(this.errors);
  }
}
