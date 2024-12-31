import { test, expect } from 'vitest';
import { readFile, writeFile, deleteFile } from '../utils/fileUtils';
import fs from 'fs';

test('should write, read, and delete a file', () => {
  const path = './test.txt';
  writeFile(path, 'Hello, world!');
  const content = readFile(path);
  expect(content).toBe('Hello, world!');
  deleteFile(path);
  expect(fs.existsSync(path)).toBe(false);
});
