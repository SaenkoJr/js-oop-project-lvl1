import {
  beforeEach,
  expect,
  describe,
  it,
} from '@jest/globals';
import Validator from '../src/index';

describe('Validator', () => {
  let v;
  let schema;

  describe('Validation strings', () => {
    beforeEach(() => {
      v = new Validator();
      schema = v.string();
    });

    it('base', () => {
      expect(schema.isValid('')).toBeTruthy();
    });

    it('required', () => {
      const required = schema.required();

      expect(required.isValid('what does the fox say')).toBeTruthy();
      expect(required.isValid('hexlet')).toBeTruthy();
      expect(required.isValid(null)).toBeFalsy();
      expect(required.isValid('')).toBeFalsy();

      expect(required.contains('what').isValid('what does the fox say')).toBeTruthy();
      expect(required.contains('whatthe').isValid('what does the fox say')).toBeFalsy();
    });

    it('min length', () => {
      expect(schema.minLength(0).isValid('')).toBeTruthy();
      expect(schema.minLength(2).isValid('')).toBeFalsy();
      expect(schema.minLength(2).isValid('abc')).toBeTruthy();
    });
  });

  describe('Validation numbers', () => {
    beforeEach(() => {
      v = new Validator();
      schema = v.number();
    });

    it('base', () => {
      expect(schema.isValid(42)).toBeTruthy();
      expect(schema.isValid(null)).toBeTruthy();
    });

    it('required', () => {
      const required = schema.required();

      expect(required.isValid(42)).toBeTruthy();
      expect(required.isValid(null)).toBeFalsy();
    });

    it('positive', () => {
      expect(schema.positive().isValid(42)).toBeTruthy();
      expect(schema.positive().isValid(0)).toBeTruthy();
      expect(schema.positive().isValid(null)).toBeTruthy();
      expect(schema.positive().isValid(-42)).toBeFalsy();
    });

    it('range', () => {
      const ranged = schema.range(-5, 5);

      expect(ranged.isValid(3)).toBeTruthy();
      expect(ranged.isValid(-2)).toBeTruthy();
      expect(ranged.isValid(42)).toBeFalsy();
      expect(ranged.isValid(-42)).toBeFalsy();
    });
  });

  describe('Validation array', () => {
    beforeEach(() => {
      v = new Validator();
      schema = v.array();
    });

    it('base', () => {
      expect(schema.isValid([])).toBeTruthy();
      expect(schema.isValid(null)).toBeTruthy();
    });

    it('required', () => {
      const required = schema.required();

      expect(required.isValid([])).toBeTruthy();
      expect(required.isValid(['jopa'])).toBeTruthy();
      expect(required.isValid(null)).toBeFalsy();
    });

    it('sizeof', () => {
      const sizeof = schema.sizeof(2);

      expect(sizeof.isValid([1, 2])).toBeTruthy();
      expect(sizeof.isValid([1])).toBeFalsy();
      expect(sizeof.isValid([])).toBeFalsy();
    });
  });

  describe('Validation objects', () => {
    beforeEach(() => {
      v = new Validator();
      schema = v.object();
    });

    it('shape', () => {
      const shape = schema.shape({
        name: v.string().required(),
        age: v.number().positive(),
      });

      expect(shape.isValid({ name: 'kolya', age: 100 })).toBeTruthy();
      expect(shape.isValid({ name: 'maya', age: null })).toBeTruthy();
      expect(shape.isValid({ name: '', age: null })).toBeFalsy();
      expect(shape.isValid({ name: 'ada', age: -5 })).toBeFalsy();
    });
  });

  describe('Custom validations', () => {
    beforeEach(() => {
      v = new Validator();
    });

    it('custom string validator', () => {
      const fn = (value, start) => value.startsWith(start);

      v.addValidator('string', 'startWith', fn);

      schema = v.string().test('startWith', 'H');
      expect(schema.isValid('exlet')).toBeFalsy();
      expect(schema.isValid('Hexlet')).toBeTruthy();
    });

    it('custom number validator', () => {
      const fn = (value, min) => value >= min;

      v.addValidator('number', 'min', fn);

      schema = v.number().test('min', 3);
      expect(schema.isValid(2)).toBeFalsy();
      expect(schema.isValid(6)).toBeTruthy();
    });
  });
});
