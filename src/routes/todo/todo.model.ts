import { TodoStatus } from 'src/shared/constants/todo.constant';
import { TodoSchema } from 'src/shared/models/todo.model';
import z from 'zod';

// Create Todo
export const CreateTodoBodySchema = TodoSchema.pick({
  title: true,
})
  .extend({
    status: TodoSchema.shape.status.default(TodoStatus.Todo),
  })
  .strict();

export const CreateTodoResSchema = TodoSchema;

export type CreateTodoBodyType = z.infer<typeof CreateTodoBodySchema>;
export type CreateTodoResType = z.infer<typeof CreateTodoResSchema>;
