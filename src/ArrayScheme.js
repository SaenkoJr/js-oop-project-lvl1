import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';

import Scheme from './Scheme';

export default class ArrayScheme extends Scheme {
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
    this.options = { ...this.options, isRequired: true };
  }

  sizeof(size) {
    this.options = { ...this.options, size };
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
