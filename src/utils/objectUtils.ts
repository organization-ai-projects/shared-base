export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> | Partial<T[P]> | null : T[P];
};

/**
 * Merge two objects deeply.
 *
 * This function will recursively call itself when encountering an object as a value in the source object.
 * If the value is not an object, it will simply be copied over from the source to the target.
 *
 * If a key is missing from the target object, it will be added from the source object.
 * If a key is present in both objects and the value is an object, it will be merged.
 * If a key is present in both objects and the value is not an object, the value from the source object will be used.
 *
 * @example
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * const merged = deepMerge(obj1, obj2);
 * // merged is { a: 1, b: { c: 2, d: 3 }, e: 4 }
 *
 * @param target The target object to be merged.
 * @param source The source object to merge from.
 * @returns The merged object.
 */
export function deepMerge<T extends object>(target: T, source: DeepPartial<T>): T {
  const output = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      typeof target[key] === 'object'
    ) {
      output[key] = deepMerge(target[key] as object, source[key] as object) as T[Extract<
        keyof T,
        string
      >];
    } else {
      output[key] = source[key] as T[Extract<keyof T, string>];
    }
  }

  return output;
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function mergeObjects<T1, T2>(obj1: T1, obj2: T2): T1 & T2 {
  return { ...obj1, ...obj2 };
}
