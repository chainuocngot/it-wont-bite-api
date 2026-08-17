export const TodoStatus = {
  Todo: 'Todo',
  InProgress: 'InProgress',
  Completed: 'Completed',
  Cancelled: 'Cancelled',
} as const;

export type TypeOfTodoStatus = (typeof TodoStatus)[keyof typeof TodoStatus];

export const TodoLabelColor = {
  Blue: 'Blue',
  Red: 'Red',
  Yellow: 'Yellow',
  Green: 'Green',
  Purple: 'Purple',
  Pink: 'Pink',
  Orange: 'Orange',
} as const;

export type TypeOfTodoLabelColor = (typeof TodoLabelColor)[keyof typeof TodoLabelColor];
