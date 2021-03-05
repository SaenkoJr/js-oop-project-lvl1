import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

import Schema from './Schema';

export default class StringScheme extends Schema {
  minLength(length) {
    const checker = {
      name: 'minLength',
      errorMsg: `Line too short. Must be ${length}`,
      validation: (value) => value.length >= length,
    };

    return new StringScheme([...this.checkers, checker]);
  }

  contains(str) {
    const checker = {
      name: 'contains',
      errorMsg: `String must contain "${str}"`,
      validation: (value) => value.includes(str),
    };

    return new StringScheme([...this.checkers, checker]);
  }

  required() {
    const checker = {
      name: 'required',
      errorMsg: 'Value is required',
      validation: (value) => !isNull(value) && !isEmpty(value),
    };

    return new StringScheme([...this.checkers, checker]);
  }
}
