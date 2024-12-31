import { z } from 'zod';

/**
 * Validates whether a given string is a valid UUID.
 *
 * @param uuid - The string to validate as a UUID.
 * @returns `true` if the string is a valid UUID, otherwise `false`.
 */

export const validateUUID = (uuid: string): boolean => {
  const schema = z.string().uuid();
  return schema.safeParse(uuid).success;
};
