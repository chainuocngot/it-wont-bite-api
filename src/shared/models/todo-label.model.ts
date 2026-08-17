import { TodoLabelColor } from 'src/shared/constants/todo.constant';
import { dateTimeZod, idZod } from 'src/shared/constants/zod.constant';
import z from 'zod';

export const TodoLabelSchema = z.object({
  id: idZod,
  name: z.string().nullish(),
  color: z.enum(TodoLabelColor),
  createdAt: dateTimeZod,
  updatedAt: dateTimeZod,
});

export type TodoLabelType = z.infer<typeof TodoLabelSchema>;
