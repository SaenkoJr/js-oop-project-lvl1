import Schema from './Schema';

export default class ShapeSchema extends Schema {
  constructor(objSchema = {}) {
    super();
    this.objSchema = objSchema;
  }

  shape(objSchema) {
    return new ShapeSchema({ ...this.objSchema, ...objSchema });
  }

  isValid(obj) {
    const isValid = Object.entries(this.objSchema)
      .map(([name, schema]) => schema.isValid(obj[name]))
      .every((result) => result);

    return isValid;
  }
}
