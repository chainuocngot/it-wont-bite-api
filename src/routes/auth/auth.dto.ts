import { createZodDto } from 'nestjs-zod';
import {
  LoginBodySchema,
  LoginResSchema,
  RegisterBodySchema,
  RegisterResSchema,
} from 'src/routes/auth/auth.model';
import { DeleteTodoResSchema, GetTodoDetailResSchema } from 'src/routes/todo/todo.model';

export class RegisterBodyDto extends createZodDto(RegisterBodySchema) {}

export class RegisterResDto extends createZodDto(RegisterResSchema) {}

export class LoginBodyDto extends createZodDto(LoginBodySchema) {}

export class LoginResDto extends createZodDto(LoginResSchema) {}

export class GetTodoDetailResDto extends createZodDto(GetTodoDetailResSchema) {}

export class DeleteTodoResDto extends createZodDto(DeleteTodoResSchema) {}
