// Module for array utilities
/**
 * Remove duplicates from an array
 * @param arr - The array to process
 * @returns An array without duplicates
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Shuffle an array randomly
 * @param arr - The array to shuffle
 * @returns A shuffled array
 */
export function shuffle<T>(arr: T[]): T[] {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
