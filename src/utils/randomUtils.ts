// Utilities for generating random data
import { randomUUID } from 'crypto';

/**
 * Generate a random string of a specified length.
 * @param length - The length of the string to generate.
 * @returns A random alphanumeric string.
 */
export function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join(
    '',
  );
}

/**
 * Generate a random number within a given range.
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @returns A random number between min and max.
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random UUID (version 4).
 * @returns A random UUID string.
 */
export function generateUUID(): string {
  return randomUUID();
}
