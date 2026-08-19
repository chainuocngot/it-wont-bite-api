import { MessageResSchema } from 'src/shared/models/response.model';
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
  accessToken: z.jwt(),
  refreshToken: z.jwt(),
});

// Login
export const LoginBodySchema = UserSchema.pick({
  email: true,
  pwd: true,
}).strict();

export const LoginResSchema = z.object({
  accessToken: z.jwt(),
  refreshToken: z.jwt(),
});

// Refresh Token
export const RefreshTokenBodySchema = z
  .object({
    token: z.jwt(),
  })
  .strict();

export const RefreshTokenResSchema = z.object({
  accessToken: z.jwt(),
  refreshToken: z.jwt(),
});

// Logout
export const LogoutBodySchema = z
  .object({
    refreshToken: z.jwt(),
  })
  .strict();

export const LogoutResSchema = MessageResSchema;

export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
export type RegisterResType = z.infer<typeof RegisterResSchema>;
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;
export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBodySchema>;
export type RefreshTokenResType = z.infer<typeof RefreshTokenResSchema>;
export type LogoutBodyType = z.infer<typeof LogoutBodySchema>;
export type LogoutResType = z.infer<typeof LogoutResSchema>;
