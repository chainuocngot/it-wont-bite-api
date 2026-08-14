export const TodoStatus = {
  Todo: 'Todo',
  InProgress: 'InProgress',
  Completed: 'Completed',
  Cancelled: 'Cancelled',
} as const;

export type TypeOfTodoStatus = (typeof TodoStatus)[keyof typeof TodoStatus];
