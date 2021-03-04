/* eslint-disable */

import StringSchema from './StringSchema';
import NumberSchema from './NumberSchema';
import ArraySchema from './ArraySchema';
import ShapeSchema from './ShapeSchema';

export default class Validator {
  string() {
    return new StringSchema();
  }

  number() {
    return new NumberSchema();
  }

  array() {
    return new ArraySchema();
  }

  object() {
    return new ShapeSchema();
  }
}
