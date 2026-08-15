import { NotFoundException } from '@nestjs/common';

export const TodoNotFoundException = new NotFoundException('Error.TodoNotFound');
