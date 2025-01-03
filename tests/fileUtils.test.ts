import fs from 'fs';
import { expect, test } from 'vitest';
import { deleteFile, readFile, writeFile } from '../src/utils/fileUtils';

test('should write, read, and delete a file', () => {
  const path = './test.txt';
  writeFile(path, 'Hello, world!');
  const content = readFile(path);
  expect(content).toBe('Hello, world!');
  deleteFile(path);
  expect(fs.existsSync(path)).toBe(false);
});
