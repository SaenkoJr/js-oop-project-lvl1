/* eslint-disable class-methods-use-this */

import StringSchema from './StringSchema';
import NumberSchema from './NumberSchema';
import ArraySchema from './ArraySchema';
import ShapeSchema from './ShapeSchema';

export default class Validator {
  constructor() {
    this.validators = {
      string: {},
      number: {},
      array: {},
      shape: {},
    };
  }

  addValidator(schema, name, validator) {
    this.validators = {
      ...this.validators,
      [schema]: {
        ...this.validators[schema],
        [name]: validator,
      },
    };
  }

  string() {
    return new StringSchema([], this.validators.string);
  }

  number() {
    return new NumberSchema([], this.validators.number);
  }

  array() {
    return new ArraySchema([], this.validators.array);
  }

  object() {
    return new ShapeSchema();
  }
}
