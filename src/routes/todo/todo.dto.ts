import { createZodDto } from 'nestjs-zod';
import {
  CreateTodoBodySchema,
  CreateTodoResSchema,
  GetTodoIdParamSchema,
  ListTodoResSchema,
  UpdateTodoBodySchema,
  UpdateTodoResSchema,
} from 'src/routes/todo/todo.model';

export class CreateTodoBodyDto extends createZodDto(CreateTodoBodySchema) {}

export class CreateTodoResDto extends createZodDto(CreateTodoResSchema, { codec: true }) {}

export class ListTodoResDto extends createZodDto(ListTodoResSchema, { codec: true }) {}

export class UpdateTodoBodyDto extends createZodDto(UpdateTodoBodySchema) {}

export class UpdateTodoResDto extends createZodDto(UpdateTodoResSchema, { codec: true }) {}

export class GetTodoIdParamDto extends createZodDto(GetTodoIdParamSchema) {}
