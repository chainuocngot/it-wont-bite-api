import { dateTimeZod, idZod } from 'src/shared/constants/zod.constant';
import z from 'zod';

export const UserSchema = z.object({
  id: idZod,
  email: z.email(),
  pwd: z.string(),
  username: z.string(),
  name: z.string(),
  createdAt: dateTimeZod,
  updatedAt: dateTimeZod,
});

export const ProjectedUserSchema = UserSchema.pick({
  id: true,
  email: true,
  name: true,
  username: true,
  createdAt: true,
});

export type UserType = z.infer<typeof UserSchema>;
export type ProjectedUserType = z.infer<typeof ProjectedUserSchema>;
