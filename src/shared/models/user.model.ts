import { dateTimeZod, idZod } from 'src/shared/constants/zod.constant';
import z from 'zod';

export const UserSchema = z.object({
  id: idZod,
  email: z.email(),
  pwd: z.string(),
  name: z.string(),
  createdAt: dateTimeZod,
  updatedAt: dateTimeZod,
});

export type UserType = z.infer<typeof UserSchema>;
