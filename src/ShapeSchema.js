import Schema from './Schema';

export default class ShapeSchema extends Schema {
  constructor() {
    super();
    this.objSchema = {};
  }

  shape(objSchema) {
    this.objSchema = objSchema;
    return this;
  }

  isValid(obj) {
    const isValid = Object.entries(this.objSchema)
      .map(([name, schema]) => schema.isValid(obj[name]))
      .every((result) => result);

    return isValid;
  }
}
