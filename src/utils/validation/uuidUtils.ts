import { z } from 'zod';

export const validateUUID = (uuid: string): boolean => {
  const schema = z.string().uuid();
  return schema.safeParse(uuid).success;
};
