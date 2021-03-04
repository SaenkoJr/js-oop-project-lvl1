import Schema from './Schema';

export default class ShapeSchema extends Schema {
  static defaultOptions = {
    objSchema: {},
  };

  constructor(options = {}) {
    super();
    this.options = {
      ...this.constructor.defaultOptions,
      ...options,
    };
    this.errors = [];
  }

  shape(objSchema) {
    return new ShapeSchema({ ...this.options, objSchema });
  }

  isValid(obj) {
    const { objSchema } = this.options;
    let isValid = true;

    Object.entries(objSchema).forEach(([key, value]) => {
      if (!value.isValid(obj[key])) {
        isValid = false;
      }
    });

    return isValid;
  }
}
