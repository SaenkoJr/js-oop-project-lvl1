import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

import Schema from './Schema';

export default class StringScheme extends Schema {
  minLength(length) {
    const fn = (value) => value.length >= length;
    this.addChecker('minLength', fn, 'Line too short');

    return this;
  }

  contains(str) {
    const fn = (value) => value.includes(str);
    this.addChecker('contains', fn, `String must contain "${str}"`);

    return this;
  }

  required() {
    const fn = (value) => !isNull(value) && !isEmpty(value);
    this.addChecker('required', fn, 'Value is required');

    return this;
  }
}
