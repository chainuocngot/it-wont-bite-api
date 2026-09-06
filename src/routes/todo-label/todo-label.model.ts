import { TodoLabelSchema } from 'src/shared/models/todo-label.model';
import z from 'zod';

export const GetListTodoLabelResSchema = z.array(TodoLabelSchema);

export type GetListTodoLabelResType = z.infer<typeof GetListTodoLabelResSchema>;
