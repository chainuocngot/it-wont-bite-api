import { createZodDto } from 'nestjs-zod';
import {
  CreateTodoBodySchema,
  CreateTodoResSchema,
  ListTodoResSchema,
} from 'src/routes/todo/todo.model';

export class CreateTodoBodyDto extends createZodDto(CreateTodoBodySchema) {}

export class CreateTodoResDto extends createZodDto(CreateTodoResSchema) {}

export class ListTodoResDto extends createZodDto(ListTodoResSchema) {}
