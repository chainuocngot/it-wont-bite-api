import { createZodDto } from 'nestjs-zod';
import {
  LoginBodySchema,
  LoginResSchema,
  RefreshTokenBodySchema,
  RefreshTokenResSchema,
  RegisterBodySchema,
  RegisterResSchema,
} from 'src/routes/auth/auth.model';
import { DeleteTodoResSchema, GetTodoDetailResSchema } from 'src/routes/todo/todo.model';

export class RegisterBodyDto extends createZodDto(RegisterBodySchema) {}

export class RegisterResDto extends createZodDto(RegisterResSchema, { codec: true }) {}

export class LoginBodyDto extends createZodDto(LoginBodySchema) {}

export class LoginResDto extends createZodDto(LoginResSchema, { codec: true }) {}

export class GetTodoDetailResDto extends createZodDto(GetTodoDetailResSchema, { codec: true }) {}

export class DeleteTodoResDto extends createZodDto(DeleteTodoResSchema, { codec: true }) {}

export class RefreshTokenBodyDto extends createZodDto(RefreshTokenBodySchema) {}

export class RefreshTokenResDto extends createZodDto(RefreshTokenResSchema, { codec: true }) {}
