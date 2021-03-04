import {
  beforeEach,
  expect,
  describe,
  it,
} from '@jest/globals';
import Validator from '../src/index';

describe('Validator', () => {
  let v;
  let scheme;

  describe('Validation strings', () => {
    beforeEach(() => {
      v = new Validator();
      scheme = v.string();
    });

    it('base', () => {
      expect(scheme.isValid('')).toBeTruthy();
    });

    it('required', () => {
      scheme.required();

      expect(scheme.isValid('what does the fox say')).toBeTruthy();
      expect(scheme.isValid('hexlet')).toBeTruthy();
      expect(scheme.isValid(null)).toBeFalsy();
      expect(scheme.isValid('')).toBeFalsy();

      expect(scheme.contains('what').isValid('what does the fox say')).toBeTruthy();
      expect(scheme.contains('whatthe').isValid('what does the fox say')).toBeFalsy();
    });

    it('min length', () => {
      expect(scheme.minLength(0).isValid('')).toBeTruthy();
      expect(scheme.minLength(2).isValid('')).toBeFalsy();
      expect(scheme.minLength(2).isValid('abc')).toBeTruthy();
    });
  });

  describe('Validation numbers', () => {
    beforeEach(() => {
      v = new Validator();
      scheme = v.number();
    });

    it('base', () => {
      expect(scheme.isValid(42)).toBeTruthy();
      expect(scheme.isValid(null)).toBeTruthy();
    });

    it('required', () => {
      scheme.required();

      expect(scheme.isValid(42)).toBeTruthy();
      expect(scheme.isValid(null)).toBeFalsy();
    });

    it('positive', () => {
      expect(scheme.positive().isValid(42)).toBeTruthy();
      expect(scheme.positive().isValid(0)).toBeTruthy();
      expect(scheme.positive().isValid(-42)).toBeFalsy();
    });

    it('range', () => {
      scheme.range(-5, 5);

      expect(scheme.isValid(3)).toBeTruthy();
      expect(scheme.isValid(-2)).toBeTruthy();
      expect(scheme.isValid(42)).toBeFalsy();
      expect(scheme.isValid(-42)).toBeFalsy();
    });
  });

  describe('Validation array', () => {
    beforeEach(() => {
      v = new Validator();
      scheme = v.array();
    });

    it('base', () => {
      expect(scheme.isValid([])).toBeTruthy();
      expect(scheme.isValid(null)).toBeTruthy();
    });

    it('required', () => {
      scheme.required();

      expect(scheme.isValid([])).toBeTruthy();
      expect(scheme.isValid(['jopa'])).toBeTruthy();
      expect(scheme.isValid(null)).toBeFalsy();
    });

    it('sizeof', () => {
      scheme.sizeof(2);

      expect(scheme.isValid([1, 2])).toBeTruthy();
      expect(scheme.isValid([1])).toBeFalsy();
      expect(scheme.isValid([])).toBeFalsy();
    });
  });
});
