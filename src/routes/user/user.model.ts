import { ProjectedUserSchema } from 'src/shared/models/user.model';
import z from 'zod';

// Get Me
export const GetMeResSchema = ProjectedUserSchema;

// Get User
export const GetUserByUsernameResSchema = ProjectedUserSchema;

export const GetUserIdParamSchema = z.object({
  userId: z.coerce.number(),
});

export const GetUserUsernameParamSchema = z.object({
  username: z.string(),
});

export type GetMeResType = z.infer<typeof GetMeResSchema>;
export type GetUserByUsernameResType = z.infer<typeof GetUserByUsernameResSchema>;
export type GetUserIdParamType = z.infer<typeof GetUserIdParamSchema>;
export type GetUserUsernameParamType = z.infer<typeof GetUserUsernameParamSchema>;
