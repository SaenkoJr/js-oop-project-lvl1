/* eslint-disable */

import StringScheme from './StringScheme';
import NumberScheme from './NumberScheme';
import ArrayScheme from './ArrayScheme';

export default class Validator {
  string() {
    return new StringScheme();
  }

  number() {
    return new NumberScheme();
  }

  array() {
    return new ArrayScheme();
  }
}
