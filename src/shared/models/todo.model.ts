import { TodoStatus } from 'src/shared/constants/todo.constant';
import { dateTimeZod, idZod } from 'src/shared/constants/zod.constant';
import z from 'zod';

export const TodoSchema = z.object({
  id: idZod,
  userId: idZod,
  title: z.string(),
  status: z.enum(TodoStatus),
  description: z.string().nullish(),
  dueAt: dateTimeZod.nullish(),
  remindAt: dateTimeZod.nullish(),
  createdAt: dateTimeZod,
  updatedAt: dateTimeZod,
});

export type TodoType = z.infer<typeof TodoSchema>;
