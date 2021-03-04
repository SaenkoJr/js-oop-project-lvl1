import {
  expect,
  describe,
  it,
} from '@jest/globals';
import Validator from '../src';

describe('test validator', () => {
  const v = new Validator();
  let scheme;

  beforeEach(() => {
    scheme = v.string();
  });

  it('validation', () => {
    expect(scheme.isValid('')).toBeTruthy();
  });

  it('scheme required', () => {
    scheme.required();

    expect(scheme.isValid('what does the fox say')).toBeTruthy();
    expect(scheme.isValid('hexlet')).toBeTruthy();
    expect(scheme.isValid(null)).toBeFalsy();
    expect(scheme.isValid('')).toBeFalsy();

    expect(scheme.contains('what').isValid('what does the fox say')).toBeTruthy();
    expect(scheme.contains('whatthe'.isValid('what does the fox say'))).toBeFalsy();
  });
});
