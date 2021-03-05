import Schema from './Schema';

export default class ArraySchema extends Schema {
  sizeof(size) {
    const fn = (value) => value.length >= size;
    this.addChecker('sizeof', fn, 'Array to short');

    return this;
  }
}
