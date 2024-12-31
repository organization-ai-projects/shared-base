import { z } from 'zod';

export const validateEmail = (email: string): boolean => {
  const schema = z.string().email();
  return schema.safeParse(email).success;
};
