import { createZodDto } from 'nestjs-zod';
import { CreateTodoBodySchema, CreateTodoResSchema } from 'src/routes/todo/todo.model';

export class CreateTodoBodyDto extends createZodDto(CreateTodoBodySchema) {}

export class CreateTodoResDto extends createZodDto(CreateTodoResSchema) {}
