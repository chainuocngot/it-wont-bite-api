import { createZodDto } from 'nestjs-zod';
import { GetListTodoLabelResSchema } from 'src/routes/todo-label/todo-label.model';

export class GetListTodoLabelResDto extends createZodDto(GetListTodoLabelResSchema, {
  codec: true,
}) {}
