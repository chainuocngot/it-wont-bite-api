import { TodoLabelColor } from 'src/shared/constants/todo.constant';
import { dateTimeZod, idZod } from 'src/shared/constants/zod.constant';
import z from 'zod';

export const TodoLabelSchema = z.object({
  id: idZod,
  name: z.string(),
  color: z.enum(TodoLabelColor),
  createdAt: dateTimeZod,
  updatedAt: dateTimeZod,
});

export const ProjectedTodoLabelSchema = TodoLabelSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type TodoLabelType = z.infer<typeof TodoLabelSchema>;
export type ProjectedTodoLabelType = z.infer<typeof ProjectedTodoLabelSchema>;
