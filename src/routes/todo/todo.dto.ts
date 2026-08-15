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

export class CreateTodoResDto extends createZodDto(CreateTodoResSchema) {}

export class ListTodoResDto extends createZodDto(ListTodoResSchema) {}

export class UpdateTodoBodyDto extends createZodDto(UpdateTodoBodySchema) {}

export class UpdateTodoResDto extends createZodDto(UpdateTodoResSchema) {}

export class GetTodoIdParamDto extends createZodDto(GetTodoIdParamSchema) {}
