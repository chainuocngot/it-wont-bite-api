import { UserSchema } from 'src/shared/models/user.model';
import { validatePasswordMatch } from 'src/shared/utils/zod.util';
import z from 'zod';

// Register
export const RegisterBodySchema = UserSchema.pick({
  email: true,
  name: true,
  pwd: true,
})
  .extend({
    cf_pwd: z.string(),
  })
  .superRefine(validatePasswordMatch)
  .strict();

export const RegisterResSchema = z.object({
  access_token: z.jwt(),
  refresh_token: z.jwt(),
});

// Login
export const LoginBodySchema = UserSchema.pick({
  email: true,
  pwd: true,
}).strict();

export const LoginResSchema = z.object({
  access_token: z.jwt(),
  refresh_token: z.jwt(),
});

export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
export type RegisterResType = z.infer<typeof RegisterResSchema>;
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;
