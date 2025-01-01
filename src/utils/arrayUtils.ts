/**
 * Returns a new array containing the elements of the input array, with all
 * duplicate elements removed.
 *
 * The order of the elements in the resulting array is not guaranteed to be
 * the same as the order in the input array.
 * @param array The array from which to remove duplicates.
 * @returns A new array containing the elements of the input array, with all
 *          duplicates removed.
 */
export function removeDuplicates<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Returns a new array containing the elements of the input array in a
 * randomly shuffled order.
 *
 * The Fisher-Yates shuffle algorithm is used to ensure that the elements are
 * shuffled uniformly at random.
 * @param array The array to shuffle.
 * @returns A new array containing the shuffled elements.
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

/**
 * Returns a new array containing only the unique elements from the input array.
 *
 * The function retains the original order of the first occurrence of each element.
 *
 * @param array The array from which to extract unique elements.
 * @returns A new array containing only unique elements from the input array.
 */

export function unique<T>(array: T[]): T[] {
  return array.filter((value, index, self) => self.indexOf(value) === index);
}
