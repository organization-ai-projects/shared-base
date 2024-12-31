import { z } from 'zod';

/**
 * Validate an email address string using Zod's built-in email validator.
 *
 * @param email - The email address to validate.
 * @returns `true` if the email address is valid, otherwise `false`.
 */
export const validateEmail = (email: string): boolean => {
  const schema = z.string().email();
  return schema.safeParse(email).success;
};
