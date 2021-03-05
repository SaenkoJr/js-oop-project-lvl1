import inRange from 'lodash/inRange';

import Schema from './Schema';

export default class NumberSchema extends Schema {
  positive() {
    const fn = (value) => value > 0;
    this.addChecker('positive', fn, 'Number must be positive');

    return this;
  }

  range(start, end) {
    const fn = (value) => inRange(value, start, end);
    this.addChecker(
      'range',
      fn,
      `Number must in range between ${start} and ${end}`,
    );

    return this;
  }
}
