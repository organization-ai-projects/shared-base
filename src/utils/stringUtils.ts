/**
 * Takes a string and capitalizes the first letter. If the string is empty, or
 * if the first character is not a letter, the string is returned as is.
 *
 * @param {string} str The string to capitalize.
 * @returns {string} The string with the first letter capitalized.
 */
export function capitalize(str: string): string {
  if (str.length === 0) return '';

  const match = str.match(/^(\s*)(\w)(.*)$/);
  if (!match) return str;

  const [, spaces, firstChar, rest] = match;
  return spaces + firstChar.toUpperCase() + rest;
}

/**
 * Converts a string to a slug that can be used as an identifier.
 *
 * This function will:
 * 1. Convert the string to lower case.
 * 2. Trim any leading or trailing whitespace.
 * 3. Replace any whitespace characters with a single hyphen.
 * 4. Remove any characters that are not alphanumeric or a hyphen.
 * 5. Remove any trailing hyphens.
 *
 * @example
 * slugify('Hello World! @#$%') // 'hello-world'
 * slugify('  Multiple   spaces   ') // 'multiple-spaces'
 * slugify('!@#$%^&*()') // ''
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+$/, '');
}

/**
 * Converts a snake_case string to camelCase.
 *
 * @example
 * snakeToCamel('hello_world') // 'helloWorld'
 * snakeToCamel('multiple__underscores___in____string') // 'multipleUnderscoresInString'
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_+/g, '_').replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
}
