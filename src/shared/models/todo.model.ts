import { TodoStatus } from 'src/shared/constants/todo.constant';
import { dateTimeZod, idZod } from 'src/shared/constants/zod.constant';
import { ProjectedTodoLabelSchema } from 'src/shared/models/todo-label.model';
import z from 'zod';

export const TodoSchema = z.object({
  id: idZod,
  userId: idZod,
  title: z.string().nonempty(),
  status: z.enum(TodoStatus),
  description: z.string().nullish(),
  dueAt: dateTimeZod.nullish(),
  remindAt: dateTimeZod.nullish(),
  isFav: z.boolean(),
  removeFromTodayAt: dateTimeZod.nullable(),
  createdAt: dateTimeZod,
  updatedAt: dateTimeZod,
});

export const TodoIncludeLabelsSchema = TodoSchema.extend({
  labels: z.array(ProjectedTodoLabelSchema),
});

export type TodoType = z.infer<typeof TodoSchema>;
export type TodoIncludeLabelsType = z.infer<typeof TodoIncludeLabelsSchema>;
