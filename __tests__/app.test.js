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
      schema.required();

      expect(schema.isValid('what does the fox say')).toBeTruthy();
      expect(schema.isValid('hexlet')).toBeTruthy();
      expect(schema.isValid(null)).toBeFalsy();
      expect(schema.isValid('')).toBeFalsy();

      expect(!schema.isValid(null)).toBe(true);
      expect(!schema.isValid('')).toBeTruthy();

      expect(schema.contains('what').isValid('what does the fox say')).toBeTruthy();
      expect(schema.contains('whatthe').isValid('what does the fox say')).toBeFalsy();
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
      schema.required();

      expect(schema.isValid(42)).toBeTruthy();
      expect(schema.isValid(null)).toBeFalsy();
    });

    it('positive', () => {
      expect(schema.positive().isValid(42)).toBeTruthy();
      expect(schema.positive().isValid(0)).toBeFalsy();
      expect(schema.positive().isValid(null)).toBeTruthy();
      expect(schema.positive().isValid(-42)).toBeFalsy();
    });

    it('range', () => {
      schema.range(-5, 5);

      expect(schema.isValid(3)).toBeTruthy();
      expect(schema.isValid(-2)).toBeTruthy();
      expect(schema.isValid(42)).toBeFalsy();
      expect(schema.isValid(-42)).toBeFalsy();
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
      schema.required();

      expect(schema.isValid([])).toBeTruthy();
      expect(schema.isValid(['jopa'])).toBeTruthy();
      expect(schema.isValid(null)).toBeFalsy();
    });

    it('sizeof', () => {
      schema.sizeof(2);

      expect(schema.isValid([1, 2])).toBeTruthy();
      expect(schema.isValid([1])).toBeFalsy();
      expect(schema.isValid([])).toBeFalsy();
    });
  });

  describe('Validation objects', () => {
    beforeEach(() => {
      v = new Validator();
      schema = v.object();
    });

    it('shape', () => {
      schema.shape({
        name: v.string().required(),
        age: v.number().positive(),
      });

      expect(schema.isValid({ name: 'kolya', age: 100 })).toBeTruthy();
      expect(schema.isValid({ name: 'maya', age: null })).toBeTruthy();
      expect(schema.isValid({ name: '', age: null })).toBeFalsy();
      expect(schema.isValid({ name: 'ada', age: -5 })).toBeFalsy();
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
