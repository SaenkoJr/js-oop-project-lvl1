import Schema from './Schema';

export default class ArraySchema extends Schema {
  sizeof(size) {
    const checker = {
      name: 'sizeof',
      errorMsg: 'Array to short',
      validation: (value) => value.length >= size,
    };

    return new ArraySchema([...this.checkers, checker]);
  }
}
