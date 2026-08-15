import { Injectable } from '@nestjs/common';
import { TodoNotFoundException } from 'src/routes/todo/todo.error';
import {
  CreateTodoBodyType,
  CreateTodoResType,
  ListTodoResType,
  UpdateTodoBodyType,
  UpdateTodoResType,
} from 'src/routes/todo/todo.model';
import { TodoType } from 'src/shared/models/todo.model';
import { UserType } from 'src/shared/models/user.model';
import { TodoRepository } from 'src/shared/repositories/todo.repository';
import { isNotFoundPrismaError } from 'src/shared/utils/prisma.util';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  createTodo(userId: UserType['id'], body: CreateTodoBodyType): Promise<CreateTodoResType> {
    return this.todoRepository.create({
      data: {
        status: body.status,
        title: body.title,
        userId,
      },
    });
  }

  listTodo(userId: UserType['id']): Promise<ListTodoResType> {
    return this.todoRepository.findMany({
      where: {
        userId,
      },
    });
  }

  async updateTodo({
    userId,
    todoId,
    body,
  }: {
    userId: UserType['id'];
    todoId: TodoType['id'];
    body: UpdateTodoBodyType;
  }): Promise<UpdateTodoResType> {
    try {
      return await this.todoRepository.update({
        where: {
          id: todoId,
          userId,
        },
        data: {
          title: body.title,
          status: body.status,
        },
      });
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw TodoNotFoundException;
      }

      throw error;
    }
  }
}
