import { describe, it, expect } from 'vitest';
import { capitalize, slugify, snakeToCamel } from '../utils/stringUtils';

describe('StringUtils', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should return an empty string if input is empty', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle strings with leading spaces', () => {
    expect(capitalize('  hello')).toBe('  Hello');
  });

  it('should remove special characters', () => {
    expect(slugify('Hello, World! @#$%')).toBe('hello-world');
  });

  it('should convert uppercase letters to lowercase', () => {
    expect(slugify('HELLO WORLD')).toBe('hello-world');
  });

  it('should handle multiple consecutive spaces', () => {
    expect(slugify('Hello    World')).toBe('hello-world');
  });

  it('should handle strings with only special characters', () => {
    expect(slugify('@#$%^&*()!')).toBe('');
  });

  it('should handle leading and trailing spaces', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world');
  });

  it('should convert a snake_case string to camelCase', () => {
    expect(snakeToCamel('hello_world')).toBe('helloWorld');
    expect(snakeToCamel('foo_bar_baz')).toBe('fooBarBaz');
    expect(snakeToCamel('snake_case_string')).toBe('snakeCaseString');
  });

  it('should handle multiple underscores in the input string', () => {
    expect(snakeToCamel('multiple__underscores___in____string')).toBe(
      'multipleUnderscoresInString',
    );
  });

  it('should return the same string if no underscores are present', () => {
    expect(snakeToCamel('helloworld')).toBe('helloworld');
    expect(snakeToCamel('alreadycamelcase')).toBe('alreadycamelcase');
  });

  it('should correctly convert strings with numbers', () => {
    expect(snakeToCamel('user_id_123')).toBe('userId123');
    expect(snakeToCamel('item_1_name')).toBe('item1Name');
    expect(snakeToCamel('order_2022_01_15')).toBe('order20220115');
  });
});
