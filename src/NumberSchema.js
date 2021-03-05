import inRange from 'lodash/inRange';

import Schema from './Schema';

export default class NumberSchema extends Schema {
  positive() {
    const checker = {
      name: 'positive',
      errorMsg: 'Number must be positive',
      validation: (value) => value >= 0,
    };

    return new NumberSchema([...this.checkers, checker]);
  }

  range(start, end) {
    const checker = {
      name: 'range',
      errorMsg: `Number must in range between ${start} and ${end}`,
      validation: (value) => inRange(value, start, end),
    };

    return new NumberSchema([...this.checkers, checker]);
  }
}
