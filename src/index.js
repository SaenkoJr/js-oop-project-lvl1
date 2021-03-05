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
    const customValidators = this.validators.string;
    return new StringSchema([], customValidators);
  }

  number() {
    const customValidators = this.validators.number;
    return new NumberSchema([], customValidators);
  }

  array() {
    const customValidators = this.validators.array;
    return new ArraySchema([], customValidators);
  }

  object() {
    return new ShapeSchema();
  }
}
